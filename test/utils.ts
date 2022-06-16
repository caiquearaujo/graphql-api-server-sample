import { commonRouter } from '@/core/common.router';
import { Routering } from '@/server/router';
import { ApiServer, Server } from '@/server/www';
import request from 'supertest';

export class ApiHelper {
	api: ApiServer;
	server: Server | undefined;
	bootstrapped: boolean = false;

	constructor() {
		this.api = new ApiServer({
			router: new Routering(commonRouter),
			graphql: {
				path: '/graphql',
			},
		});
	}

	public async bootstrap() {
		if (this.bootstrapped) return;

		this.server = await this.api.bootstrap();
		this.bootstrapped = true;
	}

	public async open(): Promise<request.SuperTest<request.Test>> {
		if (!this.server)
			throw new Error('You must bootstrap ApiHelper first.');

		await this.server.restart();
		return request(this.server.httpServer());
	}

	public async close(): Promise<void> {
		if (!this.server)
			throw new Error('You must bootstrap ApiHelper first.');

		await this.server.stop();
	}
}
