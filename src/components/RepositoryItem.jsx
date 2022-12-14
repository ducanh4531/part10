import { View, StyleSheet, Image, Pressable } from "react-native";
import { useParams } from "react-router-native";
import * as Linking from "expo-linking";

import Text from "./Text";
import theme from "../theme";

export const cardTitleStyles = StyleSheet.create({
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
	textInLogin: {
		color: theme.colors.white,
		fontWeight: theme.fontWeights.bold,
		backgroundColor: theme.colors.primary,
		width: 350,
		height: 45,
		textAlign: "center",
	},
});

const CardTitle = ({ item }) => {
	return (
		<View style={cardTitleStyles.container}>
			<View style={cardTitleStyles.avatarContainer}>
				<Image
					style={cardTitleStyles.avatar}
					source={{ uri: item.ownerAvatarUrl }}
				/>
			</View>

			<View style={cardTitleStyles.infoContainer}>
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
					style={[cardTitleStyles.languageItem, { marginBottom: 4 }]}
				>
					<Text color="mainBackground">{item.language}</Text>
				</View>
			</View>
		</View>
	);
};

const cardInformationStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		flexGrow: 1,
		// IOS only supports value 'justify'
		textAlign: "center",
		justifyContent: "space-around",
	},
});

const convertToK = (number) => {
	if (number >= 1000) {
		return String(parseInt((number / 1000) * 10) / 10 + "k");
	}
	return number;
	// eslint-disable-next-line no-undef
	// const formatter = Intl.NumberFormat("en", { notation: "compact" });
	// return formatter.format(number);
};

const CardInformation = ({ item }) => {
	return (
		<View style={cardInformationStyles.container}>
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

export const cardStyles = StyleSheet.create({
	container: {
		alignItems: "stretch",
		backgroundColor: "white",
		padding: 10,
	},
	separate: {
		marginTop: 30,
	},
});

const RepositoryItem = ({ item }) => {
	const { repositoryId } = useParams();

	const handlePress = () => {
		Linking.openURL(item.url);
	};

	return (
		<View testID="repositoryItem" style={cardStyles.container}>
			<CardTitle item={item} />
			<CardInformation item={item} />
			{repositoryId && (
				<View style={cardStyles.separate}>
					<Pressable onPress={handlePress}>
						<Text
							style={cardTitleStyles.textInLogin}
							color="mainBackground"
						>
							Open in Github
						</Text>
					</Pressable>
				</View>
			)}
		</View>
	);
};

export default RepositoryItem;
