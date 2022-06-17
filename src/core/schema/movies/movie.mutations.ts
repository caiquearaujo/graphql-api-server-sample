import MoviesRepo from '@/core/repo/movies.repo';
import { GraphQLList, GraphQLNonNull } from 'graphql';
import { CreateMovieInputType } from './movie.inputs';
import { CreateMoviesType, CreateMovieType } from './movie.types';

const MovieMutations = {
	createMovie: {
		type: CreateMovieType,
		args: {
			input: {
				type: new GraphQLNonNull(CreateMovieInputType),
			},
		},
		resolve: async (_source: any, { input }: any) => {
			return {
				movie: await MoviesRepo.create(input),
			};
		},
	},
	createMovies: {
		type: CreateMoviesType,
		args: {
			input: {
				type: new GraphQLNonNull(
					new GraphQLList(new GraphQLNonNull(CreateMovieInputType))
				),
			},
		},
		resolve: async (_source: any, { input }: any) => {
			return {
				movies: await MoviesRepo.createMany(input),
			};
		},
	},
};

export default MovieMutations;
