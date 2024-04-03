import type {
	Location as LocationResource,
} from '../src/types/helpers/location';
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { getTestSquareOnlineWebSDK } from './helpers';

function createTestLocation(): LocationResource {
	const money = {
		amount: 500,
		currency: 'USD',
		formatted: '$5.00',
	};

	const location: LocationResource = {
		'DELIVERY': {
			'enabled': true,
			'areas': [
				{
					'id': 'test_id',
					'type': 'zipcode',
					'radius_center': {
						'latitude': 0,
						'longitude': 0
					},
					'radius_length': {
						'unit': 'mile',
						'length': 1
					},
					'zipcode': '00000'
				}
			],
			'couriers': [
				{
					'id': 'test_id',
					'name': 'seller',
					'is_choose_for_me_selection': false
				}
			],
			'estimated_max_duration': {
				'in_minutes': 10,
				'rfc3339_interval': 'PT10M',
			},
			'estimated_min_duration': {
				'in_minutes': 10,
				'rfc3339_interval': 'PT10M',
			},
			'odd_fee_maximum_enabled': false,
			'odd_fee_maximum': money,
			'no_contact_enabled': false,
			'order_subtotal_minimum': money,
			'service_fee_money': money,
			'max_fee': money,
			'min_fee': money,
			'service_fee_percentage': 3,
			'free_fulfillment_conditions': [],
			'prep_time_duration': {
				'in_minutes': 10,
				'rfc3339_interval': 'PT10M',
			},
			'schedule_delivery_enabled': false,
			'hours': {
				'SUN': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'MON': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'TUE': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'WED': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'THU': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'FRI': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'SAT': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				]
			}
		},
		'PICKUP': {
			'enabled': true,
			'curbside_pickup_enabled': false,
			'instructions': '',
			'order_subtotal_minimum': money,
			'prep_time_duration': {
				'in_minutes': 10,
				'rfc3339_interval': 'PT10M',
			},
			'schedule_pickup': {
				'enabled': false,
				'max_days': 90
			},
			'timeslot_type': 'SPECIFIC',
			'minimum_days_required': 0,
			'auto_assign_time': true,
			'max_orders_per_window': 10,
			'cutoff_time': 'test',
			'hours': {
				'SUN': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'MON': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'TUE': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'WED': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'THU': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'FRI': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				],
				'SAT': [
					{
						'open': '12:00:00',
						'close': '15:00:00',
						'open_formatted': '12:00 PM',
						'close_formatted': '3:00 PM'
					},
					{
						'open': '16:00:00',
						'close': '22:00:00',
						'open_formatted': '4:00 PM',
						'close_formatted': '10:00 PM'
					}
				]
			}
		},
		'id': 'test_id',
		'resource_type': 'LOCATION',
		'square_online_id': 'test_id',
		'name': 'Test',
		'description': '',
		'country': 'US',
		'timezone': {
			'name': 'UTC', // Location timezone must be the same as the system timezone
			'offset_string': '+00:00',
			'offset_minutes': 0
		},
		'service_fee': 3,
		'address': {
			'name': 'Location Tset',
			'country': '',
			'locality': '',
			'postal_code': '11211',
			'address_line_1': '',
			'administrative_district_level_1': '',
			'phone': '',
			'email': ''
		},
		'coordinates': {
			'latitude': 0,
			'longitude': 0
		},
		'created_at': 'test',
		'is_shipping_location': false,
		'square_business_hours': {
			'SUN': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'MON': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'TUE': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'WED': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'THU': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'FRI': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			],
			'SAT': [
				{
					'open': '12:00:00',
					'close': '15:00:00',
					'open_formatted': '12:00 PM',
					'close_formatted': '3:00 PM'
				},
				{
					'open': '16:00:00',
					'close': '22:00:00',
					'open_formatted': '4:00 PM',
					'close_formatted': '10:00 PM'
				}
			]
		},
		'fulfillment': {
			'no_eta_instructions': '',
			'no_eta_short_instructions': ''
		}
	};

	return location;
}

const sdk = getTestSquareOnlineWebSDK();

describe('Location fulfillment status day and time variations', () => {
	beforeEach(() => {
	// tell vitest we use mocked time
		vi.useFakeTimers();
	});

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	it('Should be currently open, open until 3pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 1:00:00 pm
		const date = new Date(2024, 0, 1, 13);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '3:00 pm',
			day: 'Monday',
		});
	});

	it('Should open later today, opens 4pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 3:30:00 pm
		const date = new Date(2024, 0, 1, 15, 30);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_LATER_TODAY,
			time: '4:00 pm',
			day: 'Monday',
		});
	});

	it('Should open another day, opens next available time Tuesday 12:00 pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 11:00:00 pm
		const date = new Date(2024, 0, 1, 23, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_ANOTHER_DAY,
			time: '12:00 pm',
			day: 'Tuesday',
		});
	});

	it('Should open later today, multiple future open intervals, should open at 12pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 10, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_LATER_TODAY,
			time: '12:00 pm',
			day: 'Monday',
		});
	});

	it('Should be currently open, but open/close interval spans between days (4:00pm - 4am)', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '16:00:00',
				'close': '24:00:00',
				'open_formatted': '4:00 PM',
				'close_formatted': '12:00 AM'
			},
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '04:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '4:00 AM'
			},
		];
		// Monday January 1, 2024 10:00:00 pm
		const date = new Date(2024, 0, 1, 20, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '4:00 am',
			day: 'Tuesday',
		});
	});

	it('Should be currently open, but open/close interval spans between days (4:00pm - 12:30am)', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '16:00:00',
				'close': '24:00:00',
				'open_formatted': '4:00 PM',
				'close_formatted': '12:00 AM'
			},
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '00:30:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:30 AM'
			},
		];
		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 20);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '12:30 am',
			day: 'Tuesday',
		});
	});

	it('Should be currently open, but open/close interval spans between days (4:00pm - 12:30am), current time is exactly midnight', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '16:00:00',
				'close': '24:00:00',
				'open_formatted': '4:00 PM',
				'close_formatted': '12:00 AM'
			},
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '00:30:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:30 AM'
			},
		];
		// Tuesday January 2, 2024 12:00:00 am
		// time set as monday at 24 hours
		const date = new Date(2024, 0, 1, 24, 0, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '12:30 am',
			day: 'Tuesday',
		});
	});

	it('Should be currently open, but open/close interval spans between days (4:00pm - 12:30am), current time is exactly midnight', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '16:00:00',
				'close': '24:00:00',
				'open_formatted': '4:00 PM',
				'close_formatted': '12:00 AM'
			},
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '00:30:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:30 AM'
			},
		];
		// Tuesday January 2, 2024 12:00:00 am
		// time set as tuesday at 0 hours
		const date = new Date(2024, 0, 2, 0, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '12:30 am',
			day: 'Tuesday',
		});
	});

	it('Should be currently open, interval is between 12:01 and 12:59 am', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '00:01:00',
				'close': '00:59:00',
				'open_formatted': '12:01 AM',
				'close_formatted': '12:59 AM'
			},
		];
		// Monday January 1, 2024 12:10:00 am
		const date = new Date(2024, 0, 1, 0, 10);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '12:59 am',
			day: 'Monday',
		});
	});

	it('No fulfillment hours exist on any days', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [];
		location['PICKUP'].hours['TUE'] = [];
		location['PICKUP'].hours['WED'] = [];
		location['PICKUP'].hours['THU'] = [];
		location['PICKUP'].hours['FRI'] = [];
		location['PICKUP'].hours['SAT'] = [];
		location['PICKUP'].hours['SUN'] = [];

		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 20, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual(null);
	});

	it('Pickup is available 24/7', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['WED'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['THU'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['FRI'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['SAT'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['SUN'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];

		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 10);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '',
			day: '',
		});
	});

	it('Pickup is available 24 hours a day, but closed on weekends', () => {
		const location = createTestLocation();
		location['PICKUP'].hours['MON'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['WED'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['THU'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];
		location['PICKUP'].hours['FRI'] = [
			{
				'open': '00:00:00',
				'close': '24:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '12:00 AM'
			}
		];

		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 10);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationFulfillmentOpenStatusDayAndTime(location, 'en-US', 'PICKUP');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '12:00 am',
			day: 'Saturday',
		});
	});
});

describe('Location business hours status day and time variations', () => {
	beforeEach(() => {
	// tell vitest we use mocked time
		vi.useFakeTimers();
	});

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	it('Should be currently open, open until 3pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 1:00:00 pm
		const date = new Date(2024, 0, 1, 13);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '3:00 pm',
			day: 'Monday',
		});
	});

	it('Should open later today, opens 4pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 3:30:00 pm
		const date = new Date(2024, 0, 1, 15, 30);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_LATER_TODAY,
			time: '4:00 pm',
			day: 'Monday',
		});
	});

	it('Should open another day, opens next available time Tuesday 12:00 pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 11:00:00 pm
		const date = new Date(2024, 0, 1, 23, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_ANOTHER_DAY,
			time: '12:00 pm',
			day: 'Tuesday',
		});
	});

	it('Should open later today, multiple future open intervals, should open at 12pm', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 10, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.OPENS_LATER_TODAY,
			time: '12:00 pm',
			day: 'Monday',
		});
	});

	it('Should be currently open, but open/close interval spans between days (4:00pm - 4am)', () => {
		const location = createTestLocation();
		location.square_business_hours['MON'] = [
			{
				'open': '16:00:00',
				'close': '24:00:00',
				'open_formatted': '4:00 PM',
				'close_formatted': '12:00 AM'
			},
		];
		location.square_business_hours['TUE'] = [
			{
				'open': '00:00:00',
				'close': '04:00:00',
				'open_formatted': '12:00 AM',
				'close_formatted': '4:00 AM'
			},
		];
		// Monday January 1, 2024 10:00:00 pm
		const date = new Date(2024, 0, 1, 20, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual({
			status: sdk.helpers.location.OpenStatus.CURRENTLY_OPEN,
			time: '4:00 am',
			day: 'Tuesday',
		});
	});

	it('No fulfillment hours exist on any days', () => {
		const location = createTestLocation();
		location.square_business_hours['MON'] = [];
		location.square_business_hours['TUE'] = [];
		location.square_business_hours['WED'] = [];
		location.square_business_hours['THU'] = [];
		location.square_business_hours['FRI'] = [];
		location.square_business_hours['SAT'] = [];
		location.square_business_hours['SUN'] = [];

		// Monday January 1, 2024 10:00:00 am
		const date = new Date(2024, 0, 1, 20, 0);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getLocationBusinessHoursOpenStatusDayAndTime(location, 'en-US');
		expect(result).toStrictEqual(null);
	});
});

describe('Check open intervals for today', () => {
	beforeEach(() => {
	// tell vitest we use mocked time
		vi.useFakeTimers();
	});

	afterEach(() => {
		// restoring date after each test run
		vi.useRealTimers();
	});

	it('Should get correct intervals array', () => {
		const location = createTestLocation();
		// Monday January 1, 2024 1:00:00 pm
		const date = new Date(2024, 0, 1, 13);
		vi.setSystemTime(date);

		const result = sdk.helpers.location.getOpenIntervalsForToday(
			'en-US',
			'UTC',
			location['PICKUP'].hours
		);
		expect(result).toStrictEqual(location['PICKUP'].hours['MON']);
	});
});
