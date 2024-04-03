/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { describe, expect, it } from 'vitest';
import { getTestSquareOnlineWebSDK } from './helpers';

describe('init error states', () => {
	it('should fail on missing user id', () => {
		expect(() => {
			getTestSquareOnlineWebSDK({
				userId: 0,
			});
		}).toThrow(new Error('missing user id'));
	});

	it('should fail on missing site id', () => {
		expect(() => {
			getTestSquareOnlineWebSDK({
				siteId: '',
			});
		}).toThrow(new Error('missing site id'));
	});

	it('should fail on invalid user id', () => {
		expect(() => {
			getTestSquareOnlineWebSDK({
				userId: 2.23423,
			});
		}).toThrow(new Error('invalid user id'));
	});

	it('should fail on invalid site id', () => {
		expect(() => {
			getTestSquareOnlineWebSDK({
				siteId: 'asdasf',
			});
		}).toThrow(new Error('invalid site id'));
	});

	it('should fail on missing square merchant id', () => {
		expect(() => {
			getTestSquareOnlineWebSDK({
				merchantId: ''
			});
		}).toThrow(new Error('missing merchant id'));
	});
});
