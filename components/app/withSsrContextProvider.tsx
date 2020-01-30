import React from 'react';
import {getSsrContextOnClient, getSsrContextOnServer, SsrContext} from './withSsrContext';

const withSsrContextProvider = (App: any) => {
	return class WithCookiesProvider extends React.Component<any> {
		static displayName = `withSsrContextProvider(${App.displayName || App.name})`;

		static async getInitialProps(appContext: any) {
			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps(appContext);
			}

			if (process.browser) {
				return appProps;
			}

			const ssrContext = getSsrContextOnServer(appContext.ctx.res);
			return {
				...appProps,
				ssrContext,
			};
		}

		render() {
			const {ssrContext, ...props} = this.props;
			return (
				<SsrContext.Provider value={ssrContext || getSsrContextOnClient()}>
					<App {...props} />
				</SsrContext.Provider>
			);
		}
	};
};

export default withSsrContextProvider;
