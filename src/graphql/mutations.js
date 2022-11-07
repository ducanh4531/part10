import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation authenticate($credentials: AuthenticateInput) {
		authenticate(credentials: $credentials) {
			accessToken
		}
	}
`;

export const CREATE_REVIEW = gql`
	mutation createReview($review: CreateReviewInput) {
		createReview(review: $review) {
			id
			text
			rating
			createdAt
			repositoryId
			user {
				id
				username
			}
			repository {
			fullName
			}
		}
	}
`;
