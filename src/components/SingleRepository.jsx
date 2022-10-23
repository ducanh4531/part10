import { useParams } from "react-router-native";
import { FlatList, View, Text } from "react-native";
import { format } from "date-fns";

import RepositoryItem from "../components/RepositoryItem";
import useRepository from "../hooks/useRepository";
import { ItemSeparator } from "./RepositoryList";

const RepositoryInfo = ({ repository }) => {
	return (
		<View>
			<RepositoryItem item={repository} />
			<ItemSeparator />
		</View>
	);
};

// Review details:

const CardTitle = ({ review }) => {
	return (
		<View>
			<View>
				<Text>{review.rating}</Text>
			</View>
			<View>
				<Text>{review.user.username}</Text>
				<Text>{format(new Date(review.createdAt), "MM.dd.yyyy")}</Text>
			</View>
		</View>
	);
};

const CardInformation = ({ reviewText }) => {
	return (
		<View>
			<Text>{reviewText}</Text>
		</View>
	);
};
const ReviewItem = ({ review }) => {
	return (
		<View>
			<CardTitle review={review} />
			<CardInformation reviewText={review.text} />
		</View>
	);
};

const SingleRepository = () => {
	const { repositoryId } = useParams();
	const { loading, data } = useRepository(repositoryId);

	if (loading) {
		return null;
	}

	const reviewNodes = data.repository.reviews
		? data.repository.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			renderItem={({ item }) => (
				<View>
					<Text>{item.fullName}</Text>
					<ReviewItem review={item} />
				</View>
			)}
			keyExtractor={({ id }) => id}
			ListHeaderComponent={() => (
				<RepositoryInfo repository={data.repository} />
			)}
		/>
	);
};

export default SingleRepository;
