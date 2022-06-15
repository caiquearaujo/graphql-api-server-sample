import MoviesRepo from '@/core/repo/movies.repo';
import { GraphQLInt, GraphQLList, GraphQLNonNull } from 'graphql';
import Movie from './MovieType';

const MovieQueries = {
	getAllMovies: {
		type: new GraphQLList(new GraphQLNonNull(Movie)),
		resolve: (_source: any, args: any) => {
			return MoviesRepo.getAll();
		},
	},
	getMovie: {
		type: Movie,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLInt),
			},
		},
		resolve: (_source: any, { id }: any) => {
			return MoviesRepo.getById(id);
		},
	},
};

export default MovieQueries;
