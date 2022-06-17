import DateType, { parse } from '@/core/schema/custom/date.type';
import { Kind } from 'graphql';

describe('Custom/Date => GraphQL Type', () => {
	it('integrity', () => {
		expect(DateType.name).toBe('Date');
	});

	const dates = [
		{ input: '2023-06-17', valid: true },
		{ input: '2022-06-17', valid: true },
		{ input: '2021-06-17', valid: true },
		{ input: '20202-06-17', valid: false },
		{ input: '2020-13-17', valid: false },
		{ input: '0000-00-00', valid: false },
		{ input: '2020-00-00', valid: false },
		{ input: '2020-12-32', valid: false },
		{ input: '2020-063-17', valid: false },
		{ input: '2020-06-173', valid: false },
		{ input: '202-06-17', valid: false },
		{ input: '2020-0-17', valid: false },
		{ input: '2020-06-1', valid: false },
		{ input: 'invalid', valid: false },
		{ input: 'q-01-17', valid: false },
		{ input: 'q-01-q', valid: false },
	];

	it.each(dates)(
		'date $input validation should be $valid',
		({ input, valid }) => {
			if (valid) {
				expect(parse(input)).toBe(input);
				expect(DateType.serialize(input)).toBe(input);
				expect(DateType.parseValue(input)).toBe(input);
				expect(
					DateType.parseLiteral({
						value: input,
						kind: Kind.VARIABLE,
						name: {
							kind: Kind.NAME,
							value: 'Date',
						},
					})
				).toBe(input);
				return;
			}

			expect(() => parse(input)).toThrow(Error);
			expect(() => DateType.serialize(input)).toThrow(Error);
			expect(() => DateType.parseValue(input)).toThrow(Error);
			expect(() =>
				DateType.parseLiteral({
					value: input,
					kind: Kind.VARIABLE,
					name: {
						kind: Kind.NAME,
						value: 'Date',
					},
				})
			).toThrow(Error);
		}
	);
});
