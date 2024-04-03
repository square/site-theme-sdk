/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
	AutocompletePlacesRequest,
	AutocompletePlaceTypeEnum,
	GetPlaceRequest
} from '../src/types/api/places';
import { getTestSquareOnlineWebSDK } from './helpers';
import type LooseObject from '../src/types/looseobject';

const STATUS_TEXT = 'status';
const CSRF_TOKEN = 'token';
const CART_TOKEN = 'cart';
const CURRENT_URL = 'currentUrl';
const PLACES_AUTOCOMPLETE_URL = '/app/store/api/v28/pub/users/1/sites/1/places?types=geocode&input=32 Reservoir';
const PLACES_AUTOCOMPLETE_ADDRESS_URL = '/app/store/api/v28/pub/users/1/sites/1/places?types=address&input=32 Reservoir';
const PLACES_LOOKUP_URL = '/app/store/api/v28/pub/users/1/sites/1/places/G:ChIJd0vnT0vCwokRNB851YLnt4s';

const okPlacesResponse = {
	data: {}
};
const okFetchResponse = createFetchResponse(okPlacesResponse, true, 200);

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

function createAutocompleteRequest(
	{ address, types }: { address: string; types?: AutocompletePlaceTypeEnum }
): AutocompletePlacesRequest {
	const request: AutocompletePlacesRequest = {
		'address': address,
		'types': types,
	};
	return request;
}

function createLookupRequest(
	{ placeId }: { placeId: string }
): GetPlaceRequest {
	const request: GetPlaceRequest = {
		'placeId': placeId,
	};
	return request;
}

const mockWindowHrefSet = vi.fn();

const sdk = getTestSquareOnlineWebSDK();

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

describe('Places request', () => {
	it('should make valid autocomplete', async () => {
		const request: AutocompletePlacesRequest = createAutocompleteRequest({ address: '32 Reservoir' });
		const result = await sdk.places.autocompletePlaces(request);

		expect(fetch).toHaveBeenCalledWith(
			`${PLACES_AUTOCOMPLETE_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okPlacesResponse);
	});

	it('should make valid autocomplete with types specified', async () => {
		const request: AutocompletePlacesRequest = createAutocompleteRequest({ address: '32 Reservoir', types: 'address' });
		const result = await sdk.places.autocompletePlaces(request);

		expect(fetch).toHaveBeenCalledWith(
			`${PLACES_AUTOCOMPLETE_ADDRESS_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okPlacesResponse);
	});

	it('should make valid autocomplete with cdnDomain', async () => {
		const cdnDomain = 'cdn3.editmysite.com';
		const sdk =  getTestSquareOnlineWebSDK({
			cdnDomain
		});
		const request: AutocompletePlacesRequest = createAutocompleteRequest({ address: '32 Reservoir' });
		const result = await sdk.places.autocompletePlaces(request);

		expect(fetch).toHaveBeenCalledWith(
			`${PLACES_AUTOCOMPLETE_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okPlacesResponse);
	});

	it('should make valid place lookup', async () => {
		const request: GetPlaceRequest = createLookupRequest({ placeId: 'G:ChIJd0vnT0vCwokRNB851YLnt4s' });
		const result = await sdk.places.getPlace(request);

		expect(fetch).toHaveBeenCalledWith(
			`${PLACES_LOOKUP_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okPlacesResponse);
	});

	it('should make valid place lookup with cdnDomain', async () => {
		const cdnDomain = 'cdn3.editmysite.com';
		const sdk =  getTestSquareOnlineWebSDK({
			cdnDomain
		});
		const request: GetPlaceRequest = createLookupRequest({ placeId: 'G:ChIJd0vnT0vCwokRNB851YLnt4s' });
		const result = await sdk.places.getPlace(request);

		expect(fetch).toHaveBeenCalledWith(
			`${PLACES_LOOKUP_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest()
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okPlacesResponse);
	});

	it('should return empty object on empty array', async () => {
		const getPlaceResponse = {
			data: []
		};
		const fetchResponse = createFetchResponse(getPlaceResponse, true, 200);
		vi.mocked(fetch).mockResolvedValue(fetchResponse);

		const request: GetPlaceRequest = createLookupRequest({ placeId: 'G:ChIJd0vnT0vCwokRNB851YLnt4s' });
		const result = await sdk.places.getPlace(request);

		expect(result.data).toStrictEqual({});
	});
});
