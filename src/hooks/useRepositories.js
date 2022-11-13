// import { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";

import { ALL_REPOSITORIES } from "../graphql/queries";

const useRepositories = ({ orderBy, orderDirection }) => {
	const result = useQuery(ALL_REPOSITORIES, {
		fetchPolicy: "cache-and-network",
		variables: { orderBy, orderDirection },
	});

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

	return result;
};

export default useRepositories;
