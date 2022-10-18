import { useParams } from "react-router-native";

import RepositoryItem from "../components/RepositoryItem";
import useRepository from "../hooks/useRepository";

const SingleRepository = () => {
	const { repositoryId } = useParams();
	const { loading, data } = useRepository(repositoryId);

	if (loading) {
		return null;
	}

	return (
		<>
			<RepositoryItem item={data.repository} />
		</>
	);
};

export default SingleRepository;
