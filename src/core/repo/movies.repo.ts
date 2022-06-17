import movies from '@/data/movies';
import { TMovie, TMovies } from '@/types';
import { v4 as uuidv4 } from 'uuid';

export default class MoviesRepo {
	static getAll(): Promise<TMovies> {
		return new Promise(res => {
			setTimeout(() => {
				res(movies);
			}, 500);
		});
	}

	static getById(id: string): Promise<TMovie | undefined> {
		return new Promise(res => {
			setTimeout(() => {
				res(movies.find(m => m.id === id));
			}, 500);
		});
	}

	static create(input: Partial<Omit<TMovie, 'id'>>): Promise<TMovie> {
		const movie = MoviesRepo._create(input);
		movies.push(movie);

		return new Promise(res => {
			setTimeout(() => {
				res(movie);
			}, 500);
		});
	}

	static createMany(
		input: Array<Partial<Omit<TMovie, 'id'>>>
	): Promise<TMovies> {
		const added = input.map(i => {
			const movie = MoviesRepo._create(i);
			movies.push(movie);

			return movie;
		});

		return new Promise(res => {
			setTimeout(() => {
				res(added);
			}, 500);
		});
	}

	protected static _create(input: Partial<Omit<TMovie, 'id'>>): TMovie {
		const defaults: Partial<TMovie> = {
			id: uuidv4(),
			vote_count: 0,
			video: false,
			vote_average: 0,
			poster_path: null,
			popularity: 0,
			genre_ids: [],
			backdrop_path: null,
			adult: false,
			most_popular: false,
		};

		return { ...defaults, ...input } as TMovie;
	}
}
