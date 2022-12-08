import { useQuery } from "@apollo/client";

import { REPOSITORY } from "../graphql/queries";

const useRepository = (variables) => {
	const { data, loading, fetchMore, ...result } = useQuery(REPOSITORY, {
		fetchPolicy: "cache-and-network",
		// skip: !variables.repositoryId,
		variables,
	});

	const handleFetchMore = () => {
		const canFetchMore =
			!loading && data?.repository.reviews.pageInfo.hasNextPage;

		if (!canFetchMore) {
			return;
		}

		fetchMore({
			variables: {
				after: data.repository.reviews.pageInfo.endCursor,
				...variables,
			},
		});
	};

	return { data, loading, fetchMore: handleFetchMore, ...result };
};

export default useRepository;
