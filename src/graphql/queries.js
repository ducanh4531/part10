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
	}
`;

export const ALL_REPOSITORIES = gql`
	query repositories(
		$orderBy: AllRepositoriesOrderBy
		$orderDirection: OrderDirection
		$searchKeyword: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
		) {
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
			url
			reviews {
				edges {
					node {
						id
						text
						rating
						createdAt
						user {
							id
							username
						}
					}
				}
			}
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
