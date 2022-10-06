import { View, StyleSheet, ScrollView, Pressable } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";
import { useQuery, useApolloClient } from "@apollo/client";

import Text from "./Text";
import theme from "../theme";
import { ME } from "../graphql/queries";
import useAuthStorage from "../hooks/useAuthStorage";

const appBarTabStyles = StyleSheet.create({
	textItem: {
		color: "#fff",
		fontWeight: "bold",
		paddingTop: 20,
		paddingLeft: 10,
		height: 50,
	},
});

const AppBarTab = ({ content }) => {
	return (
		<View>
			<Text style={appBarTabStyles.textItem}>{content}</Text>
		</View>
	);
};

const appBarStyles = StyleSheet.create({
	container: {
		flexDirection: "row",
		paddingTop: Constants.statusBarHeight,
		backgroundColor: theme.colors.appBarBackground,
	},
});

const AppBar = () => {
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();
	const { loading, data } = useQuery(ME);

	if (loading) {
		return null;
	}

	const onSubmit = () => {
		authStorage.removeAccessToken();
		apolloClient.resetStore();
	};

	// if (!data.me) {
	// 	return (
	// 		<View style={appBarStyles.container}>
	// 			<ScrollView horizontal>
	// 				<Link to="/">
	// 					<AppBarTab content="Repositories" />
	// 				</Link>
	// 				<Link to="/sign">
	// 					<AppBarTab content="Sign in" />
	// 				</Link>
	// 			</ScrollView>
	// 		</View>
	// 	);
	// }

	// console.log(data.me, data);
	return (
		<View style={appBarStyles.container}>
			<ScrollView horizontal>
				<Link to="/">
					<AppBarTab content="Repositories" />
				</Link>
				<Link to="/sign">
					<AppBarTab content="Sign in" />
				</Link>
				{data.me && (
					<Pressable onPress={{ onSubmit }}>
						<Text style={appBarTabStyles.textItem}>Log out</Text>
					</Pressable>
				)}
			</ScrollView>
		</View>
	);
};

export default AppBar;
