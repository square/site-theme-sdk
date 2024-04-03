/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
	AddLineItem,
	AddItemRequest,
	BuyNowItemRequest,
	FulfillmentType,
	ModifierType,
	CurrencyType,
	AddItemModifier,
	CartFulfillment,
	ScheduleType,
} from '../src/types/api/cart';
import { ScheduleResource } from '../src/types/api/cart/private.types';
import { getTestSiteThemeSDK } from './helpers';
import type LooseObject from '../src/types/looseobject';

const STATUS_TEXT = 'status';
const CSRF_TOKEN = 'token';
const CART_TOKEN = 'cart';
const CURRENT_URL = 'currentUrl';
const REDIRECT_URL = 'redirectUrl';
const SUBSCRIPTION_ID = 'subscription';
const CART_API_URL = '/s/api/v1/cart';

function createFetchResponse(data: LooseObject, ok: boolean, status: number, redirectUrl = ''): Response {
	return {
		ok,
		headers: {
			append: vi.fn(),
			delete: vi.fn(),
			get: vi.fn(),
			has: vi.fn(),
			set: vi.fn(),
			forEach: vi.fn()
		},
		redirected: !!redirectUrl,
		status: status,
		statusText: STATUS_TEXT,
		type: 'default',
		url: redirectUrl,
		clone: vi.fn(),
		body: null,
		bodyUsed: false,
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
		text: vi.fn(),
		json: () => new Promise((resolve) => resolve(data))
	};
}

function createHeadersAndMethodForRequest(method: string = 'POST'): LooseObject {
	return {
		headers: {
			'Accept': 'application/json',
			'content-type' : 'application/json; charset=UTF-8',
			'X-CSRF-TOKEN': CSRF_TOKEN
		},
		method: method,
	};
}

function createAddOrBuyNowItemRequest(
	{
		orderId = undefined,
		includePriceOverride = false,
		subscriptionId = undefined,
		isBuyNow = false,
		isPickup = false,
		isDelivery = false,
		excludePickupDetails = false,
		useNestedArray = false,
		emptyModifiers = false,
	}: {
		orderId?: string | undefined;
		includePriceOverride?: boolean;
		subscriptionId?: string;
		isBuyNow?: boolean;
		isPickup?: boolean;
        isDelivery?: boolean;
		excludePickupDetails?: boolean;
		useNestedArray?: boolean;
		emptyModifiers?: boolean;
	}
): AddItemRequest | BuyNowItemRequest {
	const lineItem: AddLineItem = {
		itemId: 'itemId',
		variationId: 'variationId',
		modifiers: [
			{
				id: '6WVGAE3PKEHRWZHF54KR2PIN',
				type: ModifierType.CHOICE,
				choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
			},
			{
				id: '11ede91fbff63a3ab4dbde667deefb9b',
				type: ModifierType.TEXT,
				textEntry: 'my t-shirt text'
			},
			{
				id: '11ede91fbff63a3ab4dbde667deefb9c',
				type: ModifierType.TEXT,
				textEntry: 'my t-shirt back text'
			},
		],
	};

	if (!isBuyNow) {
		lineItem.modifiers = [
			...<AddItemModifier[]>lineItem.modifiers,
			...[
				{
					id: '11ee185ca1cd3e98a25c9e3d692ffefb',
					type: ModifierType.GIFT_WRAP,
					choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
				},
				{
					id: '11ee185ca17973e490449e3d692ffefb',
					type: ModifierType.GIFT_MESSAGE,
					textEntry: 'happy bday'
				}
			]
		];
	} else {
		// Testing invalid null being passed in
		(<any>lineItem).subscriptionPlanVariationId = subscriptionId || null;
	}

	if (emptyModifiers) {
		lineItem.modifiers = [];
	}

	// Just to test convertCamelObjToSnakeObjInArray
	if (useNestedArray) {
		(<any>lineItem).modifiers = [
			...<AddItemModifier[]>lineItem.modifiers,
			...[
				{
					id: 'nestedArrayTest',
					type: 'nestedArrayTest',
					choiceSelections: [
						[
							'a',
							'b',
							'c'
						],
						[
							'd',
							'e',
							'f'
						]
					]
				}
			]
		];
	}

	if (includePriceOverride) {
		lineItem.priceOverride = {
			amount: 718,
			currency: CurrencyType.USD
		};
	}

	let pickupFulfillment: CartFulfillment | null = null;
	if (isPickup) {
		pickupFulfillment = {
			fulfillmentType: FulfillmentType.PICKUP,
			pickupDetails: {
				scheduleType: ScheduleType.ASAP,
				curbsidePickupRequested: true,
				curbsidePickupDetails: {
					curbsideDetails: 'I want it at the curb'
				},
				pickupAt: '2023-08-28T20:45:14.683Z'
			}
		};
		if (excludePickupDetails) {
			delete pickupFulfillment.pickupDetails;
		}
	}

	let deliveryFulfillment: CartFulfillment | null = null;
	if (isDelivery) {
		deliveryFulfillment = {
			fulfillmentType: FulfillmentType.DELIVERY,
			deliveryDetails: {
				recipient: {
					address: {
						locality: 'The Bronx',
						country:  'US',
						postalCode: '10461',
						administrativeDistrictLevel1: 'NY',
						addressLine1: '1200 Hone Avenue',
					}
				},
			}
		};
	}

	const request = {
		lineItem,
		fulfillment: pickupFulfillment || deliveryFulfillment || {
			fulfillmentType: FulfillmentType.SHIPMENT
		},
		locationId: 'location'
	};

	if (!isBuyNow) {
		(<AddItemRequest>request).orderId = orderId;
	}

	return request;
}

function createAddOrBuyNowItemFetchRequest(
	{
		orderId = undefined,
		includePriceOverride = false,
		subscriptionId = undefined,
		isBuyNow = false,
		isPickup = false,
		isDelivery = false,
		excludePickupDetails = false,
		useNestedArray = false,
		emptyModifiers = false
	}: {
		orderId?: string | undefined;
		includePriceOverride?: boolean;
		subscriptionId?: string;
		isBuyNow?: boolean;
		isPickup?: boolean;
        isDelivery?: boolean;
		excludePickupDetails?: boolean;
		useNestedArray?: boolean;
		emptyModifiers?: boolean;
	}
): any {
	const lineItem: any = {
		item_id: 'itemId',
		variation_id: 'variationId',
		modifiers: {
			[ModifierType.CHOICE]: {
				['6WVGAE3PKEHRWZHF54KR2PIN']: {
					choice_selections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
				}
			},
			[ModifierType.TEXT]: {
				['11ede91fbff63a3ab4dbde667deefb9b']: {
					text_entry: 'my t-shirt text'
				},
				['11ede91fbff63a3ab4dbde667deefb9c']: {
					text_entry: 'my t-shirt back text'
				}
			}
		}
	};

	if (!isBuyNow) {
		lineItem.modifiers = {
			...lineItem.modifiers,
			...{
				[ModifierType.GIFT_WRAP]: {
					['11ee185ca1cd3e98a25c9e3d692ffefb']: {
						choice_selections: ['11ee185ca1cd7daebd029e3d692ffefb']
					}
				},
				[ModifierType.GIFT_MESSAGE]: {
					['11ee185ca17973e490449e3d692ffefb']: {
						text_entry: 'happy bday'
					}
				}
			}
		};
	} else {
		// Testing invalid null being passed in
		lineItem.subscription_plan_variation_id = subscriptionId || null;
	}

	if (emptyModifiers) {
		delete lineItem.modifiers;
	}

	// Just to test convertCamelObjToSnakeObjInArray
	if (useNestedArray) {
		lineItem.modifiers = {
			...<AddItemModifier[]>lineItem.modifiers,
			...{
				['nestedArrayTest']: {
					['nestedArrayTest']: {
						choice_selections: [
							[
								'a',
								'b',
								'c'
							],
							[
								'd',
								'e',
								'f'
							]
						]
					}
				}
			}
		};
	}

	if (includePriceOverride) {
		lineItem.price_override = {
			amount: 718,
			currency: CurrencyType.USD
		};
	}

	lineItem.quantity = 1;

	let pickupFulfillment: LooseObject | null = null;
	if (isPickup) {
		pickupFulfillment = {
			fulfillment_type: FulfillmentType.PICKUP,
			pickup_details: {
				schedule_type: ScheduleType.ASAP,
				curbside_pickup_requested: true,
				curbside_pickup_details: {
					curbside_details: 'I want it at the curb'
				},
				pickup_at: '2023-08-28T20:45:14.683Z'
			}
		};
		if (excludePickupDetails) {
			pickupFulfillment.pickup_details = {
				schedule_type: ScheduleType.ASAP,
				curbside_pickup_requested: false,
				curbside_pickup_details: {
					curbside_details: ''
				},
			};
		}
	}

	let deliveryFulfillment: LooseObject | null = null;
	if (isDelivery) {
		deliveryFulfillment = {
			fulfillment_type: FulfillmentType.DELIVERY,
			delivery_details: {
				recipient: {
					address: {
						locality: 'The Bronx',
						country:  'US',
						postal_code: '10461',
						administrative_district_level_1: 'NY',
						address_line_1: '1200 Hone Avenue',
					}
				},
				no_contact_delivery: false,
				schedule_type: ScheduleType.ASAP,
			}
		};
	}

	const request: any = {
		line_item: lineItem,
		fulfillment: pickupFulfillment || deliveryFulfillment || {
			fulfillment_type: FulfillmentType.SHIPMENT
		},
		location_id: 'location'
	};

	if (!isBuyNow) {
		request.order_id = orderId;
	}

	return request;
}

const scheduleResource: ScheduleResource = {
	schedule: {
		earliest_time: {
			time_unix: 1893474000,
		}
	}
};

const okCartResponse = {
	data: {
		cart: 'xyz'
	}
};
const okFetchResponse = createFetchResponse(okCartResponse, true, 200);
const okFetchResult = {
	response: okFetchResponse,
	...okCartResponse
};

const scheduleFetchResponse = createFetchResponse(scheduleResource, true, 200);

const mockWindowHrefSet = vi.fn();

const sdk = getTestSiteThemeSDK();

beforeEach(() => {
	const documentMock = {
		querySelector: () => {
			return {
				content: CSRF_TOKEN,
			};
		},
		cookie: `test_cookie=test; com_cart_id=${CART_TOKEN};`
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

describe('Get active id', () => {
	it('should return the active cart id when it exists', () => {
		const result = sdk.cart.getActiveId();
		expect(result).toStrictEqual(CART_TOKEN);
	});

	it('should return undefined when no active id exists', () => {
		const documentMock = {
			cookie: `test_cookie=test; not_com_cart_id=${CART_TOKEN};`
		};
		vi.stubGlobal('document', documentMock);
		const result = sdk.cart.getActiveId();
		expect(result).toBeUndefined();
	});
});

describe('Add item', () => {
	it('should make valid fetch', async () => {
		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({}));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN }))
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid pickup fetch', async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(okFetchResponse)
			.mockResolvedValueOnce(scheduleFetchResponse)
			.mockResolvedValueOnce(okFetchResponse);

		const request = <AddItemRequest>createAddOrBuyNowItemRequest({ isPickup: true });
		const result = await sdk.cart.addItem(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual(<AddItemRequest>createAddOrBuyNowItemRequest({ isPickup: true }));
		const fetchRequest = createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN, isPickup: true });
		expect(fetch).toHaveBeenNthCalledWith(1,
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(fetchRequest)
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid pickup fetch with defaults', async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(okFetchResponse)
			.mockResolvedValueOnce(scheduleFetchResponse)
			.mockResolvedValueOnce(okFetchResponse);

		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({ isPickup: true, excludePickupDetails: true }));

		const fetchRequest = createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN, isPickup: true, excludePickupDetails: true });
		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(fetchRequest)
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid delivery fetch with defaults', async () => {
		vi.mocked(fetch)
			.mockResolvedValueOnce(okFetchResponse)
			.mockResolvedValueOnce(scheduleFetchResponse)
			.mockResolvedValueOnce(okFetchResponse);

		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({ isDelivery: true}));

		const fetchRequest = createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN, isDelivery: true });
		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(fetchRequest)
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid fetch with no cart cookie', async () => {
		const DocumentMock = {
			querySelector: () => {
				return {
					content: CSRF_TOKEN,
				};
			},
			cookie: 'test_cookie=test;'
		};
		vi.stubGlobal('document', DocumentMock);

		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({}));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({}))
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid fetch and reset cart', async () => {
		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({ orderId: '' }));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ orderId: '' }))
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid fetch with empty modifiers', async () => {
		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({ emptyModifiers: true }));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN, emptyModifiers: true }))
			})
		);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should throw error', async () => {
		const fetchResponse = createFetchResponse({}, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.addItem({
			lineItem: {
				itemId: 'itemId',
				variationId: 'variationId'
			},
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			},
			locationId: 'location'
		});

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError(STATUS_TEXT);
		await expect(addItemFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw internal error', async () => {
		const addItemResponse = {
			error: 'error message'
		};
		const fetchResponse = createFetchResponse(addItemResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.addItem({
			lineItem: {
				itemId: 'itemId',
				variationId: 'variationId'
			},
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			},
			locationId: 'location'
		});

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError(addItemResponse.error);
		await expect(addItemFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw invalid IDs error', async () => {
		const errorFields = {
			item: ['1', '2', '3']
		};
		const addItemResponse = {
			error: 'Invalid IDs passed in payload',
			fields: errorFields
		};
		const fetchResponse = createFetchResponse(addItemResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.addItem({
			lineItem: {
				itemId: 'itemId',
				variationId: 'variationId'
			},
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			},
			locationId: 'location'
		});

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError(addItemResponse.error);
		await expect(addItemFn).rejects.toMatchObject({
			status: 500,
			fields: errorFields
		});
	});

	it('should throw validation error', async () => {
		const addItemResponse = {
			message: 'fulfillment_test.method_test is invalid',
			errors: {
				'fulfillment_test.method_test': [
					'fulfillment_test.method_test is invalid'
				]
			}
		};
		const fetchResponse = createFetchResponse(addItemResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.addItem({
			lineItem: {
				itemId: 'itemId',
				variationId: 'variationId'
			},
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			},
			locationId: 'location'
		});

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError('fulfillmentTest.methodTest is invalid');
		await expect(addItemFn).rejects.toMatchObject({
			status: 500,
			errors: {
				'fulfillmentTest.methodTest': [
					'fulfillmentTest.methodTest is invalid'
				]
			}
		});
	});

	it('should test convertCamelObjToSnakeObjInArray', async () => {
		const result = await sdk.cart.addItem(<AddItemRequest>createAddOrBuyNowItemRequest({ useNestedArray: true }));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/add`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ orderId: CART_TOKEN, useNestedArray: true }))
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(result).toStrictEqual(okFetchResult);
	});
});

describe('Buy now item', () => {
	it('should make valid fetch and redirect', async () => {
		const okFetchResponse = createFetchResponse(okCartResponse, true, 200, REDIRECT_URL);
		vi.mocked(fetch).mockResolvedValue(okFetchResponse);

		await sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/buy`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ isBuyNow: true }))
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(mockWindowHrefSet).toBeCalledWith(REDIRECT_URL);
	});

	it('should make valid pickup fetch and redirect', async () => {
		const okFetchResponse = createFetchResponse(okCartResponse, true, 200, REDIRECT_URL);

		vi.mocked(fetch)
			.mockResolvedValueOnce(okFetchResponse)
			.mockResolvedValueOnce(scheduleFetchResponse)
			.mockResolvedValueOnce(okFetchResponse);

		const request = <BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true, isPickup: true });
		await sdk.cart.buyNowItem(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true, isPickup: true }));

		const fetchRequest = createAddOrBuyNowItemFetchRequest({ isBuyNow: true, isPickup: true });
		expect(fetch).toHaveBeenNthCalledWith(1,
			`${CART_API_URL}/buy`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(fetchRequest)
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(mockWindowHrefSet).toBeCalledWith(REDIRECT_URL);
	});

	it('should make valid price override fetch and redirect', async () => {
		const okFetchResponse = createFetchResponse(okCartResponse, true, 200, REDIRECT_URL);
		vi.mocked(fetch).mockResolvedValue(okFetchResponse);

		await sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true, includePriceOverride: true }));

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/buy`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ isBuyNow: true, includePriceOverride: true }))
			})
		);

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(mockWindowHrefSet).toBeCalledWith(REDIRECT_URL);
	});

	it('should make valid subscription fetch and redirect', async () => {
		const okFetchResponse = createFetchResponse(okCartResponse, true, 200, REDIRECT_URL);
		vi.mocked(fetch).mockResolvedValue(okFetchResponse);

		await sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true, subscriptionId: SUBSCRIPTION_ID }));

		expect(fetch).toHaveBeenCalledTimes(1);

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/buy`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(createAddOrBuyNowItemFetchRequest({ isBuyNow: true, subscriptionId: SUBSCRIPTION_ID }))
			})
		);

		expect(mockWindowHrefSet).toBeCalledWith(REDIRECT_URL);
	});

	it('should throw redirect error', async () => {
		const buyNowError = {
			response: {
				errors: {
					error: 'error message'
				}
			}
		};
		const fetchResponse = createFetchResponse(buyNowError, true, 200, CURRENT_URL);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError(buyNowError.response.errors.error);
		await expect(addItemFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw generic redirect error', async () => {
		const buyNowError = {
			response: {}
		};
		const fetchResponse = createFetchResponse(buyNowError, true, 200, CURRENT_URL);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const addItemFn = sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(addItemFn).rejects.toThrowError('Something went wrong');
	});

	it('should throw invalid IDs redirect error', async () => {
		const errorFields = {
			item: ['1', '2', '3']
		};
		const buyNowError = {
			response: {
				errors: {
					error: 'Invalid IDs passed in payload',
					fields: errorFields
				}
			}
		};
		const fetchResponse = createFetchResponse(buyNowError, true, 200, CURRENT_URL);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const buyNowFn = sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(buyNowFn).rejects.toThrowError(buyNowError.response.errors.error);
		await expect(buyNowFn).rejects.toMatchObject({
			fields: errorFields,
			status: 500
		});
	});

	it('should throw validation error', async () => {
		const buyNowResponse = {
			message: 'fulfillment_test.method_test is invalid',
			errors: {
				'fulfillment_test.method_test': [
					'fulfillment_test.method_test is invalid'
				]
			}
		};
		const fetchResponse = createFetchResponse(buyNowResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const buyNowFn = sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(buyNowFn).rejects.toThrowError('fulfillmentTest.methodTest is invalid');
		await expect(buyNowFn).rejects.toMatchObject({
			status: 500,
			errors: {
				'fulfillmentTest.methodTest': [
					'fulfillmentTest.methodTest is invalid'
				]
			}
		});
	});

	it('should throw generic error', async () => {
		const fetchResponse = createFetchResponse({}, true, 200);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const buyNowFn = sdk.cart.buyNowItem(<BuyNowItemRequest>createAddOrBuyNowItemRequest({ isBuyNow: true }));

		expect(fetch).toHaveBeenCalledTimes(1);

		await expect(buyNowFn).rejects.toThrowError('Something went wrong');
	});
});

describe('Update item quantity', () => {
	it('should make valid fetch', async () => {
		const request = {
			orderItemId: 'id',
			quantity: 2
		};
		const result = await sdk.cart.updateItemQuantity(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual({
			orderItemId: 'id',
			quantity: 2
		});

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/update-quantity`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify({
					order_item_id: 'id',
					quantity: 2,
					order_id: CART_TOKEN
				})
			})
		);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should throw error', async () => {
		const fetchResponse = createFetchResponse({}, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);
		const updateItemQuantityFn = sdk.cart.updateItemQuantity({
			orderItemId: 'id',
			quantity: 2
		});

		await expect(updateItemQuantityFn).rejects.toThrowError(STATUS_TEXT);
		await expect(updateItemQuantityFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw internal error', async () => {
		const updateItemQuantityResponse = {
			error: 'error message'
		};
		const fetchResponse = createFetchResponse(updateItemQuantityResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const updateItemQuantityFn = sdk.cart.updateItemQuantity({
			orderItemId: 'id',
			quantity: 2
		});

		await expect(updateItemQuantityFn).rejects.toThrowError(updateItemQuantityResponse.error);
		await expect(updateItemQuantityFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw validation error', async () => {
		const updateItemQuantityResponse = {
			message: 'quantity must be numeric',
			errors: {
				'quantity': [
					'quantity must be numeric'
				]
			}
		};
		const fetchResponse = createFetchResponse(updateItemQuantityResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const updateItemQuantityFn = sdk.cart.updateItemQuantity({
			orderItemId: 'id',
			quantity: 2
		});

		await expect(updateItemQuantityFn).rejects.toThrowError(updateItemQuantityResponse.message);
		await expect(updateItemQuantityFn).rejects.toMatchObject({
			status: 500,
			errors: updateItemQuantityResponse.errors
		});
	});
});

describe('Remove item', () => {
	it('should make valid fetch', async () => {
		const request = {
			orderItemId: 'id'
		};
		const result = await sdk.cart.removeItem(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual({
			orderItemId: 'id'
		});

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/remove-item`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify({
					order_item_id: 'id',
					order_id: CART_TOKEN
				})
			})
		);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should throw error', async () => {
		const fetchResponse = createFetchResponse({}, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const removeItemFn = sdk.cart.removeItem({
			orderItemId: 'id'
		});

		await expect(removeItemFn).rejects.toThrowError(STATUS_TEXT);
		await expect(removeItemFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw internal error', async () => {
		const removeItemResponse = {
			error: 'error message'
		};
		const fetchResponse = createFetchResponse(removeItemResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const removeItemFn = sdk.cart.removeItem({
			orderItemId: 'id'
		});

		await expect(removeItemFn).rejects.toThrowError(removeItemResponse.error);
		await expect(removeItemFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw validation error', async () => {
		const removeItemResponse = {
			message: 'order_item_id must exist + more',
			errors: {
				'order_item_id': [
					'order_item_id must be a string',
					'order_item_id must exist'
				],
				'test_error': [
					'test_error must exist'
				],
				'quantity': [
					'quantity must be numeric'
				]
			}
		};
		const fetchResponse = createFetchResponse(removeItemResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const removeItemFn = sdk.cart.removeItem({
			orderItemId: 'id'
		});

		await expect(removeItemFn).rejects.toThrowError('orderItemId must exist + more');
		await expect(removeItemFn).rejects.toMatchObject({
			status: 500,
			errors: {
				'orderItemId': [
					'orderItemId must be a string',
					'orderItemId must exist'
				],
				'testError': [
					'testError must exist'
				],
				'quantity': [
					'quantity must be numeric'
				]
			}
		});
	});
});

describe('Put fulfillment', () => {
	it('should make valid fetch', async () => {
		const request = {
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			}
		};
		const result = await sdk.cart.putFulfillment(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual({
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			}
		});

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/${CART_TOKEN}/fulfillment`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest('PUT'),
				body: JSON.stringify({
					fulfillment: {
						fulfillment_type: FulfillmentType.SHIPMENT
					},
				})
			})
		);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should make valid fetch with location id included', async () => {
		const request = {
			fulfillment: {
				fulfillmentType: FulfillmentType.DELIVERY,
				deliveryDetails: {
					scheduleType: ScheduleType.ASAP,
					recipient: {
						address: {
							addressLine1: '14515 Northeast 17th Street',
							addressLine2: 'Apt 111',
							locality: 'Bellevue',
							postalCode: '98004',
							country: 'US',
							administrativeDistrictLevel1: 'WA',
						},
					},
					noContactDelivery: true,
				},
			},
			locationId: 'location'
		};
		const result = await sdk.cart.putFulfillment(request);
		// Verify request isn't modified by SDK
		expect(request).toStrictEqual({
			fulfillment: {
				fulfillmentType: FulfillmentType.DELIVERY,
				deliveryDetails: {
					scheduleType: 'ASAP',
					recipient: {
						address: {
							addressLine1: '14515 Northeast 17th Street',
							addressLine2: 'Apt 111',
							locality: 'Bellevue',
							postalCode: '98004',
							country: 'US',
							administrativeDistrictLevel1: 'WA',
						},
					},
					noContactDelivery: true,
				},
			},
			locationId: 'location'
		});

		expect(fetch).toHaveBeenCalledWith(
			`${CART_API_URL}/${CART_TOKEN}/fulfillment`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest('PUT'),
				body: JSON.stringify({
					fulfillment: {
						fulfillment_type: FulfillmentType.DELIVERY,
						delivery_details: {
							schedule_type: 'ASAP',
							recipient: {
								address: {
									address_line_1: '14515 Northeast 17th Street',
									address_line_2: 'Apt 111',
									locality: 'Bellevue',
									postal_code: '98004',
									country: 'US',
									administrative_district_level_1: 'WA',
								},
							},
							no_contact_delivery: true,
						},
					},
					location_id: 'location',
				})
			})
		);

		expect(result).toStrictEqual(okFetchResult);
	});

	it('should throw error', async () => {
		const fetchResponse = createFetchResponse({}, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const putFulfillmentFn = sdk.cart.putFulfillment({
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			}
		});

		await expect(putFulfillmentFn).rejects.toThrowError(STATUS_TEXT);
		await expect(putFulfillmentFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw internal error', async () => {
		const putFulfillmentResponse = {
			error: 'error message'
		};
		const fetchResponse = createFetchResponse(putFulfillmentResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const putFulfillmentFn = sdk.cart.putFulfillment({
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			}
		});

		await expect(putFulfillmentFn).rejects.toThrowError(putFulfillmentResponse.error);
		await expect(putFulfillmentFn).rejects.toMatchObject({
			status: 500
		});
	});

	it('should throw validation error', async () => {
		const putFulfillmentResponse = {
			message: 'fulfillment is required (and 1 more error)',
			errors: {
				'fulfillment': [
					'fulfillment is required'
				],
				'fulfillment.fulfillment_type': [
					'fulfillment.fulfillment type is required'
				]
			}
		};
		const fetchResponse = createFetchResponse(putFulfillmentResponse, false, 500);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const putFulfillmentFn = sdk.cart.putFulfillment({
			fulfillment: {
				fulfillmentType: FulfillmentType.SHIPMENT
			}
		});

		await expect(putFulfillmentFn).rejects.toThrowError('fulfillment is required (and 1 more error)');
		await expect(putFulfillmentFn).rejects.toMatchObject({
			status: 500,
			errors: {
				'fulfillment': [
					'fulfillment is required'
				],
				'fulfillment.fulfillmentType': [
					'fulfillment.fulfillment type is required'
				]
			}
		});
	});
});