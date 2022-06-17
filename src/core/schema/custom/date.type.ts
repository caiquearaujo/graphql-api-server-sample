import { GraphQLScalarType } from 'graphql';

function parse(input: string): string {
	if (
		!/^[\d]{4}-[\d]{2}-[\d]{2}$/i.test(input) ||
		isNaN(Date.parse(input))
	) {
		throw new Error('Date must be in "YYYY-MM-DD" format');
	}

	return input;
}

const DateType = new GraphQLScalarType({
	name: 'Date',
	description: 'A date string in "YYYY-MM-DD" format.',
	serialize: (v: any) => parse(v),
	parseValue: (v: any) => parse(v),
	parseLiteral: ({ value }: any) => parse(value),
});

export default DateType;
