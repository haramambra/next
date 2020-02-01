import next from 'next';
import express from 'express';
import proxy from 'express-http-proxy';
import cookiesMiddleware from 'universal-cookie-express';
import routes from './routes';
import skipDebugStaticMiddleware from './skipDebugStaticMiddleware';

console.log(process.env.NODE_ENV);
require('dotenv').config({path: process.cwd() +'/.env'});
const enviroment = process.env.NODE_ENV || 'development';
const port = process.env.PORT;
const dev = enviroment === 'development';
const nextApp = next({dev, quiet: !dev});
const nextHandler = nextApp.getRequestHandler();

const app = express();
app.disable('x-powered-by');

/**
 * http://expressjs.com/ru/api.html#trust.proxy.options.table
 */
app.set('trust proxy', 'loopback, linklocal, uniquelocal');

nextApp.prepare().then(() => {
	const gqlServer = dev ? process.env.GRAPHQL_ENDPOINT_DEV : process.env.GRAPHQL_ENDPOINT_PROD;
	const proxySettings: proxy.ProxyOptions = {
		limit: '5mb',
		proxyReqPathResolver(req) {
			return req.originalUrl;
		},
		userResHeaderDecorator(headers) {
			return {
				...headers,
			};
		},
	};

	app.use('/graphql', proxy(gqlServer, proxySettings));

	app.use(skipDebugStaticMiddleware(nextHandler));

	app.use(cookiesMiddleware());

	app.use((req, res) => {
		const {route, query, parsedUrl} = routes.match(req.url);

		if (route) {
			res.locals.route = route;
			res.locals.handler = route.name;
			console.log(route.page)
			nextApp.render(req, res, route.page, query);
		} else {
			nextApp.render404(req, res, parsedUrl);
		}
	});

	app.listen(port, () => {
		console.log(`Started at http://localhost:${port}`);
	}).on('error', err => {
		throw err;
	});
});

process
	.on('unhandledRejection', () => {})
	.on('uncaughtException', () => {
		process.exit(1);
	});
