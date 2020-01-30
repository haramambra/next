declare module 'lodash.flowright' {
	function compose(...args: any[]): any;
	export = compose;
}

declare module '*.css' {
	const value: any;
	export default value;
	export = value;
}

declare module 'next/router' {
	export {
		NextRouter,
		useRouter,
		withRouter,
		RouterContext,
		createRouter,
		makePublicRouterInstance,
		Router,
		SingletonRouter,
	} from '../node_modules/next/router';
	export declare type WithRouterProps = {
		router: NextRouter;
	};
}
