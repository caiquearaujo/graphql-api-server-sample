import movies from '@/data/movies';
import { TMovie, TMovies } from '@/types';

export default class MoviesRepo {
	static getAll(): Promise<TMovies> {
		return new Promise(res => {
			setTimeout(() => {
				res(movies);
			}, 500);
		});
	}

	static getById(id: number): Promise<TMovie | undefined> {
		return new Promise(res => {
			setTimeout(() => {
				res(movies.find(m => m.id === id));
			}, 500);
		});
	}
}
