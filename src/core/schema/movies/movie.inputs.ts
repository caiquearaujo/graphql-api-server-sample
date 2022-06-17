import {
	GraphQLBoolean,
	GraphQLFloat,
	GraphQLInputObjectType,
	GraphQLInt,
	GraphQLList,
	GraphQLNonNull,
	GraphQLString,
} from 'graphql';
import DateType from '../custom/date.type';

const CreateMovieInputType = new GraphQLInputObjectType({
	name: 'CreateMovieInput',
	description: 'Input payload for creating movie',
	fields: () => ({
		vote_count: { type: GraphQLInt },
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
		release_date: { type: new GraphQLNonNull(DateType) },
		most_popular: { type: GraphQLBoolean },
	}),
});

export { CreateMovieInputType };
