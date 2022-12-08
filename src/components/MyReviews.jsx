import { FlatList, View } from "react-native";
import { useQuery } from "@apollo/client";

import { ReviewItem } from "./SingleRepository";
import { ItemSeparator } from "./RepositoryList";
import { ME } from "../graphql/queries";

const MyReviews = () => {
	const { loading, data } = useQuery(ME, {
		fetchPolicy: "cache-and-network",
		variables: { includeReviews: true },
	});

	if (loading) {
		return null;
	}

	const reviewNodes = data.me.reviews
		? data.me.reviews.edges.map((edge) => edge.node)
		: [];

	console.log(reviewNodes);

	return (
		<FlatList
			data={reviewNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => (
				<View>
					<ReviewItem review={item} />
				</View>
			)}
		/>
	);
};

export default MyReviews;
