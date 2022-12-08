// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { ALL_REPOSITORIES } from "../graphql/queries";

// const useRepositories = ({ orderBy, orderDirection, searchKeyword }) => {
const useRepositories = (variables) => {
	const { data, loading, fetchMore, ...result } = useQuery(ALL_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		// variables: {
		// 	orderBy,
		// 	orderDirection,
		// 	searchKeyword,
		// },
		variables,
	});

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repositories.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repositories.pageInfo.endCursor,
				...variables,
			},
		});
	};

	// use fetchAPI

	// const [repositories, setRepositories] = useState();
	// const [loading, setLoading] = useState(false);

	// const fetchRepositories = async () => {
	// 	setLoading(true);

	// 	const response = await fetch(
	// 		"http://192.168.101.217:5000/api/repositories"
	// 	);
	// 	const json = await response.json();

	// 	setLoading(false);
	// 	setRepositories(json);
	// };

	// useEffect(() => {
	// 	fetchRepositories();
	// }, []);
	return {
		repositories: data?.repositories,
		loading,
		fetchMore: handleFetchMore,
		...result,
	};
};

export default useRepositories;
