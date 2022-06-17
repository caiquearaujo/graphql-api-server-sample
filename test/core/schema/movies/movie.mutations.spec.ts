import { CreateMovieInputType } from '@/core/schema/movies/movie.inputs';
import MovieMutations from '@/core/schema/movies/movie.mutations';
import {
	CreateMoviesType,
	CreateMovieType,
} from '@/core/schema/movies/movie.types';
import movies from '@/data/movies';
import { GraphQLList, GraphQLNonNull } from 'graphql';

describe('Movies => GraphQL Type', () => {
	it('mutation integrity', () => {
		expect(MovieMutations).toHaveProperty('createMovie');
		expect(MovieMutations).toHaveProperty('createMovies');

		expect(MovieMutations.createMovie).toHaveProperty('type');
		expect(MovieMutations.createMovie).toHaveProperty('args');
		expect(MovieMutations.createMovie).toHaveProperty('resolve');

		expect(MovieMutations.createMovie.type).toMatchObject(
			CreateMovieType
		);
		expect(MovieMutations.createMovie.args).toStrictEqual({
			input: {
				type: new GraphQLNonNull(CreateMovieInputType),
			},
		});
		expect(typeof MovieMutations.createMovie.resolve).toBe('function');

		expect(MovieMutations.createMovies).toHaveProperty('type');
		expect(MovieMutations.createMovies).toHaveProperty('args');
		expect(MovieMutations.createMovies).toHaveProperty('resolve');

		expect(MovieMutations.createMovies.type).toMatchObject(
			CreateMoviesType
		);
		expect(MovieMutations.createMovies.args).toStrictEqual({
			input: {
				type: new GraphQLNonNull(
					new GraphQLList(new GraphQLNonNull(CreateMovieInputType))
				),
			},
		});
		expect(typeof MovieMutations.createMovies.resolve).toBe('function');
	});

	it('mutation createMovie', async () => {
		const input = {
			vote_count: 2762,
			vote_average: 7.5,
			title: 'Jaws',
			popularity: 16.273358,
			poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
			original_language: 'en',
			original_title: 'Jaws',
			genre_ids: [27, 53, 12],
			backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
			overview:
				'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
			release_date: '1975-06-18',
		};

		const len = movies.length;
		const { movie } = await MovieMutations.createMovie.resolve(
			{},
			{ input }
		);

		expect(movies.length).not.toBe(len);
		expect(movies.length).toBe(len + 1);

		expect(typeof movie).toBe('object');
		expect(movie).toHaveProperty('id');
		expect(typeof movie.id).toBe('string');
		expect(movie).toStrictEqual({
			vote_count: 2762,
			id: movie.id,
			vote_average: 7.5,
			title: 'Jaws',
			popularity: 16.273358,
			poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
			original_language: 'en',
			original_title: 'Jaws',
			genre_ids: [27, 53, 12],
			backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
			overview:
				'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
			release_date: '1975-06-18',
			most_popular: false,
			video: false,
			adult: false,
		});
	});

	it('mutation createMovies', async () => {
		const input = [
			{
				vote_count: 2762,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
			},
			{
				vote_count: 2762,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
			},
		];

		const len = movies.length;
		const { movies: _movies } = await MovieMutations.createMovies.resolve(
			{},
			{ input }
		);

		expect(movies.length).not.toBe(len);
		expect(movies.length).toBe(len + 2);

		expect(typeof _movies).toBe('object');

		_movies.forEach(r => {
			expect(r).toHaveProperty('id');
			expect(typeof r.id).toBe('string');
			expect(r).toStrictEqual({
				vote_count: 2762,
				id: r.id,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
				most_popular: false,
				video: false,
				adult: false,
			});
		});
	});
});
