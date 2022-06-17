import MovieQueries from '@/core/schema/movies/movie.queries';
import { MovieType } from '@/core/schema/movies/movie.types';
import movies from '@/data/movies';
import { GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';

describe('Movies => GraphQL Type', () => {
	it('query integrity', () => {
		expect(MovieQueries).toHaveProperty('getAllMovies');
		expect(MovieQueries).toHaveProperty('getMovie');

		expect(MovieQueries.getAllMovies).toHaveProperty('type');
		expect(MovieQueries.getAllMovies).toHaveProperty('resolve');

		expect(MovieQueries.getAllMovies.type).toMatchObject(
			new GraphQLList(new GraphQLNonNull(MovieType))
		);
		expect(typeof MovieQueries.getAllMovies.resolve).toBe('function');

		expect(MovieQueries.getMovie).toHaveProperty('type');
		expect(MovieQueries.getMovie).toHaveProperty('args');
		expect(MovieQueries.getMovie).toHaveProperty('resolve');

		expect(MovieQueries.getMovie.type).toMatchObject(MovieType);
		expect(MovieQueries.getMovie.args).toStrictEqual({
			id: {
				type: new GraphQLNonNull(GraphQLInt),
			},
		});
		expect(typeof MovieQueries.getMovie.resolve).toBe('function');
	});

	it('query getAllMovies', async () => {
		const res = await MovieQueries.getAllMovies.resolve({}, {});
		expect(res.length).toBe(movies.length);
	});

	it('query getMovie', async () => {
		const movie = movies[Math.floor(movies.length / 2)];
		const res = await MovieQueries.getMovie.resolve({}, { id: movie.id });

		expect(typeof res).toBe('object');
		expect(res).toStrictEqual(movie);
	});

	it('query getMovie not found', async () => {
		const res = await MovieQueries.getMovie.resolve(
			{},
			{ id: 'unknown' }
		);

		expect(res).toBeUndefined();
	});
});
