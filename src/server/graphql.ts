import { ApolloServer } from 'apollo-server-express';
import { Express, Router } from 'express';

import depthLimit from 'graphql-depth-limit';

import graphqlComplexity from '@/config/graphql-complexity';
import schema from '@/core/schema';
import { NODE_ENV } from './config';

export default class GraphQLServer {
	protected graphql: ApolloServer;
	protected path: string;
	protected running: boolean = false;

	constructor(path = '/graphql') {
		this.path = path;

		this.graphql = new ApolloServer({
			schema,
			introspection: NODE_ENV !== 'production',
			validationRules: [depthLimit(7), graphqlComplexity],
			formatError: (err): Error => {
				if (err.message.startsWith('Database Error: ')) {
					return new Error('Internal server error');
				}

				return err;
			},
		});
	}

	public async start(app: Express) {
		await this.graphql.start();
		this.running = true;
	}

	public async restart() {
		await this.graphql.stop();
		await this.graphql.start();
	}

	public async stop() {
		if (!this.running) return;

		await this.graphql.stop();
		this.running = false;
	}

	public isRunning(): boolean {
		return this.running;
	}

	public middleware(): Router {
		if (!this.running) throw new Error('GraphQL Server must be running');
		return this.graphql.getMiddleware({ path: this.path });
	}
}
