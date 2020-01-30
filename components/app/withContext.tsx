import React from 'react';
import hoistStatics from 'hoist-non-react-statics';

export type WithContext<Context, Key extends string> = {[key in Key]: Context};

function withContext(Context: any, key: string) {
	function withCurrentContext(Component: any) {
		class Wrapper extends React.Component<any> {
			static displayName = `withContext(${Component.displayName || Component.name})`;

			render() {
				return (
					<Context.Consumer>
						{(context: any) => {
							const props = {
								...this.props,
								[key]: context,
							};
							return <Component {...props} />;
						}}
					</Context.Consumer>
				);
			}
		}

		return hoistStatics(Wrapper, Component, {WrappedComponent: true});
	}
	return withCurrentContext;
}
export default withContext;
