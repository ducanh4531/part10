import { useMutation } from "@apollo/client";

import { CREATE_USER } from "../graphql/mutations";

const useSignUp = () => {
	const [addUser, result] = useMutation(CREATE_USER);

	const signUp = async ({ username, password }) => {
		const { data } = await addUser({
			variables: { user: { username, password } },
		});
		return { data };
	};
	return [signUp, result];
};

export default useSignUp;
