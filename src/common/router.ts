import { Express } from 'express';

export default abstract class Router {
	abstract apply(app: Express): void;
}
