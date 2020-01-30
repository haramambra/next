import Head from 'next/head';
import React from 'react';

const MainLayout: React.FC = ({children}) => {
	return (
		<>
			<Head>
				<title>Next with graphql</title>
				<link rel="stylesheet" href="/static/reset.css" />
			</Head>

			<div>{children}</div>
		</>
	);
};

export default MainLayout;
