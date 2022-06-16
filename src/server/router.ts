import { Express } from 'express';

export abstract class Router {
	abstract apply(app: Express): void;
}

export class Routering {
	protected routers: Array<Router> = [];

	constructor(...args: Array<Router>) {
		this.routers = args;
	}

	public apply(app: Express): void {
		for (let router of this.routers) {
			router.apply(app);
		}
	}
}
