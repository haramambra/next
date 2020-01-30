export type AppRoutes = {
	index: {};
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const nextRoutes = require('next-routes');
const routes = nextRoutes();

routes.add('index', '/', 'index');
routes.add('test123', '/test', 'test');

export const Router = {
	...routes.Router,

	pushRoute(
		route,
		params?,
		options?,
	): Promise<boolean> {
		return routes.Router.pushRoute(route, params, options).then(res => res);
	},
};
export default routes;
