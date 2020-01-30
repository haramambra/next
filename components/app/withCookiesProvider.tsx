import React from 'react';
import {CookiesProvider} from 'react-cookie';

const withCookiesProvider = (App: any) => {
	return class WithCookiesProvider extends React.Component<any> {
		static displayName = `withCookiesProvider(${App.displayName || App.name})`;

		static async getInitialProps(appContext: any) {
			let appProps = {};
			if (App.getInitialProps) {
				appProps = await App.getInitialProps(appContext);
			}

			const {req} = appContext.ctx;
			const universalCookies = req && req.universalCookies;

			return {
				...appProps,
				getUniversalCookies: () => universalCookies,
			};
		}

		render() {
			const {getUniversalCookies, ...props} = this.props;

			return (
				<CookiesProvider cookies={getUniversalCookies && getUniversalCookies()}>
					<App {...props} />
				</CookiesProvider>
			);
		}
	};
};

export default withCookiesProvider;
