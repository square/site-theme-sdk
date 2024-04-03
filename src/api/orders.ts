import {
	buildHeaders
} from '../helpers/auth';

import { InitConfig } from '..';
import { GetOrderRequest, GetOrderResponse } from '../types/api/orders';

export class Orders {
	initConfig: InitConfig;

	constructor(initObj: InitConfig) {
		this.initConfig = initObj;
	}

	/**
	 * Fetches complete details about a past order using the jwt token associated with that order.
	 *
	 * ```ts
	 *  const orderRequest = {
	 *      jwtToken: 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE...truncated',
	 *      locationId: '11ecdbb1f3706d91a4ab2c601c83f953',
	 *      fulfillments: ['shipping']
	 *  };
	 *	try {
	 *		const response = await sdk.orders.getOrder(orderRequest);
	 *	} catch (error) {
	 *		// Handle errors
	 *	}
	 * ```
	 */
	async getOrder(request: GetOrderRequest): Promise<GetOrderResponse> {
		const jwtToken: string = request.jwtToken;
		const locationId: string = request.locationId;
		const fulfillments: Array<string> = request.fulfillments;

		if (!jwtToken) {
			throw new Error('missing jwtToken');
		}
		if (!locationId) {
			throw new Error('missing locationId');
		}
		if (!fulfillments) {
			throw new Error('missing fulfillments');
		}
		if (!this.initConfig.cmsSiteId) {
			throw new Error('missing cmsSiteId');
		}
		if (!Array.isArray(fulfillments)) {
			throw new Error('fulfillments must be an array');
		}
		const cmsSiteId: string = this.initConfig.cmsSiteId;
		const validFulfillments = ['shipping', 'pickup', 'delivery'];
		fulfillments.forEach((f) => {
			if (!validFulfillments.includes(f.toLowerCase())) {
				throw new Error('invalid value in fulfillments array: ' + f);
			}
		});

		let requestUrl = `/app/cms/api/v1/sites/${cmsSiteId}/order-again/${jwtToken}?location=${locationId}`;
		fulfillments.forEach((f: string) => {
			requestUrl += `&fulfillments[]=${f}`;
		});

		const response = await fetch(requestUrl, {
			method: 'GET',
			headers: buildHeaders()
		});
		const orderResponse = await response.json();
		return orderResponse as GetOrderResponse;
	}
}
