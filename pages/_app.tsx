import App from 'next/app';
import React from 'react';
import {ApolloProvider} from 'react-apollo';
import compose from 'lodash.flowright';
import withApolloClient from '../components/app/withApolloClient';
import withCookiesProvider from '../components/app/withCookiesProvider';
import withSsrContextProvider from '../components/app/withSsrContextProvider';

type State = {
	runtimeError?: Error;
};

class MyApp extends App<any> {
	getInitialProps;
	state: State = {};

	static async getInitialProps(appContext: any) {
		const appProps = await App.getInitialProps(appContext);

		return {
			...appProps,
		};
	}

	componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
		Object.assign(error, {
			tag: 'App#componentDidCatch',
			errorInfo: errorInfo,
		});

		if (this.state.runtimeError) {
			return;
		}
		this.setState({
			runtimeError: error,
		});
	}

	render() {
		const {runtimeError} = this.state;
		if (runtimeError) {
			return <p>Error!!!</p>;
		}

		const {Component, pageProps, apolloClient} = this.props;

		return (
			<ApolloProvider client={apolloClient}>
				<Component {...pageProps} />
			</ApolloProvider>
		);
	}
}

export default compose(withApolloClient, withCookiesProvider, withSsrContextProvider)(MyApp);
