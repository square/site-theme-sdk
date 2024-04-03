import { 
	CartValidationErrors,
	CartValidation
} from '.';

import type LooseObject from '../../looseobject';

/* eslint-disable @typescript-eslint/naming-convention */
// These types aren't exposed to the consumer. Only used to type protect logic in the APIs.

export interface CartBaseErrorResponse {
	error?: string;
	fields?: string[];
	message?: string;
	errors?: CartValidationErrors;
}

export interface CartFetchResponse extends CartBaseErrorResponse {
	data?: {
		cart: string;
		validation: CartValidation;
	};
}

export interface CartRedirectFetchResponse {
	response?: {
		errors: CartBaseErrorResponse;
	};
}

export interface CartFetchBody {
	line_item: LooseObject;
	fulfillment: LooseObject;
	location_id: string;
	order_id?: string;
}

export interface ScheduleResource {
	schedule?: {
		earliest_time: {
			time_unix: number;
		};
	};
}