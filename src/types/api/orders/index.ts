/* eslint-disable @typescript-eslint/naming-convention */

import type LooseObject from '../../looseobject';

export interface GetOrderResponse {
    is_full_order_currently_valid: boolean;
    items: Array<LooseObject>;
    order_fulfillment_method: string;
    order_paid_date: number;
}

export interface GetOrderRequest {
    jwtToken: string;
    locationId: string;
    fulfillments: Array<string>;
}
