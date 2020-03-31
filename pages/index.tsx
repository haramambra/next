import React, { useCallback } from "react";
import { useRouter } from "next/router";
import MainLayout from '../components/MainLayout';
import css from '../components/indexPage.module.css';
import {useGetDogQuery, useNowQuery} from '../queries-generated/types';

const MainPage: React.FC = () => {
	const nowData = useNowQuery().data;
	const getDogDataQuery = useGetDogQuery();
	const getDogData = getDogDataQuery.data?.getDog;
	const router = useRouter();

	const handleRedirect = useCallback(() => {
		router.push('/test');
	}, [router]);

	return (
		<MainLayout>
			<div className={css.wrap}>
				<h1 className={css.mainTitle}>Sample title</h1>
				<p>
					Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloremque est et eum placeat quos
					sapiente, ullam! Animi doloribus iusto labore laborum ullam! A in maxime molestias neque praesentium
					rem voluptates.
				</p>

				<img src="/visa.png" alt="Visa"/>

				<hr/>

				<p>Container with background</p>
				<div className={css.backgroundImage}></div>

				<hr />
				<button onClick={handleRedirect}>Go to test page</button>

				<p>Graphql query</p>
				{nowData && nowData.now}
				<hr />
				{getDogData && (
					<>
						<p>Doggie</p>
						<img src={getDogData} alt="Doggie" width={250} />
					</>
				)}
			</div>
		</MainLayout>
	);
};

export default MainPage;
