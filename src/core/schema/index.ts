import { GraphQLObjectType, GraphQLSchema } from 'graphql';
import MovieQueries from './movies/movie.queries';

const schema = new GraphQLSchema({
	query: new GraphQLObjectType({
		name: 'Query',
		fields: () => ({
			...MovieQueries,
		}),
	}),
});

export default schema;
