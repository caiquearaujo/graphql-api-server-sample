import request from 'supertest';
import { ApiHelper } from '@test/utils';
import movies from '@/data/movies';

// @ts-ignore
const server: ApiHelper = global.api;
let requestMock: request.SuperTest<request.Test>;

beforeAll(async () => {
	await server.bootstrap();
	requestMock = server.get();
});

describe('GraphQL queries', () => {
	it('Query getAllMovies', async () => {
		const { body } = await requestMock.post('/graphql').send({
			query: `
				{
					getAllMovies {
						id
						title
					}
				}`,
		});

		expect(body.data).toHaveProperty('getAllMovies');
		expect(body.data.getAllMovies.length).toBe(movies.length);

		body.data.getAllMovies.forEach(
			(m: Record<string, string>, i: number) => {
				expect(m.id).toBe(movies[i].id.toString());
				expect(m.title).toBe(movies[i].title);
			}
		);
	});

	it('Query getMovie found', async () => {
		const movie = movies[Math.floor(movies.length / 2)];

		const { body } = await requestMock.post('/graphql').send({
			query: `
				{
					getMovie(id: ${movie.id}) {
						vote_count
						id
						video
						vote_average
						title
						popularity
						poster_path
						original_language
						original_title
						genre_ids
						backdrop_path
						adult
						overview
						release_date
					}
				}`,
		});

		expect(body.data).toHaveProperty('getMovie');
		expect(body.data.getMovie).toStrictEqual({
			...movie,
			id: movie.id.toString(),
		});
	});

	it('Query getMovie not found', async () => {
		const { body } = await requestMock.post('/graphql').send({
			query: `
				{
					getMovie(id: -1) {
						vote_count
						id
						video
						vote_average
						title
						popularity
						poster_path
						original_language
						original_title
						genre_ids
						backdrop_path
						adult
						overview
						release_date
						most_popular
					}
				}`,
		});

		expect(body.data).toHaveProperty('getMovie');
		expect(body.data.getMovie).toBeNull();
	});
});
