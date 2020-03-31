import Head from 'next/head';
import React from 'react';

const MainLayout: React.FC = ({children}) => {
	return (
		<>
			<Head>
				<title>Next with graphql</title>
			</Head>

			<div>{children}</div>
		</>
	);
};

export default MainLayout;
