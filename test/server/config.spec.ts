import * as config from '@/server/config';

describe('Configuration', () => {
	it('configurations loaded', () => {
		expect(config.NODE_ENV).toBe('test');
		expect(typeof config.NAME).toBe('string');
		expect(typeof config.VERSION).toBe('string');
		expect(typeof config.PORT).toBe('string');
	});
});
