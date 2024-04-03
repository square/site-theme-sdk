import {
	CartError,
	CartBaseRequest,
	AddItemRequest,
	BuyNowItemRequest,
	UpdateItemQuantityRequest,
	RemoveItemRequest,
	CartResponse,
	CartValidationErrors,
	CartFulfillment,
	PutFulfillmentRequest,
	AddItemModifier,
	ScheduleType,
	FulfillmentType,
} from '../types/api/cart';

import {
	CartBaseErrorResponse,
	CartFetchResponse,
	CartRedirectFetchResponse,
	CartFetchBody,
} from '../types/api/cart/private.types';

import {
	buildHeaders
} from '../helpers/auth';

import {
	getCookie
} from '../helpers/cookies';

import type LooseObject from '../types/looseobject';

const CART_API_PREFIX = '/s/api/v1/cart';
const GENERIC_ERROR_MSG = 'Something went wrong';

const getCartError = (response: Response, responseJson: CartBaseErrorResponse) => {
	const errorMessage = convertSnakeToCamel(responseJson.error || responseJson.message || response.statusText);
	const cartError = new Error(errorMessage) as CartError;
	if (responseJson.errors) {
		const camelErrors: CartValidationErrors = {};
		// Because we set the interface to use camel case, let's
		// transform the validation errors to use that as well
		Object.keys(responseJson.errors).forEach(k => {
			const camelErrorsValues = responseJson.errors![k].map(e => convertSnakeToCamel(e));
			camelErrors[convertSnakeToCamel(k)] = camelErrorsValues;
		});
		cartError.errors = camelErrors;
	}
	if (responseJson.fields) {
		cartError.fields = responseJson.fields;
	}
	if (response.status) {
		cartError.status = response.status;
		// Redirect is a valid 200, but because it's a redirect for an error
		// change the status to 500 for the error object we're throwing
		if (cartError.status === 200) {
			cartError.status = 500;
		}
	}
	return cartError;
};

const createCartResponse = async (response: Response): Promise<CartResponse> => {
	const responseJson = await response.json() as CartFetchResponse;

	if (!response.ok) {
		const cartError = getCartError(response, responseJson);
		throw cartError;
	}

	return {
		response,
		data: responseJson.data!,
	};
};

const createCartRedirectResponse = async (response: Response): Promise<void> => {
	if (response.redirected) {
		// If we're redirected to the current URL, something went wrong
		if (window.location.href === response.url) {
			const jsonResponse = await response.json() as CartRedirectFetchResponse;

			if (jsonResponse?.response?.errors) {
				const cartError = getCartError(response, jsonResponse.response.errors);
				throw cartError;
			}
			// Should never hit here...
			throw new Error(GENERIC_ERROR_MSG) as CartError;
		}
		window.location.href = response.url;
		return;
	} else if (!response.ok) {
		const jsonResponse = await response.json() as CartBaseErrorResponse;
		const cartError = getCartError(response, jsonResponse);
		throw cartError;
	}
	// Should never hit here...
	throw new Error(GENERIC_ERROR_MSG) as CartError;
};

const convertSnakeToCamel = (str: string) => {
	return str.replace(/[_][a-z0-9]/g, group =>
		group.toUpperCase().replace('_', ''));
};

const convertCamelToSnake = (str: string) => {
	return str.replace(/[A-Z0-9]/g, letter => `_${letter.toLowerCase()}`);
};

const convertCamelObjToSnakeObj = (camelObj: LooseObject) => {
	const snakeObj: LooseObject = {};
	Object.keys(camelObj).forEach(c => {
		const value = camelObj[c as keyof object];
		if (Array.isArray(value)) {
			snakeObj[convertCamelToSnake(c) as keyof object] = convertCamelObjToSnakeObjInArray(value);
		} else if (value && typeof value === 'object') {
			snakeObj[convertCamelToSnake(c) as keyof object] = convertCamelObjToSnakeObj(<LooseObject>value);
		} else {
			snakeObj[convertCamelToSnake(c) as keyof object] = value;
		}
	});
	return snakeObj;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const convertCamelObjToSnakeObjInArray = (array: any[]) => {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const snakeArray: any[] = [];
	array.forEach(value => {
		if (Array.isArray(value)) {
			snakeArray.push(convertCamelObjToSnakeObjInArray(value));
		} else if (value && typeof value === 'object') {
			snakeArray.push(convertCamelObjToSnakeObj(value as LooseObject));
		} else {
			snakeArray.push(value);
		}
	});
	// eslint-disable-next-line @typescript-eslint/no-unsafe-return
	return snakeArray;
};

const createBuyNowItemFetchBody = (request: BuyNowItemRequest) => {
	const body = createAddItemFetchBody(request);
	// Buy now has no orderId
	delete body.order_id;
	return body;
};

const createFulfillment = (cartFulfillment: CartFulfillment) => {
	const fulfillment: CartFulfillment = JSON.parse(JSON.stringify(cartFulfillment));
	if (fulfillment.fulfillmentType === FulfillmentType.PICKUP) {
		if (!fulfillment.pickupDetails) {
			fulfillment.pickupDetails = {};
		}
		if (!fulfillment.pickupDetails.scheduleType) {
			fulfillment.pickupDetails.scheduleType = ScheduleType.ASAP;
		}
		if (fulfillment.pickupDetails.curbsidePickupRequested == undefined) {
			fulfillment.pickupDetails.curbsidePickupRequested = false;
		}
		if (!fulfillment.pickupDetails.curbsidePickupDetails) {
			fulfillment.pickupDetails.curbsidePickupDetails = {
				curbsideDetails: ''
			};
		}
	} else if (fulfillment.fulfillmentType === FulfillmentType.DELIVERY && fulfillment.deliveryDetails) {
		if (fulfillment.deliveryDetails.noContactDelivery == undefined) {
			fulfillment.deliveryDetails.noContactDelivery = false;
		}
		if (!fulfillment.deliveryDetails.scheduleType) {
			fulfillment.deliveryDetails.scheduleType = ScheduleType.ASAP;
		}
	}
	return fulfillment;
};

const createAddItemFetchBody = (request: AddItemRequest | BuyNowItemRequest) => {
	// We want to keep all our props as camel case for consistency in our interface
	// Need to transform these back to the snake case the server expects

	const clonedRequestLineItem = JSON.parse(JSON.stringify(request.lineItem)) as LooseObject;
	if (!clonedRequestLineItem.quantity) {
		clonedRequestLineItem.quantity = 1;
	}
	const lineItem = convertCamelObjToSnakeObj(clonedRequestLineItem);

	// Transform modifiers into the format the server expects
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	if (lineItem.modifiers?.length) {
		const modifiers: Record<string, Record<string, Omit<AddItemModifier, 'id' | 'type'>>> = {};
		(<AddItemModifier[]>lineItem.modifiers).forEach(m => {
			if (m.type) {
				if (!modifiers[m.type]) {
					modifiers[m.type] = {};
				}
				const clonedModifier = JSON.parse(JSON.stringify(m)) as LooseObject;
				delete clonedModifier.id;
				delete clonedModifier.type;
				(<LooseObject>modifiers[m.type])[m.id] = clonedModifier;
			}
		});

		lineItem.modifiers = modifiers;
	} else if (lineItem.modifiers) {
		// Remove empty modifier array
		delete lineItem.modifiers;
	}

	const fetchBody: CartFetchBody = {
		line_item: lineItem,
		fulfillment: convertCamelObjToSnakeObj(createFulfillment(request.fulfillment)),
		location_id: request.locationId,
		// JSON.stringify will remove if undefined
		order_id: getOrderId(<AddItemRequest>request)
	};

	return fetchBody;
};

const getOrderId = (request: CartBaseRequest) => {
	if (request.orderId !== undefined) {
		return request.orderId;
	} else {
		return getCookie('com_cart_id') || undefined;
	}
};

export class Cart {
	/**
     * Retrieves the active cart id if it exists.
     *
     * ```ts
     * 	const cartId = sdk.cart.getActiveId();
     * ```
     */
	getActiveId(): string | undefined {
		return getCookie('com_cart_id') || undefined;
	}

	/**
     * Adds an item to your cart order.
     *
     * ```ts
     *	const addItemRequest = {
     *		lineItem: {
     *			itemId: '47HCEE6ZQUFFY3Y7X52CRVCO',
     *			variationId: '6YOTMYGOFTJR4PTTYRCLE7BH',
     *			quantity: 1,
     *			modifiers: [
     *				{
     *					id: '6WVGAE3PKEHRWZHF54KR2PIN',
     *					type: 'CHOICE',
     *					choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
     *				},
     *				{
     *					id: '11ede91fbff63a3ab4dbde667deefb9b',
     *					type: 'TEXT',
     *					textEntry: 'my t-shirt-text'
     *				},
     *				{
     *					id: '11ee185ca1cd3e98a25c9e3d692ffefb',
     *					type: 'GIFT_WRAP',
     *					choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
     *				},
     *				{
     *					id: '11ee185ca17973e490449e3d692ffefb',
     *					type: 'GIFT_MESSAGE',
     *					textEntry: 'happy bday'
     *				}
     *			]
     *		},
     *		fulfillment: {
     *			fulfillmentType: 'SHIPMENT'
     *		},
     *		locationId: 'L36RW9ABXQTEE'
     *	};
     *	try {
     *		const response = await sdk.cart.addItem(addItemRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link CartError}
     */
	async addItem(request: AddItemRequest): Promise<CartResponse> {
		const addItemFetchBody = createAddItemFetchBody(request);
		const response = await fetch(`${CART_API_PREFIX}/add`, {
			method: 'POST',
			body: JSON.stringify(addItemFetchBody),
			headers: buildHeaders()
		});
		return await createCartResponse(response);
	}

	/**
     * Adds an item to a new order and redirects to checkout on success.
     *
     * ```ts
     *	const buyNowItemRequest = {
     *		lineItem: {
     *			itemId: '47HCEE6ZQUFFY3Y7X52CRVCO',
     *			variationId: '6YOTMYGOFTJR4PTTYRCLE7BH',
     *			quantity: 1,
     *			modifiers: [
     *				{
     *					id: '6WVGAE3PKEHRWZHF54KR2PIN',
     *					type: 'CHOICE',
     *					choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
     *				},
     *				{
     *					id: '11ede91fbff63a3ab4dbde667deefb9b',
     *					type: 'TEXT',
     *					textEntry: 'my t-shirt-text'
     *				},
     *				{
     *					id: '11ee185ca1cd3e98a25c9e3d692ffefb',
     *					type: 'GIFT_WRAP',
     *					choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
     *				},
     *				{
     *					id: '11ee185ca17973e490449e3d692ffefb',
     *					type: 'GIFT_MESSAGE',
     *					textEntry: 'happy bday'
     *				}
     *			]
     *		},
     *		fulfillment: {
     *			fulfillmentType: 'SHIPMENT'
     *		},
     *		locationId: 'L36RW9ABXQTEE'
     *	};
     *	try {
     *		await sdk.cart.buyNowItem(buyNowItemRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link CartError}
     */
	async buyNowItem(request: BuyNowItemRequest): Promise<void> {
		const buyNowFetchBody = createBuyNowItemFetchBody(request);
		const response = await fetch(`${CART_API_PREFIX}/buy`, {
			method: 'POST',
			body: JSON.stringify(buyNowFetchBody),
			headers: buildHeaders()
		});
		return createCartRedirectResponse(response);
	}

	/**
     * Updates the quantity of an item on an order. Quantity must be greater than 0.
     *
     * ```ts
     *	const updateItemQuantityRequest = {
     *		orderItemId: '11ee2722e42886d182fa089e019fd17a',
     *		quantity: 2
     *	};
     *	try {
     *		const response = await SDK.cart.updateItemQuantity(updateItemQuantityRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link CartError}
     */
	async updateItemQuantity(request: UpdateItemQuantityRequest): Promise<CartResponse> {
		const response = await fetch(`${CART_API_PREFIX}/update-quantity`, {
			method: 'POST',
			body: JSON.stringify({
				order_item_id: request.orderItemId,
				quantity: request.quantity,
				order_id: getOrderId(request)
			}),
			headers: buildHeaders()
		});

		return createCartResponse(response);
	}

	/**
     * Removes a line item from an order.
     *
     * ```ts
     *	const removeItemRequest = {
     *		orderItemId: '11ee2722e42886d182fa089e019fd17a'
     *	};
     *	try {
     *		const response = await SDK.cart.removeItem(removeItemRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link CartError}
     */
	async removeItem(request: RemoveItemRequest): Promise<CartResponse> {
		const response = await fetch(`${CART_API_PREFIX}/remove-item`, {
			method: 'POST',
			body: JSON.stringify({
				order_item_id: request.orderItemId,
				order_id: getOrderId(request)
			}),
			headers: buildHeaders()
		});

		return createCartResponse(response);
	}

	/**
     * Replaces the fulfillment on an order.
     *
     * ```ts
     *	const putFulfillmentRequest = {
     *		fulfillment: {
     *			fulfillmentType: 'PICKUP',
     *			pickupDetails: {
     *				curbsidePickupRequested: true,
     *				curbsidePickupDetails: {
     *					curbsideDetails: 'Contactless please'
     *				},
     *			}
     *		}
     *	};
     *	try {
     *		const response = await sdk.cart.putFulfillment(putFulfillmentRequest);
     *	} catch (error) {
     *		// Handle errors
     *	}
     * ```
     * @throws {@link CartError}
     */
	async putFulfillment(request: PutFulfillmentRequest): Promise<CartResponse> {
		const response = await fetch(`${CART_API_PREFIX}/${getOrderId(request)}/fulfillment`, {
			method: 'PUT',
			body: JSON.stringify({
				fulfillment: convertCamelObjToSnakeObj(createFulfillment(request.fulfillment)),
				location_id: request.locationId,
			}),
			headers: buildHeaders()
		});

		return createCartResponse(response);
	}
}
