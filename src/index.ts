import 'module-alias/register';
import { commonRouter } from '@/core/common.router';
import Server from '@/server/www';

new Server()
	.apply(commonRouter)
	.bootstrap()
	.then(() => console.log('Server is ready.'))
	.catch(err => {
		console.error('Server failed to start...');
		console.error(err);
		process.exit(1);
	});
