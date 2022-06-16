import MoviesRepo from '@/core/repo/movies.repo';
import movies from '@/data/movies';

describe('Movies => Repo', () => {
	it('getAll => Array of movies', async () => {
		const res = await MoviesRepo.getAll();

		expect(res.length).not.toBe(0);

		expect(typeof res[0].id).toBe('number');
		expect(typeof res[0].title).toBe('string');
	});

	it('getById => Movie found', async () => {
		const movie = movies[Math.floor(movies.length / 2)];
		const res = await MoviesRepo.getById(movie.id);

		expect(typeof res).toBe('object');
		expect(res).toStrictEqual(movie);
	});

	it('getById => Movie not found', async () => {
		const res = await MoviesRepo.getById(-1);

		expect(res).toBeUndefined();
	});
});
