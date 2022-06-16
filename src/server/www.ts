import express, { Express, Request, Response, NextFunction } from 'express';

import http from 'http';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import logger from 'morgan';
import createError from 'http-errors';

import { NAME, VERSION, PORT, NODE_ENV } from './config';
import GraphQLServer from './graphql';
import { Routering } from './router';

export type ApiServerOptions = {
	graphql: {
		path: string;
	};
	router: Routering;
};

export class ApiServer {
	app: Express;
	http: http.Server | undefined;
	graphql: GraphQLServer;
	router: Routering;

	name: string;
	version: string;
	port: number;

	constructor(options: ApiServerOptions) {
		this.name = NAME ?? 'graphql-server';
		this.version = VERSION ?? '0.1.0';
		this.port = parseInt(PORT ?? '80');

		this.app = express();
		this.graphql = new GraphQLServer(options.graphql.path);
		this.router = options.router;
	}

	// public async start() {
	// 	this.http = await this.listen();
	// }

	// public async restart() {
	// 	await this.stop();
	// 	await this.start();
	// }

	// public async stop() {
	// 	await new Promise<void>(res => {
	// 		if (!this.http) return res();
	// 		this.http.close(() => res());
	// 	});

	// 	this.http = undefined;
	// }

	// public isRunning(): boolean {
	// 	return this.http !== undefined;
	// }

	public async bootstrap(): Promise<Server> {
		await this.graphql.start(this.app);
		this.init();
		return new Server(this.app);
	}

	protected init() {
		this.app.enable('trust proxy');
		this.app.use(helmet());
		this.app.use(logger('dev'));
		this.app.use(express.json());
		this.app.use(express.urlencoded({ extended: true }));

		if (NODE_ENV === 'production') {
			this.app.use(
				rateLimit({
					windowMs: 15 * 60 * 1000, // 15 minutes
					max: 100, // limit each IP to 100 requests per windowMs
				})
			);
		}

		this.router.apply(this.app);
		this.app.use(this.graphql.middleware());

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

export class Server {
	app: Express;
	http: http.Server | undefined;

	port: number;

	constructor(app: Express) {
		this.port = parseInt(PORT ?? '80');

		this.app = app;
	}

	public async start() {
		this.http = await this.listen();
	}

	public async restart() {
		await this.stop();
		await this.start();
	}

	public async stop() {
		await new Promise<void>(res => {
			if (!this.http) return res();
			this.http.close(() => res());
		});

		this.http = undefined;
	}

	public httpServer(): http.Server | undefined {
		return this.http;
	}

	public isRunning(): boolean {
		return this.http !== undefined;
	}

	protected listen(): Promise<http.Server> {
		return new Promise(async (res, rej) => {
			try {
				const httpServer = this.app.listen(this.port, () => {
					console.log(
						`⚡️[server]: Server is running at http://localhost:${this.port}`
					);
				});

				res(httpServer);
			} catch (err) {
				rej(err);
			}
		});
	}
}
