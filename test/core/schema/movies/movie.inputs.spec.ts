import DateType from '@/core/schema/custom/date.type';
import { CreateMovieInputType } from '@/core/schema/movies/movie.inputs';
import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from 'graphql';

describe('Movies => GraphQL Input', () => {
	it('fields integrity', () => {
		expect(CreateMovieInputType.name).toBe('CreateMovieInput');

		const fields = CreateMovieInputType.getFields();

		expect(fields).not.toHaveProperty('id');

		expect(fields).toHaveProperty('vote_count');
		expect(fields.vote_count.type).toMatchObject(GraphQLInt);

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
