import { config } from 'dotenv';
import path from 'path';

export const { NODE_ENV = 'development' } = process.env;
const DIR = path.resolve(__dirname, '../..');

config({
	path: `${DIR}/.env.${NODE_ENV}`,
});

export const { NAME, VERSION, PORT } = process.env;
