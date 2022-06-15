import { Express, Request, Response, NextFunction } from 'express';
import Router from '@/common/router';

class CommonRouter extends Router {
	apply(app: Express): void {
		app.get('/status', (req: Request, res: Response) => {
			res.json({
				running: true,
			});
		});
	}
}

export const commonRouter = new CommonRouter();
