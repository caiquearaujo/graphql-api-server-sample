import MoviesRepo from '@/core/repo/movies.repo';
import { GraphQLID, GraphQLList, GraphQLNonNull } from 'graphql';
import { MovieType } from './movie.types';

const MovieQueries = {
	getAllMovies: {
		type: new GraphQLList(new GraphQLNonNull(MovieType)),
		resolve: (_source: any, args: any) => {
			return MoviesRepo.getAll();
		},
	},
	getMovie: {
		type: MovieType,
		args: {
			id: {
				type: new GraphQLNonNull(GraphQLID),
			},
		},
		resolve: (_source: any, { id }: any) => {
			return MoviesRepo.getById(id);
		},
	},
};

export default MovieQueries;
