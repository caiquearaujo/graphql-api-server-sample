import request from 'supertest';
import { ApiHelper } from '@test/utils';

// @ts-ignore
const server: ApiHelper = global.api;
let requestMock: request.SuperTest<request.Test>;

beforeAll(async () => {
	await server.bootstrap();
	requestMock = server.get();
});

describe('GraphQL types integrity', () => {
	it('Query types', async () => {
		const { body } = await requestMock.post('/graphql').send({
			query: `
				{
					__type(name: "Query") {
						fields {
							name
						}
					}
				}`,
		});

		expect(body.data.__type.fields.length).toBe(2);
		expect(body.data.__type.fields).toStrictEqual([
			{
				name: 'getAllMovies',
			},
			{
				name: 'getMovie',
			},
		]);
	});

	it('Movie types', async () => {
		const { body } = await requestMock.post('/graphql').send({
			query: `
				{
					__type(name: "Movie") {
						fields {
							name
						}
					}
				}`,
		});

		expect(body.data.__type.fields.length).toBe(15);
		expect(body.data.__type.fields).toStrictEqual([
			{
				name: 'vote_count',
			},
			{
				name: 'id',
			},
			{
				name: 'video',
			},
			{
				name: 'vote_average',
			},
			{
				name: 'title',
			},
			{
				name: 'popularity',
			},
			{
				name: 'poster_path',
			},
			{
				name: 'original_language',
			},
			{
				name: 'original_title',
			},
			{
				name: 'genre_ids',
			},
			{
				name: 'backdrop_path',
			},
			{
				name: 'adult',
			},
			{
				name: 'overview',
			},
			{
				name: 'release_date',
			},
			{
				name: 'most_popular',
			},
		]);
	});
});
