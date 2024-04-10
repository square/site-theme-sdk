/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
	ItemResourceInput,
	ResourcesRequest
} from '../src/types/api/resources';
import { getTestSiteThemeSDK } from './helpers';
import type LooseObject from '../src/types/looseobject';

const STATUS_TEXT = 'status';
const CSRF_TOKEN = 'token';
const CART_TOKEN = 'cart';
const CURRENT_URL = 'currentUrl';
const RESOURCES_API_URL = '/s/api/v1/resources';

const okResourcesResponse = {
	data: {},
	errors: []
};
const okFetchResponse = createFetchResponse(okResourcesResponse, true, 200);

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

function createHeadersAndMethodForRequest(method: string = 'POST'): LooseObject {
	return {
		headers: {
			'Accept': 'application/json',
			'content-type' : 'application/json; charset=UTF-8',
			'X-CSRF-TOKEN': CSRF_TOKEN
		},
		method: method,
	};
}

function createItemResourcesRequest(
	{ itemId }: { itemId: string }
): ResourcesRequest {
	const itemInput: ItemResourceInput = {
		type: 'item',
		filters: {
			id: itemId,
			square_online_id: true
		}
	};

	const request: ResourcesRequest = {
		'item': itemInput
	};

	return request;
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

describe('Resources request', () => {
	it('should make valid fetch', async () => {
		const request: ResourcesRequest = createItemResourcesRequest({ itemId: '1' });
		const result = await sdk.resources.getResources(request);

		expect(fetch).toHaveBeenCalledWith(
			`${RESOURCES_API_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify({ input: request })
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okResourcesResponse);
	});
});
