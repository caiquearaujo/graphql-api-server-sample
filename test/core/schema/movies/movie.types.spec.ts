import DateType from '@/core/schema/custom/date.type';
import {
	CreateMoviesType,
	CreateMovieType,
	MovieType,
} from '@/core/schema/movies/movie.types';

import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from 'graphql';

describe('Movies => GraphQL Type', () => {
	it('fields integrity', () => {
		expect(MovieType.name).toBe('Movie');

		const fields = MovieType.getFields();

		expect(fields).toHaveProperty('vote_count');
		expect(fields.vote_count.type).toMatchObject(GraphQLInt);

		expect(fields).toHaveProperty('id');
		expect(fields.id.type).toMatchObject(new GraphQLNonNull(GraphQLID));

		expect(fields).toHaveProperty('video');
		expect(fields.video.type).toMatchObject(GraphQLBoolean);

		expect(fields).toHaveProperty('vote_average');
		expect(fields.vote_average.type).toMatchObject(GraphQLFloat);

		expect(fields).toHaveProperty('title');
		expect(fields.title.type).toMatchObject(
			new GraphQLNonNull(GraphQLString)
		);

		expect(fields).toHaveProperty('popularity');
		expect(fields.popularity.type).toMatchObject(GraphQLFloat);

		expect(fields).toHaveProperty('poster_path');
		expect(fields.poster_path.type).toMatchObject(GraphQLString);

		expect(fields).toHaveProperty('original_language');
		expect(fields.original_language.type).toMatchObject(
			new GraphQLNonNull(GraphQLString)
		);

		expect(fields).toHaveProperty('original_title');
		expect(fields.original_title.type).toMatchObject(
			new GraphQLNonNull(GraphQLString)
		);

		expect(fields).toHaveProperty('genre_ids');
		expect(fields.genre_ids.type).toMatchObject(
			new GraphQLList(GraphQLInt)
		);

		expect(fields).toHaveProperty('backdrop_path');
		expect(fields.backdrop_path.type).toMatchObject(GraphQLString);

		expect(fields).toHaveProperty('adult');
		expect(fields.adult.type).toMatchObject(GraphQLBoolean);

		expect(fields).toHaveProperty('overview');
		expect(fields.overview.type).toMatchObject(
			new GraphQLNonNull(GraphQLString)
		);

		expect(fields).toHaveProperty('release_date');
		expect(fields.release_date.type).toMatchObject(
			new GraphQLNonNull(DateType)
		);

		expect(fields).toHaveProperty('most_popular');
		expect(fields.most_popular.type).toMatchObject(GraphQLBoolean);
	});
});

describe('Create Movies => Graphql Type', () => {
	it('create movie type - fields integrity', () => {
		expect(CreateMovieType.name).toBe('CreateMovie');

		const fields = CreateMovieType.getFields();

		expect(fields).toHaveProperty('movie');
		expect(fields.movie.type).toMatchObject(
			new GraphQLNonNull(MovieType)
		);
	});

	it('create movies type - fields integrity', () => {
		expect(CreateMoviesType.name).toBe('CreateMovies');

		const fields = CreateMoviesType.getFields();

		expect(fields).toHaveProperty('movies');
		expect(fields.movies.type).toMatchObject(
			new GraphQLNonNull(new GraphQLList(new GraphQLNonNull(MovieType)))
		);
	});
});
