import { Text as NativeText, StyleSheet } from "react-native";

import theme from "../theme";

const styles = StyleSheet.create({
	text: {
		color: theme.colors.textPrimary,
		fontSize: theme.fontSizes.body,
		fontFamily: theme.fonts.fontFamily,
		fontWeight: theme.fontWeights.normal,
	},
	colorTextSecondary: {
		color: theme.colors.textSecondary,
	},
	colorPrimary: {
		color: theme.colors.primary,
	},
	appBarBackground: {
		color: theme.colors.appBarBackground,
	},
	mainBackground: {
		color: theme.colors.mainBackground,
	},
	fontSizeSubheading: {
		fontSize: theme.fontSizes.subheading,
	},
	fontWeightBold: {
		fontWeight: theme.fontWeights.bold,
	},
});
const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
	const textStyle = [
		styles.text,
		color === "textSecondary" && styles.colorTextSecondary,
		color === "primary" && styles.colorPrimary,
		color === "appBarBackground" && styles.appBarBackground,
		color === "mainBackground" && styles.mainBackground,
		fontSize === "subheading" && styles.fontSizeSubheading,
		fontWeight === "bold" && styles.fontWeightBold,
		style,
	];

	return <NativeText style={textStyle} {...props} />;
};

export default Text;
