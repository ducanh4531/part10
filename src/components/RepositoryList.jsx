/* eslint-disable no-mixed-spaces-and-tabs */
import { FlatList, View, StyleSheet, Pressable } from "react-native";
import { useNavigate, useParams, Link } from "react-router-native";
import { Picker } from "@react-native-picker/picker";
import { useState } from "react";

import RepositoryItem from "./RepositoryItem";
import theme from "../theme";
import useRepositories from "../hooks/useRepositories";

export const separatorStyles = StyleSheet.create({
	separator: {
		backgroundColor: theme.colors.mainBackground,
		height: 15,
	},
});

// const repositories = [
// 	{
// 		id: "jaredpalmer.formik",
// 		fullName: "jaredpalmer/formik",
// 		description: "Build forms in React, without the tears",
// 		language: "TypeScript",
// 		forksCount: 1589,
// 		stargazersCount: 21553,
// 		ratingAverage: 88,
// 		reviewCount: 4,
// 		ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/4060187?v=4",
// 	},
// 	{
// 		id: "rails.rails",
// 		fullName: "rails/rails",
// 		description: "Ruby on Rails",
// 		language: "Ruby",
// 		forksCount: 18349,
// 		stargazersCount: 45377,
// 		ratingAverage: 100,
// 		reviewCount: 2,
// 		ownerAvatarUrl: "https://avatars1.githubusercontent.com/u/4223?v=4",
// 	},
// 	{
// 		id: "django.django",
// 		fullName: "django/django",
// 		description: "The Web framework for perfectionists with deadlines.",
// 		language: "Python",
// 		forksCount: 21015,
// 		stargazersCount: 48496,
// 		ratingAverage: 73,
// 		reviewCount: 5,
// 		ownerAvatarUrl: "https://avatars2.githubusercontent.com/u/27804?v=4",
// 	},
// 	{
// 		id: "reduxjs.redux",
// 		fullName: "reduxjs/redux",
// 		description: "Predictable state container for JavaScript apps",
// 		language: "TypeScript",
// 		forksCount: 13902,
// 		stargazersCount: 52869,
// 		ratingAverage: 0,
// 		reviewCount: 0,
// 		ownerAvatarUrl: "https://avatars3.githubusercontent.com/u/13142323?v=4",
// 	},
// ];

export const ItemSeparator = () => <View style={separatorStyles.separator} />;

export const RepositoryListContainer = ({
	principle,
	setPrinciple,
	repositories,
}) => {
	const repositoryNodes = repositories
		? repositories.edges.map((edge) => edge.node)
		: [];

	const navigate = useNavigate();
	const { repositoryId } = useParams();

	const handlePress = () => {
		navigate(`:${repositoryId}`);
	};

	return (
		<FlatList
			ListHeaderComponent={() => {
				return (
					<Picker
						selectedValue={principle}
						onValueChange={(itemValue) => {
							return itemValue === "CREATED_AT"
								? setPrinciple({ orderBy: itemValue })
								: setPrinciple({
										orderBy: "RATING_AVERAGE",
										orderDirection: itemValue,
								  });
						}}
					>
						<Picker.Item
							label="Latest repositories"
							value="CREATED_AT"
						/>
						<Picker.Item
							label="Highest rated repositories"
							value="DESC"
						/>
						<Picker.Item
							label="Lowest rated repositories"
							value="ASC"
						/>
					</Picker>
				);
			}}
			data={repositoryNodes}
			ItemSeparatorComponent={ItemSeparator}
			keyExtractor={(item, index) => index.toString()}
			renderItem={({ item }) => (
				<Pressable onPress={handlePress}>
					<Link to={`${item.id}`}>
						<RepositoryItem item={item} />
					</Link>
				</Pressable>
			)}
		/>
	);
};

const RepositoryList = () => {
	const [principle, setPrinciple] = useState({});

	const { data, loading } = useRepositories(principle);

	if (loading) {
		return null;
	}

	return (
		<RepositoryListContainer
			principle={principle}
			setPrinciple={setPrinciple}
			repositories={data.repositories}
		/>
	);
};

export default RepositoryList;
