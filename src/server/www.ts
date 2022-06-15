import express, { Express, Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import helmet from 'helmet';
import logger from 'morgan';
import createError from 'http-errors';

import Router from '@/common/router';

export default class Server {
	app: Express;
	name: string;
	version: string;
	port: number;

	constructor() {
		dotenv.config();

		const { NAME, VERSION, PORT } = process.env;

		this.name = NAME ?? 'graphql-server';
		this.version = VERSION ?? '0.1.0';
		this.port = parseInt(PORT ?? '80');

		this.app = express();

		this.app.use(helmet());
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));
	}

	public apply(...args: Router[]): Server {
		for (let router of args) {
			router.apply(this.app);
		}

		return this;
	}

	public listen(): Promise<Express> {
		this.beforeListen();

		return new Promise((res, rej) => {
			try {
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

	protected beforeListen() {
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
