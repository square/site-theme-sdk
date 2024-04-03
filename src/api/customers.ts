import {
	buildHeaders
} from '../helpers/auth';

import { InitConfig } from '..';
import {
	GetCoordinatesResponse,
	GetLoyaltyAccountRequest,
	GetLoyaltyAccountResponse,
	NoLoyaltyAccountResponse
} from '../types/api/customers';
import { BuyersServiceClient } from '../clients/buyers';

export class Customers {
	initConfig: InitConfig;
	buyersServiceClient: BuyersServiceClient;

	constructor(initObj: InitConfig) {
		this.initConfig = initObj;
		this.buyersServiceClient = new BuyersServiceClient(initObj.merchantId);
	}

	/**
     * Used to try and get the coordinates of the buyer based on their IP address.
     * If the coordinates can't be determined, this method returns an empty object.
     *
     * ```ts
     *	try {
     *		const coordinates = await sdk.customers.getCoordinates();
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link Error}
     */
	async getCoordinates(): Promise<GetCoordinatesResponse> {
		const userId: number = this.initConfig.userId;

		const requestUrl = `/app/website/cms/api/v1/users/${userId}/customers/coordinates`;

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: buildHeaders()
		});
		let coordinatesResponse = await response.json() as GetCoordinatesResponse;
		// Transform empty array to empty object if no match is found
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (Array.isArray(coordinatesResponse)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
			coordinatesResponse = {};
		}
		return coordinatesResponse;
	}

	/**
     * Search for an existing customer loyalty account by phone number. 
     * If no loyalty account exists, this method returns an empty object.
     *
     * ```ts
     *	try {
     *		const loyaltyAccount = await sdk.customers.getLoyaltyAccount();
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link Error}
     */
	async getLoyaltyAccount(request: GetLoyaltyAccountRequest): 
        Promise<GetLoyaltyAccountResponse | NoLoyaltyAccountResponse> 
	{
		const phone = request.phone;
		const loyaltyAccount = await this.buyersServiceClient.getLoyaltyAccount(phone);
		if (!loyaltyAccount) {
			return {};
		}
		return {
			data: loyaltyAccount
		};
	}
}
