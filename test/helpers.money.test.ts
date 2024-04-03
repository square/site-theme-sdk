import { describe, expect, it } from 'vitest';
import { getTestSquareOnlineWebSDK } from './helpers';

const sdk = getTestSquareOnlineWebSDK();

describe('convertFloatToSubunits', () => {
	it('should properly convert', () => {
		const currencyList = [
			{
				currency: 'CAD',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'AUD',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'JPY',
				float: 15,
				subunits: 15
			},
			{
				currency: 'GBP',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'EUR',
				float: 15.0,
				subunits: 1500
			},
			// Not supported by Square, but additional tests
			{
				currency: 'IDR',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'BHD',
				float: 15,
				subunits: 15000
			}
		];

		currencyList.forEach(({ currency, float, subunits }) => {
			expect(sdk.helpers.money.convertFloatToSubunits(float, currency)).toBe(subunits);
		});
	});
});
describe('convertSubunitsToFloat', () => {
	it('should properly convert', () => {
		const currencyList = [
			{
				currency: 'CAD',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'AUD',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'JPY',
				float: 15,
				subunits: 15
			},
			{
				currency: 'GBP',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'EUR',
				float: 15.0,
				subunits: 1500
			},
			// Not supported by Square, but additional tests
			{
				currency: 'IDR',
				float: 15.0,
				subunits: 1500
			},
			{
				currency: 'BHD',
				float: 15,
				subunits: 15000
			}
		];

		currencyList.forEach(({ currency, float, subunits }) => {
			expect(sdk.helpers.money.convertSubunitsToFloat(subunits, currency)).toBe(float);
		});
	});
});