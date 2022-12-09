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

export const CREATE_USER = gql`
	mutation createUser($user: CreateUserInput) {
		createUser(user: $user) {
			id
			username
			createdAt
		}
	}
`;

export const DELETE_REVIEW = gql`
	mutation deleteReview($deleteReviewId: ID!) {
		deleteReview(id: $deleteReviewId)
	}
`;
