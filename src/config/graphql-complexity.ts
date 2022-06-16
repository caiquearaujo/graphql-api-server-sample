import { GraphQLError } from 'graphql';
import queryComplexity, { simpleEstimator } from 'graphql-query-complexity';

export default queryComplexity({
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
