import { useParams } from "react-router-native";
import { StyleSheet, FlatList, View } from "react-native";
import { format } from "date-fns";

import RepositoryItem from "../components/RepositoryItem";
import useRepository from "../hooks/useRepository";
import { ItemSeparator } from "./RepositoryList";
import theme from "../theme";
import Text from "./Text";

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
	ratingContainer: {
		height: 35,
		width: 35,
		borderRadius: 35 / 2,
		borderColor: theme.colors.primary,
		borderWidth: 3,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	ratingText: {
		color: theme.colors.primary,
		fontWeight: theme.fontWeights.bold,
	},
});

const CardRating = ({ reviewRating }) => {
	return (
		<View style={cardTitleStyles.ratingContainer}>
			<Text style={cardTitleStyles.ratingText}>{reviewRating}</Text>
		</View>
	);
};

const CardText = ({ review }) => {
	return (
		<View>
			<View>
				<Text>{review.user.username}</Text>
				<Text>{format(new Date(review.createdAt), "MM.dd.yyyy")}</Text>
			</View>
			<View>
				<Text>{review.text}</Text>
			</View>
		</View>
	);
};

const reviewItemStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexShrink: 1,
		padding: 10,
	},
});

const ReviewItem = ({ review }) => {
	return (
		<View style={reviewItemStyles.container}>
			<CardRating reviewRating={review.rating} />
			<CardText review={review} />
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
