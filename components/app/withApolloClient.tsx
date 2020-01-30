import React from 'react';
import Head from 'next/head';
import {NextComponentType} from 'next';
import {getDataFromTree} from 'react-apollo';
import {ApolloClient} from 'apollo-client';
import initApollo from './initApollo';

type Props = {
	Component: React.Component;
	apolloClient?: ApolloClient<any>;
	apolloState: any;
};

const withApolloClient = (App: NextComponentType<any, {}, Props>) => {
	class Apollo extends React.Component<Props> {
		static displayName = `withApolloClient(${App.displayName || App.name})`;

		static async getInitialProps(appContext: any) {
			const {Component, ctx} = appContext;
			const {AppTree} = ctx;

			let apolloClient;
			if (!process.browser) {
				apolloClient = initApollo(null, process.browser ? null : ctx);
			}

			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps({...appContext, apolloClient});
			}

			const apolloState: any = {};

			// Run all GraphQL queries in the component tree
			// and extract the resulting data
			if (!process.browser) {
				try {
					const app = (
							<AppTree
								{...appProps}
								Component={Component}
								apolloState={apolloState}
								apolloClient={apolloClient}
							/>
					);
					// Run all GraphQL queries
					await getDataFromTree(app);
				} catch (err) {
					console.log(err);
					// Prevent Apollo Client GraphQL errors from crashing SSR.
					// Handle them in components via the data.error prop:
					// http://dev.apollodata.com/react/api-queries.html#graphql-query-data-error
				}

				// getDataFromTree does not call componentWillUnmount
				// head side effect therefore need to be cleared manually
				Head.rewind();

				// Extract query data from the Apollo store
				apolloState.data = apolloClient?.cache.extract();
			}

			return {
				...appProps,
				apolloState,
			};
		}

		apolloClient: ApolloClient<any>;

		constructor(props: Props) {
			super(props);
			// `getDataFromTree` renders the component first, the client is passed off as a property.
			// After that rendering is done using Next's normal rendering pipeline
			this.apolloClient = props.apolloClient || initApollo(props.apolloState.data);
		}

		render() {
			return <App {...this.props} apolloClient={this.apolloClient} />;
		}
	}
	return Apollo;
};

export default withApolloClient;
