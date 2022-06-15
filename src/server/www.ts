import express, { Express, Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from 'morgan';
import createError from 'http-errors';

import Router from '@/common/router';
import { NAME, VERSION, PORT, NODE_ENV } from './config';
import server from './graphql';

export default class Server {
	app: Express;
	name: string;
	version: string;
	port: number;

	constructor() {
		this.name = NAME ?? 'graphql-server';
		this.version = VERSION ?? '0.1.0';
		this.port = parseInt(PORT ?? '80');

		this.app = express();
	}

	public apply(...args: Router[]): Server {
		for (let router of args) {
			router.apply(this.app);
		}

		return this;
	}

	public listen(): Promise<Express> {
		return new Promise(async (res, rej) => {
			try {
				await server.start();
				server.applyMiddleware({ app: this.app, path: '/graphql' });

				this.catchErrors();

				this.app.listen(this.port, () => {
					console.log(
						`⚡️[server]: Server is running at http://localhost:${this.port}`
					);

					res(this.app);
				});
			} catch (err) {
				rej(err);
			}
		});
	}

	public async bootstrap(): Promise<Express> {
		return await this.listen();
	}

	protected init() {
		this.app.enable('trust proxy');
		this.app.use(helmet());
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		if (NODE_ENV !== 'production') return;

		this.app.use(
			rateLimit({
				windowMs: 15 * 60 * 1000, // 15 minutes
				max: 100, // limit each IP to 100 requests per windowMs
			})
		);
	}

	protected catchErrors() {
		// 404 error
		this.app.use((req: Request, res: Response, next: NextFunction) => {
			next(
				createError(
					404,
					'The resource you are looking for is not found.'
				)
			);
		});

		// Default error handler
		this.app.use(
			(error: any, req: Request, res: Response, next: NextFunction) => {
				const {
					status = 500,
					name = 'UnknownError',
					message = 'Unknown error',
				} = error;

				res.status(error.status ?? 500).json({
					status: status,
					name: name,
					message: message,
				});
			}
		);
	}
}
