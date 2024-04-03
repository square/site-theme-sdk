/* eslint-disable @typescript-eslint/naming-convention */
import type {
	Money
} from '../money';

import {
	TimeString,
	Duration,
} from '../datetime';

import {
	FulfillmentType,
} from '../../api/cart';

export enum OpenStatus {
	CURRENTLY_OPEN = 'currentlyOpen',
	OPENS_LATER_TODAY = 'opensLaterToday',
	OPENS_ANOTHER_DAY = 'opensAnotherDay',
}

export interface OpenStatusDayAndTime {
	status: OpenStatus;
	time: string;
	day: string;
}

export interface Address {
	address_line_1: string;
	administrative_district_level_1: string;
	country: string;
	email: string; 
	locality: string;
	name: string;
	phone: string;
	postal_code: string;
}

export interface Coordinates {
	latitude?: number;
	longitude?: number;
}

export interface LocationFulfillmentSettings {
	no_eta_instructions: string;
	no_eta_short_instructions: string;
}

export interface OpenInterval {
	close_formatted: string;
	close: TimeString;
	open_formatted: string;
	open: TimeString;
}

export interface Hours {
	MON: OpenInterval[];
	TUE: OpenInterval[];
	WED: OpenInterval[];
	THU: OpenInterval[];
	FRI: OpenInterval[];
	SAT: OpenInterval[];
	SUN: OpenInterval[];
}

export interface SchedulePickup {
	enabled: boolean;
	max_days: number;
}

export interface RadiusLength {
	unit: string;
	length: number;
}

export interface DeliveryAreas {
	id: string;
	type: string;
	radius_center: Coordinates;
	radius_length: RadiusLength;
	zipcode: string;
}

export interface Couriers {
	id: string;
	name: string;
	is_choose_for_me_selection: boolean;
}

export interface LocationTimezone {
	name: string;
	offset_minutes: number;
	offset_string: string;
}

export interface LocationPickupDetails {
	auto_assign_time: boolean;
	curbside_pickup_enabled: boolean;
	cutoff_time: string;
	enabled: boolean;
	hours: Hours;
	instructions: string;
	max_orders_per_window: number;
	minimum_days_required: number;
	order_subtotal_minimum: Money;
	prep_time_duration: Duration;
	schedule_pickup: SchedulePickup;
	timeslot_type: string;
}

export interface FreeFulfillmentCondition {
	fulfillment_type: typeof FulfillmentType.DELIVERY | typeof FulfillmentType.SHIPMENT;
	min_order: Money;
	coverage: string;
}

export interface LocationDeliveryDetails {
	enabled: boolean;
	areas: DeliveryAreas[];
	couriers: Couriers[];
	estimated_max_duration: Duration;
	estimated_min_duration: Duration;
	odd_fee_maximum_enabled: boolean;
	odd_fee_maximum: Money;
	service_fee_money: Money;
	service_fee_percentage: number;
	min_fee: Money;
	max_fee: Money;
	no_contact_enabled: boolean;
	prep_time_duration: Duration;
	schedule_delivery_enabled: boolean;
	order_subtotal_minimum: Money;
	hours: Hours;
	free_fulfillment_conditions: FreeFulfillmentCondition[];
}

export interface Location {
	address: Address;
	coordinates: Coordinates;
	country: string;
	created_at: string;
	description: string;
	fulfillment: LocationFulfillmentSettings;
	id: string;
	is_shipping_location: boolean;
	name: string;
	'PICKUP': LocationPickupDetails;
	'DELIVERY': LocationDeliveryDetails;
	resource_type: string;
	service_fee: number;
	square_online_id: string;
	timezone: LocationTimezone;
	square_business_hours: Hours;
}

export interface LocationOpenTimeResponse {
	status: OpenStatus;
	time: string;
}