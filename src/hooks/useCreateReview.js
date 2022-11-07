import { useMutation } from "@apollo/client";

import { CREATE_REVIEW } from "../graphql/mutations";

const useCreateReview = () => {
	const [addReview, result] = useMutation(CREATE_REVIEW);

	const createReview = async ({
		repositoryName,
		ownerName,
		rating,
		text,
	}) => {
		const { data } = await addReview({
			variables: {
				review: { repositoryName, ownerName, rating, text },
			},
		});
		return { data };
	};
	return [createReview, result];
};

export default useCreateReview;
