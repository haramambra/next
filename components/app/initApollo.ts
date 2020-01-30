import {ApolloClient} from 'apollo-client';
import {InMemoryCache} from 'apollo-cache-inmemory';
import {ApolloClientOptions} from 'apollo-boost';
import apolloConfigFn, {ApolloConfig, Context} from './apolloConfigFn';

export let apolloClient: ApolloClient<any> | null = null;

const createDefaultCache = () => new InMemoryCache();

function create({createCache, ...apolloConfig}: ApolloConfig, initialState: any) {
	const c = createCache || createDefaultCache;

	const config: ApolloClientOptions<any> = {
		connectToDevTools: process.browser,
		ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
		cache: c().restore(initialState || {}),
		...apolloConfig,
	};

	return new ApolloClient(config);
}

export default function initApollo(initialState: any, ctx?: Context | null) {
	// if (isFunction(apolloConfig)) {
	const apolloConfig = apolloConfigFn(ctx);
	// }
	// Make sure to create a new client for every server-side request so that data
	// isn't shared between connections (which would be bad)
	if (!process.browser) {
		return create(apolloConfig, initialState);
	}

	// Reuse client on the client-side
	if (!apolloClient) {
		apolloClient = create(apolloConfig, initialState);
	}

	return apolloClient;
}
