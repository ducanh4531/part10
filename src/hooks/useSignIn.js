import { useMutation, useApolloClient } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";
import useAuthStorage from "./useAuthStorage";

const useSignIn = () => {
	const [mutate, result] = useMutation(LOGIN);
	const authStorage = useAuthStorage();
	const apolloClient = useApolloClient();

	const signIn = async ({ username, password }) => {
		await mutate({
			variables: { credentials: { username, password } },
		});
		await authStorage.setAccessToken(result.data.authenticate.accessToken);
		apolloClient.resetStore();
		return result;
	};

	return [signIn, result];
};

export default useSignIn;
