import { View, StyleSheet, ScrollView } from "react-native";
import Constants from "expo-constants";
import { Link } from "react-router-native";

import Text from "./Text";
import theme from "../theme";

const appBarTabStyles = StyleSheet.create({
	textItem: {
		color: "#fff",
		paddingTop: 20,
		paddingLeft: 10,
		height: 50,
	},
});

const AppBarTab = ({ content }) => {
	return (
		<View>
			<Text fontWeight="bold" style={appBarTabStyles.textItem}>
				{content}
			</Text>
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
	return (
		<View style={appBarStyles.container}>
			<ScrollView horizontal>
				<Link to="/">
					<AppBarTab content="Repositories" />
				</Link>
				<Link to="/sign">
					<AppBarTab content="Sign in" />
				</Link>
			</ScrollView>
		</View>
	);
};

export default AppBar;
