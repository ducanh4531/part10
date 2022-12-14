import { Platform } from "react-native";

const theme = {
	roundness: 3,
	colors: {
		textPrimary: "#24292e",
		textSecondary: "#586069",
		primary: "#0366d6",
		appBarBackground: "#24292e",
		mainBackground: "#e1e4e8",
		white: "#fff",
		red: "#d73a4a",
	},
	fontSizes: {
		body: 14,
		subheading: 16,
	},
	fonts: {
		fontFamily: Platform.select({
			android: "Roboto",
			ios: "Arial",
			default: "System",
		}),
	},
	fontWeights: {
		normal: "400",
		bold: "700",
	},
};

export default theme;
