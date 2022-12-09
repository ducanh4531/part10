import { useMutation } from "@apollo/client";

import { DELETE_REVIEW } from "../graphql/mutations";

const useDeleteReview = () => {
	const [deleteReview] = useMutation(DELETE_REVIEW);

	const removeReview = async (deleteReviewId) => {
		await deleteReview({
			variables: { deleteReviewId },
		});
	};

	return [removeReview];
};

export default useDeleteReview;
