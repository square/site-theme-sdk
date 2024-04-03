/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import { getTestSiteThemeSDK } from './helpers';
import SiteThemeSDK from '../src';
import type LooseObject from '../src/types/looseobject';

const STATUS_TEXT = 'status';
const CSRF_TOKEN = 'token';
const CART_TOKEN = 'cart';
const CURRENT_URL = 'currentUrl';
const GET_ORDER_URL = '/app/cms/api/v1/sites/fakecmssiteid/order-again/fakejwt?location=fakelocation&fulfillments[]=shipping';

const okOrderResponse = {
	data: {}
};
const okFetchResponse = createFetchResponse(okOrderResponse, true, 200);

function createFetchResponse(data: LooseObject, ok: boolean, status: number, redirectUrl = ''): Response {
	return {
		ok,
		headers: {
			append: vi.fn(),
			delete: vi.fn(),
			get: vi.fn(),
			has: vi.fn(),
			set: vi.fn(),
			forEach: vi.fn()
		},
		redirected: !!redirectUrl,
		status: status,
		statusText: STATUS_TEXT,
		type: 'default',
		url: redirectUrl,
		clone: vi.fn(),
		body: null,
		bodyUsed: false,
		arrayBuffer: vi.fn(),
		blob: vi.fn(),
		formData: vi.fn(),
		text: vi.fn(),
		json: () => new Promise((resolve) => resolve(data)) 
	};
}

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

const sdk = getTestSiteThemeSDK();

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

describe('Order request', () => {
	it('should make valid coordinates lookup', async () => {
		const result = await sdk.orders.getOrder({
			jwtToken: 'fakejwt',
			locationId: 'fakelocation',
			fulfillments: ['shipping']
		});

		expect(fetch).toHaveBeenCalledWith(
			`${GET_ORDER_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okOrderResponse);
	});

	it('should fail on missing jwt token', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await expect(sdk.orders.getOrder({
			locationId: 'fakelocation',
			fulfillments: ['shipping']
		})).rejects.toThrow(new Error('missing jwtToken'));
	});

	it('should fail on missing location id', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await expect(sdk.orders.getOrder({
			jwtToken: 'fakejwt',
			fulfillments: ['shipping']
		})).rejects.toThrow(new Error('missing locationId'));
	});

	it('should fail on missing fulfillments', async () => {
		// eslint-disable-next-line @typescript-eslint/ban-ts-comment
		// @ts-ignore
		await expect(sdk.orders.getOrder({
			jwtToken: 'fakejwt',
			locationId: 'fakelocation'
		})).rejects.toThrow(new Error('missing fulfillments'));
	});

	it('should fail on invalid fulfillment entry', async () => {
		await expect(sdk.orders.getOrder({
			jwtToken: 'fakejwt',
			locationId: 'fakelocation',
			fulfillments: ['foo']
		})).rejects.toThrow(new Error('invalid value in fulfillments array: foo'));
	});

	it('should fail on invalid fulfillment format', async () => {
		await expect(sdk.orders.getOrder({
			jwtToken: 'fakejwt',
			locationId: 'fakelocation',
			// eslint-disable-next-line @typescript-eslint/ban-ts-comment
			// @ts-ignore
			fulfillments: 'shipping'
		})).rejects.toThrow(new Error('fulfillments must be an array'));
	});

	it('should fail on missing cms site id', async () => {
		const bootstrap = {
			userId: 1,
			siteId: '1',
			cdnDomain: 'testcdn.editmysite.com',
			merchantId: 'merchant-id-123'
		};
		const brokenSdk = new SiteThemeSDK(bootstrap);

		await expect(brokenSdk.orders.getOrder({
			jwtToken: 'fakejwt',
			locationId: 'fakelocation',
			fulfillments: ['shipping']
		})).rejects.toThrow(new Error('missing cmsSiteId'));
	});
});
