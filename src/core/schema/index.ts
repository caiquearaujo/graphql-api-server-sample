import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import MovieMutations from './movies/movie.mutations';
import MovieQueries from './movies/movie.queries';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			...MovieQueries,
		}),
	}),
	mutation: new GraphQLObjectType({
		name: 'Mutation',
		fields: () => ({
			...MovieMutations,
		}),
	}),
});

export default schema;
