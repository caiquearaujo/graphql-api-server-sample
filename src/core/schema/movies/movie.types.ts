import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLID,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLObjectType,
	GraphQLString,
} from 'graphql';

const CreateMovieType = new GraphQLObjectType({
	name: 'CreateMovie',
	description: 'Create movie type definition',
	fields: () => ({
		movie: {
			type: new GraphQLNonNull(MovieType),
		},
	}),
});

const CreateMoviesType = new GraphQLObjectType({
	name: 'CreateMovies',
	description: 'Create movie type definition',
	fields: () => ({
		movie: {
			type: new GraphQLNonNull(
				new GraphQLList(new GraphQLNonNull(MovieType))
			),
		},
	}),
});

const MovieType = new GraphQLObjectType({
	name: 'Movie',
	description: 'Movie type definition',
	fields: () => ({
		vote_count: { type: GraphQLInt },
		id: { type: new GraphQLNonNull(GraphQLID) },
		video: { type: GraphQLBoolean },
		vote_average: { type: GraphQLFloat },
		title: { type: new GraphQLNonNull(GraphQLString) },
		popularity: { type: GraphQLFloat },
		poster_path: { type: GraphQLString },
		original_language: { type: new GraphQLNonNull(GraphQLString) },
		original_title: { type: new GraphQLNonNull(GraphQLString) },
		genre_ids: { type: new GraphQLList(GraphQLInt) },
		backdrop_path: { type: GraphQLString },
		adult: { type: GraphQLBoolean },
		overview: { type: new GraphQLNonNull(GraphQLString) },
		release_date: { type: new GraphQLNonNull(GraphQLString) },
		most_popular: { type: GraphQLBoolean },
	}),
});

export { CreateMovieType, CreateMoviesType, MovieType };
