/* eslint-disable @typescript-eslint/naming-convention */

import {
	AddItemModifier,
	ModifierTypeEnum
} from '../../api/cart';

import {
	Money
} from '../money';

export const QuantityErrorType = {
	INVALID_QUANTITY: 'INVALID_QUANTITY',
	SOLD_OUT: 'SOLD_OUT',
	STOCK_EXCEEDED: 'STOCK_EXCEEDED',
	PER_ORDER_MAX_EXCEEDED: 'PER_ORDER_MAX_EXCEEDED'
} as const;

export type QuantityErrorTypeEnum = typeof QuantityErrorType[keyof typeof QuantityErrorType];

export const SquareOnlineType = {
	EVENT: 'EVENT',
	PHYSICAL: 'PHYSICAL',
} as const;

export type SquareOnlineTypeEnum = typeof SquareOnlineType[keyof typeof SquareOnlineType];

export interface OptionSelection {
    itemOptionId: string;
    choice: string;
}

export interface ItemPrice {
    regular: Money;
    sale: Money;
}

export interface ValidateItemError extends Error {
    itemOptionIds?: string[];
    flatVariationSelectionMissing?: boolean;
    variationId?: string;
    quantityErrorType?: QuantityErrorTypeEnum;
    modifierListIds?: string[];
}

export interface GetInStockVariationsForSelectedOptionsOrVariationRequest {
    item: Item;
    selectedOptions?: OptionSelection[];
    selectedVariationId?: string;
    skipStockCheck?: boolean;
}

export interface ValidateItemRequest {
    item: Item;
    selectedOptions?: OptionSelection[];
    selectedModifiers?: AddItemModifier[];
    selectedVariationId?: string;
    quantity?: number;
    skipStockCheck?: boolean;
    skipModifierCheck?: boolean;
}

export interface GetItemPriceRequest {
    item: Item;
    selectedOptions?: OptionSelection[];
    selectedModifiers?: AddItemModifier[];
    selectedVariationId?: string;
    skipStockCheck?: boolean;
    skipModifierCheck?: boolean;
    /** The locale to format the Money object in (BCP 47). */
    formattedLocale?: string;
}

// Below are models of server resources with the subset of properties we care about.

export interface Variation {
    id: string;
    item_option_values?: {
        [itemOptionId: string]: {
            choice: string;
            name: string;
        };
    };
    sold_out: boolean;
    inventory?: number;
    inventory_tracking_enabled: boolean;
	price: {
		regular: Money;
		sale: Money;
	};
}

export interface ItemOption {
    choices: string[];
    id: string;
    name: string;
}

export interface Modifier {
    id: string;
    name: string;
    price_money: Money;
    sold_out: boolean;
}

export interface ModifierList {
    id: string;
    max_selected_modifiers: number;
    min_selected_modifiers: number;
    modifiers?: Modifier[];
    name: string;
    type: ModifierTypeEnum;
}

export interface ItemPrepTime {
    value: number;
    unit: string;
    is_time: boolean;
}

export interface Item {
    id: string;
    variations: Variation[];
    item_options?: ItemOption[];
    modifier_lists?: ModifierList[];
    per_order_max: number | null;
    square_online_type: SquareOnlineTypeEnum;
    item_type_details: {
        end_date?: string;
        end_time?: string;
        timezone_info?: {
            utc_offset_string: string;
        };
    };
    preordering: {
        'PICKUP': boolean;
    };
    fulfillment_availability: {
        'PICKUP': {
            availability_cutoff_at: string;
        }[];
    };
}
