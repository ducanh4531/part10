import { gql } from "@apollo/client";

export const ALL_REPOSITORIES = gql`
	query {
		repositories {
			edges {
				node {
					fullName
					ratingAverage
					stargazersCount
					reviewCount
					forksCount
					ownerAvatarUrl
					language
					description
				}
			}
		}
	}
`;

export const ME = gql`
	query {
		me {
			username
		}
	}
`;
