import MoviesRepo from '@/core/repo/movies.repo';
import movies from '@/data/movies';

describe('Movies => Repo', () => {
	it('getAll => Array of movies', async () => {
		const res = await MoviesRepo.getAll();

		expect(res.length).toBe(movies.length);

		expect(typeof res[0].id).toBe('string');
		expect(typeof res[0].title).toBe('string');
	});

	it('getById => Movie found', async () => {
		const movie = movies[Math.floor(movies.length / 2)];
		const res = await MoviesRepo.getById(movie.id);

		expect(typeof res).toBe('object');
		expect(res).toStrictEqual(movie);
	});

	it('getById => Movie not found', async () => {
		const res = await MoviesRepo.getById('unknown');

		expect(res).toBeUndefined();
	});

	it('create => one movie', async () => {
		const input = {
			vote_count: 2762,
			vote_average: 7.5,
			title: 'Jaws',
			popularity: 16.273358,
			poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
			original_language: 'en',
			original_title: 'Jaws',
			genre_ids: [27, 53, 12],
			backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
			overview:
				'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
			release_date: '1975-06-18',
		};

		const len = movies.length;
		const res = await MoviesRepo.create(input);

		expect(movies.length).not.toBe(len);
		expect(movies.length).toBe(len + 1);

		expect(typeof res).toBe('object');
		expect(res).toHaveProperty('id');
		expect(typeof res.id).toBe('string');
		expect(res).toStrictEqual({
			vote_count: 2762,
			id: res.id,
			vote_average: 7.5,
			title: 'Jaws',
			popularity: 16.273358,
			poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
			original_language: 'en',
			original_title: 'Jaws',
			genre_ids: [27, 53, 12],
			backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
			overview:
				'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
			release_date: '1975-06-18',
			most_popular: false,
			video: false,
			adult: false,
		});
	});

	it('create => many movies', async () => {
		const input = [
			{
				vote_count: 2762,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
			},
			{
				vote_count: 2762,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
			},
		];

		const len = movies.length;
		const res = await MoviesRepo.createMany(input);

		expect(movies.length).not.toBe(len);
		expect(movies.length).toBe(len + 2);

		expect(typeof res).toBe('object');

		res.forEach(r => {
			expect(r).toHaveProperty('id');
			expect(typeof r.id).toBe('string');
			expect(r).toStrictEqual({
				vote_count: 2762,
				id: r.id,
				vote_average: 7.5,
				title: 'Jaws',
				popularity: 16.273358,
				poster_path: '/l1yltvzILaZcx2jYvc5sEMkM7Eh.jpg',
				original_language: 'en',
				original_title: 'Jaws',
				genre_ids: [27, 53, 12],
				backdrop_path: '/slkPgAt1IQgxZXNrazEcOzhAK8f.jpg',
				overview:
					'An insatiable great white shark terrorizes the townspeople of Amity Island, The police chief, an oceanographer and a grizzled shark hunter seek to destroy the bloodthirsty beast.',
				release_date: '1975-06-18',
				most_popular: false,
				video: false,
				adult: false,
			});
		});
	});
});
