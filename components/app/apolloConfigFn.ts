import {HttpLink} from 'apollo-link-http';
import ApolloLinkTimeout from 'apollo-link-timeout';
import {ApolloLink} from 'apollo-link';
import {InMemoryCache, defaultDataIdFromObject} from 'apollo-cache-inmemory';
import {Request, Response} from 'express';
import {ApolloClientOptions} from 'apollo-boost';
import {Cookies} from 'react-cookie';

const GRAPHQL_ENDPOINT = process.env.NODE_ENV === 'production' ? process.env.GRAPHQL_ENDPOINT_PROD : process.env.GRAPHQL_ENDPOINT_DEV;

export type ApolloConfig = Omit<ApolloClientOptions<any>, 'cache'> & {createCache: any};
export type Context = {
	req: Request & {
		universalCookies?: Cookies;
	};
	res: Response;
};

export default (ctx?: null | Context): ApolloConfig => {
	const headers: Record<string, any> = {};
	const req = ctx && ctx.req;

	if (!process.browser && req) {
		headers['x-forwarded-for'] = req.ip;
		if (req.header) {
			headers.cookie = req.header('cookie');
			headers['user-agent'] = req.header('user-agent');
		}
	}

	const fetcher = process.browser ? window.fetch : require('node-fetch');

	let link: ApolloLink = new HttpLink({
		fetch: fetcher,
		uri: GRAPHQL_ENDPOINT,
		headers: headers,
		fetchOptions: {
			credentials: 'include',
		},
	});
	if (!process.browser) {
		const timeoutLink = new ApolloLinkTimeout(5000); // ms
		link = timeoutLink.concat(link);
	}

	return {
		link,
		createCache() {
			return new InMemoryCache({
				dataIdFromObject: (object: any) => {
					return defaultDataIdFromObject(object);
				},
			});
		},
	};
};
