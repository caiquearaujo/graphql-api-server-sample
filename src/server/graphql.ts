import { ApolloServer } from 'apollo-server-express';
import { GraphQLError } from 'graphql';

import depthLimit from 'graphql-depth-limit';
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';

import schema from '@/core/schema';
import { NODE_ENV } from './config';

const complexity = queryComplexity({
	maximumComplexity: 1000,
	variables: {},
	createError: (max: number, actual: number) =>
		new GraphQLError(
			`Query is too complex: ${actual}. Maximum allowed complexity: ${max}`
		),
	estimators: [
		simpleEstimator({
			defaultComplexity: 1,
		}),
	],
});

const server = new ApolloServer({
	schema,
	introspection: NODE_ENV !== 'production',
	validationRules: [depthLimit(7), complexity],
	formatError: (err): Error => {
		if (err.message.startsWith('Database Error: ')) {
			return new Error('Internal server error');
		}

		return err;
	},
});

export default server;
