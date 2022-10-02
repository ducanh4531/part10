import "dotenv/config";

export default {
	expo: {
		name: "rate-repository-app",
		slug: "rate-repository-app",
		version: "1.0.0",
		orientation: "portrait",
		icon: "./assets/icon.png",
		splash: {
			image: "./assets/splash.png",
			resizeMode: "contain",
			backgroundColor: "#ffffff",
		},
		extra: {
			env: process.env.APOLLO_URI,
		},
		updates: {
			fallbackToCacheTimeout: 0,
		},
		assetBundlePatterns: ["**/*"],
		ios: {
			supportsTablet: true,
			bundleIdentifier: "rate-repository-app",
		},
		android: {
			adaptiveIcon: {
				foregroundImage: "./assets/adaptive-icon.png",
				backgroundColor: "#FFFFFF",
			},
		},
		web: {
			favicon: "./assets/favicon.png",
		},
	},
};
