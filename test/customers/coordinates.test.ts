/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { createFetchResponse, getTestSiteThemeSDK } from '../helpers';
import type LooseObject from '../../src/types/looseobject';

const CSRF_TOKEN = 'token';
const CART_TOKEN = 'cart';
const CURRENT_URL = 'currentUrl';
const GET_COORDINATES_URL = '/app/website/cms/api/v1/users/1/customers/coordinates';

const okCoordinatesResponse = {
	data: {}
};
const okFetchResponse = createFetchResponse(okCoordinatesResponse, true, 200);

function createHeadersAndMethodForRequest(method: string = 'GET'): LooseObject {
	return {
		headers: {
			'Accept': 'application/json',
			'content-type' : 'application/json; charset=UTF-8',
			'X-CSRF-TOKEN': CSRF_TOKEN
		},
		method: method,
	};
}

const mockWindowHrefSet = vi.fn();

const sdk =  getTestSiteThemeSDK();

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

describe('Customers Coordinates request', () => {
	it('should make valid coordinates lookup', async () => {
		const result = await sdk.customers.getCoordinates();

		expect(fetch).toHaveBeenCalledWith(
			`${GET_COORDINATES_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okCoordinatesResponse);
	});

	it('should make valid coordinates lookup with cdnDomain', async () => {
		const cdnDomain = 'cdn3.editmysite.com';
		const sdk =  getTestSiteThemeSDK({
			cdnDomain
		});
		const result = await sdk.customers.getCoordinates();

		expect(fetch).toHaveBeenCalledWith(
			`${GET_COORDINATES_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okCoordinatesResponse);
	});

	it('should return empty object on empty array', async () => {
		const getCoordinatesResponse: never[] | LooseObject = [];
		const fetchResponse = createFetchResponse(getCoordinatesResponse, true, 200);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const result = await sdk.customers.getCoordinates();

		expect(result).toStrictEqual({});
	});
});
