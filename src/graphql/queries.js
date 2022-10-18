import { gql } from "@apollo/client";

const REPOSITORY_DETAILS = gql`
	fragment RepositoryDetails on Repository {
		id
		fullName
		ratingAverage
		stargazersCount
		reviewCount
		forksCount
		ownerAvatarUrl
		language
		description
		url
	}
`;

export const ALL_REPOSITORIES = gql`
	query repositories {
		repositories {
			edges {
				node {
					...RepositoryDetails
				}
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

export const REPOSITORY = gql`
	query Repository($repositoryId: ID!) {
		repository(id: $repositoryId) {
			...RepositoryDetails
		}
	}
	${REPOSITORY_DETAILS}
`;

export const ME = gql`
	query {
		me {
			username
		}
	}
`;
