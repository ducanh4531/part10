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
		$first: Int
		$after: String
	) {
		repositories(
			orderBy: $orderBy
			orderDirection: $orderDirection
			searchKeyword: $searchKeyword
			first: $first
			after: $after
		) {
			pageInfo {
				endCursor
				hasNextPage
			}
			edges {
				node {
					...RepositoryDetails
				}
				cursor
			}
		}
	}
	${REPOSITORY_DETAILS}
`;

export const REPOSITORY = gql`
	query Repository($repositoryId: ID!, $first: Int, $after: String) {
		repository(id: $repositoryId) {
			...RepositoryDetails
			url
			reviews(first: $first, after: $after) {
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
					cursor
				}
				pageInfo {
					endCursor
					hasNextPage
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
