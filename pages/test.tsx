import React from 'react';
import MainLayout from '../components/MainLayout';
import css from '../components/testPage.module.css';

const TestPage: React.FC = () => {

	return (
		<MainLayout>
			<div className={css.wrap}>
				Test page
			</div>
		</MainLayout>
	);
};

export default TestPage;
