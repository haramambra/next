import React from 'react';
import {Context} from './apolloConfigFn';
import withContext from './withContext';

export type ISsrContext = {
	/* пользователь внутри сети */
	isDev?: boolean;
	/* change status code */
	status?: (statusCode: number) => void;
	/* redirect */
	redirect?: (url: string) => void;
};

export type WithSsrContextProps = {
	ssrContext: ISsrContext;
};

export const getSsrContextOnServer = (res?: Context['res']): ISsrContext => {
	const ssrContext: ISsrContext = {};

	if (res) {
		ssrContext.status = code => res.status(code);
		ssrContext.redirect = url => {
			if (process.browser) {
				window.location.href = url;
			} else {
				res.redirect(url);
			}
		};
	}

	return ssrContext;
};

if (process.browser) {
	/* Патчим объект чтобы добавить метод */
	const nextData = (window as any).__NEXT_DATA__;
	if (nextData) {
		const ssrContext = nextData.props.ssrContext;
		ssrContext.addMetricLabels = () => {};
	}
}

export const getSsrContextOnClient = (): ISsrContext => {
	const nextData = (window as any).__NEXT_DATA__;
	return nextData && nextData.props.ssrContext;
};

export const SsrContext = React.createContext<ISsrContext>(getSsrContextOnServer());

/**
 * HOC возвращает контекст сервера:
 * например всё что нужно взять из заголовков
 */
const withSsrContext = withContext(SsrContext, 'ssrContext');

export default withSsrContext;
