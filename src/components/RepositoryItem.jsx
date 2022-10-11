import { View, StyleSheet, Image } from "react-native";

import Text from "./Text";
import theme from "../theme";

const cardHeaderStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexGrow: 1,
		padding: 10,
	},
	avatarContainer: {
		flexGrow: 0,
		paddingRight: 15,
	},
	avatar: {
		width: 45,
		height: 45,
		borderRadius: 4,
	},
	infoContainer: {
		flexGrow: 1,
		flexShrink: 1,
	},
	languageItem: {
		backgroundColor: theme.colors.primary,
		padding: 5,
		borderRadius: 2,
		alignSelf: "flex-start",
		flexDirection: "row",
	},
});

const CardTitle = ({ item }) => {
	return (
		<View style={cardHeaderStyles.container}>
			<View style={cardHeaderStyles.avatarContainer}>
				<Image
					style={cardHeaderStyles.avatar}
					source={{ uri: item.ownerAvatarUrl }}
				/>
			</View>

			<View style={cardHeaderStyles.infoContainer}>
				<Text
					fontWeight="bold"
					fontSize="subheading"
					style={{ marginBottom: 4 }}
				>
					{item.fullName}
				</Text>
				<Text color="textSecondary" style={{ marginBottom: 4 }}>
					{item.description}
				</Text>
				<View
					style={[cardHeaderStyles.languageItem, { marginBottom: 4 }]}
				>
					<Text color="mainBackground">{item.language}</Text>
				</View>
			</View>
		</View>
	);
};

const cardBodyStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexGrow: 1,
		// IOS only supports value 'justify'
		textAlign: "center",
		justifyContent: "space-evenly",
	},
});

const convertToK = (number) => {
	// eslint-disable-next-line no-undef
	const formatter = Intl.NumberFormat("en", { notation: "compact" });
	return formatter.format(number);
};

const CardInformation = ({ item }) => {
	return (
		<View style={cardBodyStyles.container}>
			<View>
				<Text fontWeight="bold" style={{ marginBottom: 4 }}>
					{convertToK(item.stargazersCount)}
				</Text>
				<Text color="textSecondary">Stars</Text>
			</View>
			<View>
				<Text fontWeight="bold" style={{ marginBottom: 4 }}>
					{convertToK(item.forksCount)}
				</Text>
				<Text color="textSecondary">Forks</Text>
			</View>
			<View>
				<Text fontWeight="bold" style={{ marginBottom: 4 }}>
					{convertToK(item.reviewCount)}
				</Text>
				<Text color="textSecondary">Reviews</Text>
			</View>
			<View>
				<Text fontWeight="bold" style={{ marginBottom: 4 }}>
					{convertToK(item.ratingAverage)}
				</Text>
				<Text color="textSecondary">Rating</Text>
			</View>
		</View>
	);
};

const cardStyles = StyleSheet.create({
	container: {
		alignItems: "stretch",
		backgroundColor: "white",
		padding: 10,
	},
});

const RepositoryItem = ({ item }) => {
	return (
		<View testID="repositoryItem" style={cardStyles.container}>
			<CardTitle item={item} />
			<CardInformation item={item} />
		</View>
	);
};

export default RepositoryItem;
