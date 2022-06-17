import request from 'supertest';
import { ApiHelper } from '@test/utils';

// @ts-ignore
const server: ApiHelper = global.api;
let requestMock: request.SuperTest<request.Test>;

beforeAll(async () => {
	await server.bootstrap();
	requestMock = server.get();
});

describe('Common => Router', () => {
	it('GET /status => Sucess', async () => {
		const res = await requestMock.get('/status');

		expect(typeof res.body).toBe('object');
		expect(typeof res.body.running).toBeTruthy();
	});
});
