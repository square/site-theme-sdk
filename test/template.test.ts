/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it, vi, beforeEach } from 'vitest';
import {
	TemplateRequest,
	TemplateError
} from '../src/types/api/template';
import { getTestSquareOnlineWebSDK } from './helpers';
import type LooseObject from '../src/types/looseobject';

const STATUS_TEXT = 'status';
const CSRF_TOKEN = 'token';
const CURRENT_URL = 'currentUrl';
const TEMPLATE_API_URL = '/s/api/v1/template';

const okTemplateResponse: string = '<html><body>Random template content</body></html>';
const okFetchResponse = createFetchResponse(okTemplateResponse, true, 200);

const errorTemplateResponse: string =
    '<html><head><title>500 - Error</title></head><body>500</body></html>';
const errorFetchResponse = createFetchResponse(errorTemplateResponse, false, 500);

function createFetchResponse(data: string, ok: boolean, status: number, redirectUrl = ''): Response {
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
		text: () => new Promise((resolve) => resolve(data)) ,
		json: vi.fn()
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

function createTemplateRequest(
	{ template, props }: { template: string; props: object }
): TemplateRequest {
	const request: TemplateRequest = {
		'template': template,
		'props': props
	};

	return request;
}

const mockWindowHrefSet = vi.fn();

const sdk =  getTestSquareOnlineWebSDK();

beforeEach(() => {
	const documentMock = {
		querySelector: () => {
			return {
				content: CSRF_TOKEN,
			};
		},
		cookie: 'test_cookie=test;'
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
});

describe('Template request', () => {
	it('should make valid fetch', async () => {
		vi.mocked(fetch).mockResolvedValue(okFetchResponse);

		const request: TemplateRequest = createTemplateRequest({template: 'templates/pages/whatever', props: {}});
		const result = await sdk.template.getTemplate(request);

		expect(fetch).toHaveBeenCalledWith(
			`${TEMPLATE_API_URL}`,
			expect.objectContaining({
				...createHeadersAndMethodForRequest(),
				body: JSON.stringify(request)
			})
		);

		expect(fetch).toHaveBeenCalledOnce();

		expect(result).toStrictEqual(okTemplateResponse);
	});

	it('should throw error on invalid fetch', async () => {
		vi.mocked(fetch).mockResolvedValue(errorFetchResponse);

		const request: TemplateRequest = createTemplateRequest({template: 'templates/pages/whatever', props: {}});

		try {
			await sdk.template.getTemplate(request);
		} catch (e) {
			const templateError = (e as TemplateError);
			expect(templateError.message).toStrictEqual('Unable to render template');
			expect(templateError.template).toStrictEqual(errorTemplateResponse);
		}
	});
});
