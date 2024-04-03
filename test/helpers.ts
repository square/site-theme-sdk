import {vi} from 'vitest';
import SquareOnlineWebSDK from '../src';
import type LooseObject from '../src/types/looseobject';

export function getTestSquareOnlineWebSDK(overrides: object = {}): SquareOnlineWebSDK {
	const defaults = {
		userId: 1,
		siteId: '1',
		cmsSiteId: 'fakecmssiteid',
		cdnDomain: 'testcdn.editmysite.com',
		merchantId: 'merchant-id-123'
	};
	return new SquareOnlineWebSDK({...defaults, ...overrides});
}
export const STATUS_TEXT = 'status';
export function createFetchResponse(data: LooseObject|null, ok: boolean, status: number, redirectUrl = ''): Response {
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
		json: () => data !== null ?
			Promise.resolve(data) :
			Promise.reject(new SyntaxError('Unexpected end of JSON input'))
	};
}
