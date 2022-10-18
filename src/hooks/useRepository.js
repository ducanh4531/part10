import { useQuery } from "@apollo/client";

import { REPOSITORY } from "../graphql/queries";

const useRepository = (repositoryId) => {
	const result = useQuery(REPOSITORY, {
		variables: { repositoryId },
		skip: !repositoryId,
		fetchPolicy: "cache-and-network",
	});
	return result;
};

export default useRepository;
