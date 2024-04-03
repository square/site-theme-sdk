export const FulfillmentType = {
	SHIPMENT: 'SHIPMENT',
	PICKUP: 'PICKUP',
	DELIVERY: 'DELIVERY',
	MANUAL: 'MANUAL'
} as const;

export type FulfillmentTypeEnum = typeof FulfillmentType[keyof typeof FulfillmentType];

export const ScheduleType = {
	ASAP: 'ASAP',
	SCHEDULED: 'SCHEDULED'
} as const;

export type ScheduleTypeEnum = typeof ScheduleType[keyof typeof ScheduleType];

export const ModifierType = {
	CHOICE: 'CHOICE',
	TEXT: 'TEXT',
	GIFT_WRAP: 'GIFT_WRAP',
	GIFT_MESSAGE: 'GIFT_MESSAGE'
} as const;

export type ModifierTypeEnum = typeof ModifierType[keyof typeof ModifierType];

export const CurrencyType = {
	AUD: 'AUD',
	CAD: 'CAD',
	JPY: 'JPY',
	GBP: 'GBP',
	USD: 'USD',
	EUR: 'EUR'
} as const;

export type CurrencyTypeEnum = typeof CurrencyType[keyof typeof CurrencyType]

export interface CartValidationErrors {
	/**
	 * Each key represents an invalid payload property, with the array value showing the specific error(s).
	 * ```ts
	 *	'quantity': [
	 *		'quantity must be numeric'
	 *	]
	 * ```
	 */
	[key: string]: string[];
}

/** Depending on the error encountered, the `CartError` may contain any of the properties below. */
export interface CartError extends Error {
	/** Populated if an error status is received on the response.
	 * ```ts
	 * 	message: 'Something went wrong',
	 * 	status: 500
	 * ```
	*/
	status?: number;
	/**
	 * Populated if there are any invalid IDs passed.
	 * ```ts
	 * 	message: 'Invalid IDs passed in payload',
	 * 	fields: [
	 * 		'invalidId1',
	 * 		'invalidId2'
	 * 	]
	 * ```
	 */
	fields?: string[];
	/**
	 * Populated if there are any validation errors
	 * ```ts
	 * 	message: 'fulfillment is required (and 1 more error)',
	 * 	errors: {
	 * 		'fulfillment': [
	 *			'fulfillment is required'
	 *		],
	 *		'fulfillment.fulfillmentType': [
	 *			'fulfillment.fulfillment type is required'
	 *		]
	 *	}
	 * ```
	 */
	errors?: CartValidationErrors;
}

export interface BaseModifier {
	/** The ID of the modifier. */
	id: string;
}

export interface ChoiceModifier extends BaseModifier {
	/** The modifier type. */
	type: 'CHOICE';
	/** Choice selections for modifier. */
	choiceSelections: string[];
}

export interface TextModifier extends BaseModifier {
	/** The modifier type. */
	type: 'TEXT';
	/** Text entry for modifier. */
	textEntry: string;
}

export interface GiftWrapModifier extends BaseModifier {
	/** The modifier type. */
	type: 'GIFT_WRAP';
	/** Choice selections for modifier. */
	choiceSelections: string[];
}

export interface GiftMessageModifier extends BaseModifier {
	/** The modifier type. */
	type: 'GIFT_MESSAGE';
	/** Text entry for modifier. */
	textEntry: string;
}

/**
 * A modifier that can be applied to the item for the `addItem` API.
 * ```ts
 * 	[
 * 		{
 *			id: '6WVGAE3PKEHRWZHF54KR2PIN',
 *			type: ModifierType.CHOICE,
 *			choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
 *		},
 *		{
 *			id: '11ede91fbff63a3ab4dbde667deefb9b',
 *			type: ModifierType.TEXT,
 *			textEntry: 'My T-Shirt Text'
 *		},
 *		{
 *			id: '11ee185ca1cd3e98a25c9e3d692ffefb',
 *			type: ModifierType.GIFT_WRAP,
 *			choiceSelections: ['11ee185ca1cd7daebd029e3d692ffefb']
 *		},
 *		{
 *			id: '11ee185ca17973e490449e3d692ffefb',
 *			type: ModifierType.GIFT_MESSAGE,
 *			textEntry: 'Happy Birthday!'
 *		}
 *	]
 * ```
 */
export type AddItemModifier = ChoiceModifier | TextModifier | GiftWrapModifier | GiftMessageModifier;

/**
 * A modifier that can be applied to the item for the `buyNowItem` API with a `subscriptionPlanVariationId` set.
 * Only difference from the `AddItemModifier` is `GIFT_WRAP` and `GIFT_MESSAGE` types are unavailable.
 * ```ts
 * 	[
 * 		{
 *			id: '6WVGAE3PKEHRWZHF54KR2PIN',
 *			type: ModifierType.CHOICE,
 *			choiceSelections: ['E3MWZ3PJ3VZDQWGW4G3KFZGW', 'GKCUYTB7ARN25J7BTRTOSVHO']
 *		},
 *		{
 *			id: '11ede91fbff63a3ab4dbde667deefb9b',
 *			type: ModifierType.TEXT,
 *			textEntry: 'My T-Shirt Text'
 *		}
 *	]
 * ```
 */
export type BuyNowSubscriptionItemModifier = ChoiceModifier | TextModifier;

/**
 * The item being added for the `addItem` API.
 */
export interface AddLineItem {
	/** The ID of the item being added. */
	itemId: string;
	/** The variaton for the item being added. */
	variationId: string;
	/** The quantity of the item being added. Defaults to 1. */
	quantity?: number;
	/** An array of modifiers applied to the item being added. */
	modifiers?: AddItemModifier[];
	/** Price override for a custom amount. Only applicable for donations.
	 * ```ts
	 * 	priceOverride: {
	 * 		amount: 1000, // $10.00
	 * 		currency: CurrencyType.USD
	 * 	}
	 * ```
	*/
	priceOverride?: {
		/** The amount in subunits based on the provided currency. */
		amount: number;
		/** The currency type to use. */
		currency: CurrencyTypeEnum;
	};
	/** Subscriptions unavailable on `AddLineItem`. */
	subscriptionPlanVariationId?: undefined;
}

/**
 * The item being added for the `buyNowItem` API.
 */
export interface BuyNowSubscriptionLineItem extends Omit<AddLineItem, 'subscriptionPlanVariationId'> {
	/** If `subscriptionPlanVariationId` is set, modifiers are limited to
	 * the types in `BuyNowSubscriptionItemModifier`
	 */
	modifiers?: BuyNowSubscriptionItemModifier[];
	/** The variation ID for the subscription plan to be applied to the item.
	 * The Buy Now will redirect to /s/subscription-checkout.
	 */
	subscriptionPlanVariationId: string;
}

export interface CartBaseRequest {
	/** The ID of an existing order if adding to it. If not provided, the existing order from
	 * the cookies will be used or a new order will be created if one doesn't exist. Can
	 * also pass an empty string to force a new order to be created. */
	orderId?: string;
}

export interface DeliveryRecipient {
	address: {
		/**
		 * e.g. "New York"
		 */
		locality: string;
		/**
		 * e.g. "US"
		 */
		country: string;
		/**
		 * e.g. "10013"
		 */
		postalCode: string;
		/**
		 * e.g. "New York"
		 */
		administrativeDistrictLevel1: string;
		/**
		 * e.g. "New York County"
		 */
		administrativeDistrictLevel2?: string;
		/**
		 * e.g. "Town of New York"
		 */
		administrativeDistrictLevel3?: string;
		/**
		 * e.g. "District 7"
		 */
		subLocality?: string;
		/**
		 * e.g. "Neighborhood"
		 */
		subLocality2?: string;
		/**
		 * e.g. "Housing colony"
		 */
		subLocality3?: string;
		/**
		 * e.g. "100 6th avenue"
		 */
		addressLine1: string;
		addressLine2?: string;
		addressLine3?: string;
	};
}

/** The order fullfillment to be provided when adding an item or
 * replacing an existing order's fulfillment.
 * ```ts
 * 	{
 * 		fulfillmentType: FulfillmentType.SHIPMENT
 * 	}
 * ```
 * ```ts
 * 	{
 * 		fulfillmentType: FulfillmentType.PICKUP,
 * 		pickupDetails: {
 * 			scheduleType: ScheduleType.ASAP,
 * 			curbsidePickupRequested: true,
 * 			curbsidePickupDetails: {
 * 				curbsideDetails: 'Please leave box on the sidewalk'
 * 			},
 * 			pickupAt: new Date().toISOString().split('.')[0] + 'Z'
 * 		}
 * 	}
 * ```
 */
export interface CartFulfillment {
	/** The fulfillment type to use.
	 *
	 * Note that `MANUAL` is used for `DONATION`, `EVENT`, `OTHER`, and `SIMPLE_DIGITAL` item types.
	 */
	fulfillmentType: FulfillmentTypeEnum;
	/** If the `fulfillmentType` is `PICKUP`, then pickup details must be provided. The SDK will create a
	 *  default if not provided for 'PICKUP'.
	 */
	pickupDetails?: {
		/** The schedule type to use for pickup. `ASAP` is the default if not provided. */
		scheduleType?: ScheduleTypeEnum;
		/** Set to true if curbside pickup is requested. Default is false. */
		curbsidePickupRequested?: boolean;
		/** Required if `curbsidePickupRequested` is set to true. */
		curbsidePickupDetails?: {
			/** Message from buyer for curbside details. Maximum 500 characters.
			 *  Default is an empty string.
			 */
			curbsideDetails: string;
		};
		/** The time for the order to be picked up in RFC 3339 format.
		 *  For schedule type `ASAP` it does not need to be included.
		 */
		pickupAt?: string;
	};
	/** If the `fulfillmentType` is `DELIVERY`, then delivery details must be provided.
	 */
	deliveryDetails?: {
		/** The schedule type to use for pickup. `ASAP` is the default if not provided. */
		scheduleType?: ScheduleTypeEnum;
		/** Denotes whether the delivery should done with no contact. Default is false. */
		noContactDelivery?: boolean;
		/** Order note information provided to the seller. */
		note?: string;
		/** Delivery address information. */
		recipient: DeliveryRecipient;
		/** The delivery window start time for the order in RFC 3339 format.
		 *  For schedule type `ASAP` it does not need to be included.
		 */
		deliverAt?: string;
	};
}

export interface AddItemBaseRequest {
	/** The fulfillment for the order. */
	fulfillment: CartFulfillment;
	/** The ID of the location for the order. */
	locationId: string;
}

export interface AddItemRequest extends AddItemBaseRequest, CartBaseRequest {
	/** Item to be added to the order. */
	lineItem: AddLineItem;
}

export interface BuyNowItemRequest extends AddItemBaseRequest {
	/** Item to be added to the order. */
	lineItem: AddLineItem | BuyNowSubscriptionLineItem;
}

export interface UpdateItemQuantityRequest extends CartBaseRequest {
	/** Order item ID from the order to update quantity for. */
	orderItemId: string;
	/** Quantity to be updated to. Must be larger than 0. */
	quantity: number;
}

export interface RemoveItemRequest extends CartBaseRequest {
	/** Order item ID from the order to remove. */
	orderItemId: string;
}

export interface PutFulfillmentRequest extends CartBaseRequest {
	/** The fulfillment for the order. */
	fulfillment: CartFulfillment;
	/** The ID of the location for the order. */
	locationId?: string;
}

export interface CartBaseResponse {
	data: {
		/** The `orderId` for the order. Only needed if you're
		 * doing very custom order management.
		 */
		cart: string;
		/** Validation for scheduling. Empty if not pickup or delivery fulfillment. */
		validation: CartValidation;
	};
}

export interface CartValidation {
	scheduled?: {
		/** Whether or not the pickup or delivery schedule update was valid. */
		valid: boolean;
		/** If the schedule update was invalid, the error reason why. */
		error: string;
	};
}

export interface CartResponse extends CartBaseResponse {
	/** The response from the Fetch API. */
	response: Response;
}
