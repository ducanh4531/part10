import { createHttpLink, ApolloClient, InMemoryCache } from "@apollo/client";
import Constants from "expo-constants";

const httpLink = createHttpLink({
	uri: Constants.manifest.extra.env,
});

const createApolloClient = () => {
	return new ApolloClient({
		link: httpLink,
		cache: new InMemoryCache(),
	});
};

export default createApolloClient;
