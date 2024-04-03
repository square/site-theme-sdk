/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { beforeEach, describe, expect, it, vi } from 'vitest';
import { GetLoyaltyAccountRequest, GetLoyaltyAccountResponse } from '../../src/types/api/customers';
import { BSGetLoyaltyAccountResponse } from '../../src/types/clients/buyers.private';
import { createFetchResponse, getTestSquareOnlineWebSDK, STATUS_TEXT } from '../helpers';
import type LooseObject from '../../src/types/looseobject';

const XSRF_COOKIE_NAME = 'customer_xsrf';
const XSRF_TOKEN = 'token';
const MERCHANT_ID = 'merchant-id-123';
const CURRENT_URL = 'currentUrl';
const GET_LOYALTY_ACCOUNT_URL = '/app/accounts/v1/loyalty/account/search';
const PING_URL = '/app/accounts/v1/ping';

const loyaltyAccount = {
	id: '',
	program_id: '',
	balance: 7,
	lifetime_points: 1337,
};
const okLoyaltyAccountResponse: GetLoyaltyAccountResponse = {
	data: loyaltyAccount
};

const okBSLoyaltyAccountResponse: BSGetLoyaltyAccountResponse = {
	data: {
		loyalty_account: loyaltyAccount
	}
};

const okFetchResponse = createFetchResponse(okBSLoyaltyAccountResponse, true, 200);
const notFoundFetchResponse = createFetchResponse(
	{message: 'Square Loyalty not found.'},
	false,
	404);
const pingFetchResponse = createFetchResponse(null, true, 201);
const serverErrorFetchResponse = createFetchResponse(null, false, 500);
const xsrfTokenMismatchResponse = createFetchResponse(
	{error: 'CSRF Token mismatch'},
	false,
	419);

function createRequestOptions(body: object|null = null, method: string = 'GET'): LooseObject {
	const options: LooseObject = {
		headers: {
			'Accept': 'application/json',
			'Content-Type' : 'application/json; charset=UTF-8',
			'X-XSRF-TOKEN': XSRF_TOKEN,
			'Square-Merchant-Token': MERCHANT_ID,
		},
		method: method,
	};
	if (body) {
		options.body = JSON.stringify(body);
	}
	return options;
}

const mockWindowHrefSet = vi.fn();

const sdk =  getTestSquareOnlineWebSDK();

beforeEach(() => {
	const documentMock = {
		cookie: `test_cookie=test; ${XSRF_COOKIE_NAME}=${XSRF_TOKEN};`
	};

	const windowMock = {
		location: {
			get href() { return CURRENT_URL; },
			set href(url) {
				mockWindowHrefSet(url);
			}
		}
	};

	vi.stubGlobal('document', documentMock);
	vi.stubGlobal('window', windowMock);

	global.fetch = vi.fn();
	vi.mocked(fetch).mockResolvedValue(okFetchResponse);
});
describe('Loyalty account request', () => {
	it('should return loyalty account if account found', async () => {
		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = await sdk.customers.getLoyaltyAccount(request);

		expect(fetch).toHaveBeenCalledWith(
			`${GET_LOYALTY_ACCOUNT_URL}`,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);
		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okLoyaltyAccountResponse);
	});

	it('should return empty if no loyalty account found', async () => {
		vi.mocked(fetch).mockResolvedValue(notFoundFetchResponse);

		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = await sdk.customers.getLoyaltyAccount(request);

		expect(fetch).toHaveBeenCalledWith(
			`${GET_LOYALTY_ACCOUNT_URL}`,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);
		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual({});
	});

	it('should call ping if no xsrf cookie exists', async () => {
		vi.stubGlobal('document', { cookie: '' });
		vi.mocked(fetch)
			.mockImplementationOnce(() => {
				// Can't actually set cookies so just pretend by resetting the document stub
				vi.stubGlobal('document', {cookie: `${XSRF_COOKIE_NAME}=${XSRF_TOKEN};`});
				return Promise.resolve(pingFetchResponse);
			})
			.mockResolvedValueOnce(okFetchResponse);

		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = await sdk.customers.getLoyaltyAccount(request);

		expect(fetch).nthCalledWith(1, PING_URL);
		expect(fetch).nthCalledWith(2,
			GET_LOYALTY_ACCOUNT_URL,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);

		expect(fetch).toBeCalledTimes(2);

		expect(result).toStrictEqual(okLoyaltyAccountResponse);
	});

	it('should call ping if server responds with 419', async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(xsrfTokenMismatchResponse)
			.mockImplementationOnce(() => {
				// Can't actually set cookies so just pretend by resetting the document stub
				vi.stubGlobal('document', {cookie: `${XSRF_COOKIE_NAME}=${XSRF_TOKEN};`});
				return Promise.resolve(pingFetchResponse);
			})
			.mockResolvedValueOnce(okFetchResponse);

		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = await sdk.customers.getLoyaltyAccount(request);

		expect(fetch).nthCalledWith(1,
			GET_LOYALTY_ACCOUNT_URL,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);
		expect(fetch).nthCalledWith(2, PING_URL);
		expect(fetch).nthCalledWith(3,
			GET_LOYALTY_ACCOUNT_URL,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);
		expect(fetch).toBeCalledTimes(3);

		expect(result).toStrictEqual(okLoyaltyAccountResponse);
	});

	it('should throw error if request fails', async () => {
		vi.mocked(fetch).mockResolvedValue(serverErrorFetchResponse);
		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = sdk.customers.getLoyaltyAccount(request);

		expect(fetch).toHaveBeenCalledWith(
			`${GET_LOYALTY_ACCOUNT_URL}`,
			expect.objectContaining({
				...createRequestOptions(request, 'POST'),
			})
		);
		expect(fetch).toHaveBeenCalledOnce();

		await expect(result).rejects.toThrowError(`Error 500: ${STATUS_TEXT}`);
	});

	it('should throw error if cookies disabled', async () => {
		// As opposed to a stack overflow from recursively re-requesting
		vi.stubGlobal('document', { cookie: '' });
		vi.mocked(fetch)
			.mockResolvedValueOnce(pingFetchResponse)
			.mockResolvedValueOnce(xsrfTokenMismatchResponse)
			.mockResolvedValueOnce(pingFetchResponse)
			.mockResolvedValueOnce(pingFetchResponse)
			.mockResolvedValueOnce(xsrfTokenMismatchResponse);

		const request: GetLoyaltyAccountRequest = {
			phone: '1234567890'
		};
		const result = sdk.customers.getLoyaltyAccount(request);
		await expect(result).rejects.toThrowError(`Error 419: ${STATUS_TEXT}`);
		expect(fetch).toBeCalledTimes(5);
	});
});
