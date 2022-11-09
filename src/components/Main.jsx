import { StyleSheet, View } from "react-native";
import { Route, Routes, Navigate } from "react-router-native";

import AppBar from "./AppBar";
import RepositoryList from "./RepositoryList";
import SignIn from "./SignIn";
import ReviewForm from "./ReviewForm";
import SingleRepository from "./SingleRepository";
import SignUp from "./SignUp";

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		flexShrink: 1,
	},
});

const Main = () => {
	return (
		<View style={styles.container}>
			<AppBar />
			<Routes>
				<Route exact path="/" element={<RepositoryList />} />
				<Route path=":repositoryId" element={<SingleRepository />} />
				<Route path="/sign" element={<SignIn />} />
				<Route path="/signUp" element={<SignUp />} />
				<Route path="/reviewForm" element={<ReviewForm />} />
				<Route path="*" element={<Navigate to="/" replace />} />
			</Routes>
		</View>
	);
};

export default Main;
