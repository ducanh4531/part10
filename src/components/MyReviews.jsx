import { Alert, FlatList, View, Pressable, StyleSheet } from "react-native";
import { useQuery } from "@apollo/client";
import { Link } from "react-router-native";

import { ReviewItem } from "./SingleRepository";
import { ItemSeparator } from "./RepositoryList";
import { ME } from "../graphql/queries";
import Text from "./Text";
import { cardTitleStyles, cardStyles } from "./RepositoryItem";
import useDeleteReview from "../hooks/useDeleteReview";

const MyReviews = () => {
	const { loading, data, refetch } = useQuery(ME, {
		fetchPolicy: "cache-and-network",
		variables: { includeReviews: true },
	});

	const [removeReview] = useDeleteReview();

	const showAlert = (id) => {
		Alert.alert(
			"Delete review",
			"Are you sure you want to delete this review?",
			[
				{
					text: "Cancel",
					onPress: () => console.log("Cancel Pressed"),
					style: "cancel",
				},
				{
					text: "OK",
					onPress: () => {
						removeReview(id);
						refetch();
					},
				},
			]
		);
	};

	if (loading) {
		return null;
	}

	const reviewNodes = data.me.reviews
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => (
				<View>
					<ReviewItem review={item} />
					<View style={[cardStyles.container, styles.flexContainer]}>
						<View style={cardStyles.separate}>
							<Link to={`/${item.repository.id}`}>
								<Text
									style={[
										cardTitleStyles.textInLogin,
										{ width: 150 },
									]}
									color="mainBackground"
								>
									View repository
								</Text>
							</Link>
						</View>
						<View style={cardStyles.separate}>
							<Pressable onPress={() => showAlert(item.id)}>
								<Text
									style={[
										cardTitleStyles.textInLogin,
										{
											backgroundColor: "#d73a4a",
											width: 150,
										},
									]}
									color="mainBackground"
								>
									Delete review
								</Text>
							</Pressable>
						</View>
					</View>
				</View>
			)}
		/>
	);
};

const styles = StyleSheet.create({
	flexContainer: {
		flexDirection: "row",
		justifyContent: "space-evenly",
	},
});

export default MyReviews;
