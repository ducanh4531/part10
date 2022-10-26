import { useParams } from "react-router-native";
import { StyleSheet, FlatList, View, Text } from "react-native";
import { format } from "date-fns";

import RepositoryItem from "../components/RepositoryItem";
import useRepository from "../hooks/useRepository";
import { ItemSeparator } from "./RepositoryList";
import theme from "../theme";

const RepositoryInfo = ({ repository }) => {
	return (
		<View>
			<RepositoryItem item={repository} />
			<ItemSeparator />
		</View>
	);
};

// Review details:
const cardTitleStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
	},
	reviewContainer: {
		height: 35,
		width: 35,
		borderRadius: 35 / 2,
		borderColor: theme.colors.primary,
		borderWidth: 3,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	reviewText: {
		color: theme.colors.primary,
		fontWeight: theme.fontWeights.bold,
	},
});

const CardTitle = ({ review }) => {
	return (
		<View style={cardTitleStyles.container}>
			<View style={cardTitleStyles.reviewContainer}>
				<Text style={cardTitleStyles.reviewText}>{review.rating}</Text>
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

const reviewItemStyles = StyleSheet.create({
	container: {
		flexShrink: 1,
		padding: 10,
	},
});

const ReviewItem = ({ review }) => {
	return (
		<View style={reviewItemStyles.container}>
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
