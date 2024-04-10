/* eslint-disable @typescript-eslint/no-explicit-any */

/** ResourcesRequest can take up to 5 keys (each representing a resource). */
export interface ResourcesRequest {
    [key: string]: ResourceInput;
}

/** `key` is the same key we used in the request object, and the value is the resource being returned. */
export interface ResourcesResponse {
    [key: string]: {
        data?: any;
        errors: string[];
    };
}

/* eslint-disable @typescript-eslint/naming-convention */
export interface CartResourceInput {
    type: 'cart';
}

export interface BaseListResourceInput {
    pagination?: {
        page_size?: number;
        page_query_param?: string;
    };
    sort?: {
        by?: string;
        order?: string;
    };
}

export interface TimeOption {
    days?: number;
    hours?: number;
    minutes?: number;
    seconds?: number;
}

export interface CategoryResourceInput {
    type: 'category';
    filters: {
        id: string;
        location_id?: string;
        status?: Array<string>;
        availability?: {
            by: string;
            time: {
                from?: string;
                add?: TimeOption;
                subtract?: TimeOption;
            };
        };
    };
}

export interface CategoryHierarchyResourceInput {
    type: 'category-hierarchy';
    filters?: {
        parent?: string;
        location_id?: string;
    };
}

export interface CategoryListResourceInput extends BaseListResourceInput {
    type: 'category-list';
    filters?: {
        ids?: Array<string>;
        location_id?: string;
        status?: Array<string>;
        search?: string;
        availability?: {
            by: string;
            time: {
                from?: string;
                add?: TimeOption;
                subtract?: TimeOption;
            };
        };
    };
}

export interface CategoryOptionsResourceInput {
    type: 'category-options';
    filters: {
        category_id: string;
    };
}

export interface CustomerAccountResourceInput {
    type: 'customer-account';
}

export interface DiscountListResourceInput extends BaseListResourceInput {
    type: 'discount-list';
}

export interface ItemResourceInput {
    type: 'item';
    filters: {
        id: string;
        location_id?: string;
        square_online_id?: boolean;
    };
}

export interface ItemListResourceInput extends BaseListResourceInput {
    type: 'item-list';
    filters?: {
        ids?: Array<string>;
        location_id?: string;
        status?: Array<string>;
        category_id?: string;
        category_ids?: Array<string>;
        price_min?: number;
        price_max?: number;
        search?: string;
        fulfillments?: Array<string>;
        square_online_id?: boolean;
        similar_item_ids?: Array<string>;
        option_choices?: Array<string>;
        has_discounts?: boolean;
    };
}

export interface LocationResourceInput {
    type: 'location';
    filters: {
        id: string;
        square_online_id?: boolean;
    };
}

export interface LocationListResourceInput extends BaseListResourceInput {
    type: 'location-list';
    filters?: {
        ids?: Array<string>;
        square_online_id?: boolean;
        fulfillments?: Array<string>;
    };
}

export interface ScheduleResourceInput {
    type: 'schedule';
    filters?: {
        location_id?: string;
        square_online_id?: boolean;
        end?: {
            from?: string;
            add?: TimeOption;
            subtract?: TimeOption;
        };
        start?: {
            from?: string;
            add?: TimeOption;
            subtract?: TimeOption;
        };
        interval?: string;
        fulfillment?: string;
    };
}

export interface StoryResourceInput {
    type: 'story';
    filters: {
        id: string;
    };
}

export interface StoryListResourceInput extends BaseListResourceInput {
    type: 'story-list';
    filters?: {
        ids?: Array<string>;
    };
}
/* eslint-enable @typescript-eslint/naming-convention */

export type ResourceInput =
    CartResourceInput |
    CategoryResourceInput |
    CategoryHierarchyResourceInput |
    CategoryListResourceInput |
    CategoryOptionsResourceInput |
    CustomerAccountResourceInput |
    DiscountListResourceInput |
    ItemResourceInput |
    ItemListResourceInput |
    LocationResourceInput |
    LocationListResourceInput |
    ScheduleResourceInput |
    StoryResourceInput |
    StoryListResourceInput;
