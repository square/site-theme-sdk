import { getCookie } from '../helpers/cookies';
import {
	BSGetLoyaltyAccountRequest,
	BSGetLoyaltyAccountResponse,
	BSLoyaltyAccount
} from '../types/clients/buyers.private';

const XSRF_COOKIE_NAME = 'customer_xsrf';

const BASE_URL = '/app/accounts/v1';
const PING_ENDPOINT = '/ping';
const GET_LOYALTY_ACCOUNT_ENDPOINT = '/loyalty/account/search';

export class BuyersServiceClient {
	#merchantId: string;
	constructor(merchantId: string) {
		this.#merchantId = merchantId;
	}

	async getLoyaltyAccount(phone: string): Promise<BSLoyaltyAccount|null> {
		const body: BSGetLoyaltyAccountRequest = {
			phone: phone,
		};
		const response = await this.#requestJson<BSGetLoyaltyAccountResponse>(
			`${BASE_URL}${GET_LOYALTY_ACCOUNT_ENDPOINT}`,
			'POST',
			body
		);
		return response?.data.loyalty_account ?? null;
	}

	async #requestJson<T>(url: string, method: string, body: object|null = null, retryIf419: boolean = true): Promise<T|null> {
		let token = getCookie(XSRF_COOKIE_NAME);
		if (!token) {
			await this.#ping();
			token = getCookie(XSRF_COOKIE_NAME) ?? '';
		}

		const options: RequestInit = {
			method: method,
			headers: this.#getHeaders(token),
		};
		if (body) {
			options.body = JSON.stringify(body);
		}
		const response = await fetch(url, options);

		if (!response.ok) {
			if (response.status === 404) {
				return null;
			} else if (response.status === 419 && retryIf419) {
				// Even though we had a token, the server may have evicted this session from its cache.
				// So let's generate a new token and try again.
				await this.#ping();
				return await this.#requestJson(url, method, body, false); // don't retry if we get a 419 again
			} else {
				throw new Error(`Error ${response.status}: ${response.statusText}`);
			}
		}

		return await response.json() as T;
	}

	#getHeaders(xsrfToken: string) {
		return {
			'Accept': 'application/json',
			'Content-Type': 'application/json; charset=UTF-8',
			'X-XSRF-TOKEN': xsrfToken,
			'Square-Merchant-Token': this.#merchantId,
		};
	}

	/**
     * Calling ping will set the session ID and XSRF token cookies needed for subsequent requests
     */
	async #ping() {
		const url = `${BASE_URL}${PING_ENDPOINT}`;
		await fetch(url);
	}
}
