import { useMutation } from "@apollo/client";

import { LOGIN } from "../graphql/mutations";

const useSignIn = () => {
	const [authenticateFunc, result] = useMutation(LOGIN);

	const signIn = async ({ username, password }) => {
		await authenticateFunc({
			variables: { credentials: { username, password } },
		});
		return result;
	};

	return [signIn, result];
};

export default useSignIn;
