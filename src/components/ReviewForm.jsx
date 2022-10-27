import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
// import { useNavigate } from "react-router-native";

import Text from ".Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";

const validationSchema = yup.object().shape({
	username: yup.string().required("Repository owner name is required"),
	fullName: yup.string().required("Repository name is required"),
	rating: yup.number().min(0).max(100).required("Rating is required"),
	review: yup.string(),
});

const styles = {
	viewContainer: {
		display: "flex",
		alignItems: "center",
	},
	login: {
		display: "flex",
	},
	textInLogin: {
		color: theme.colors.white,
		fontWeight: theme.fontWeights.bold,
		backgroundColor: theme.colors.primary,
		width: 350,
		height: 45,
		textAlign: "center",
	},
	separate: {
		marginTop: 30,
	},
};
const initialValues = {
	username: "",
	fullName: "",
	rating: "",
	review: "",
};

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.viewContainer}>
			<View style={styles.separate}>
				<FormikTextInput
					name="username"
					placeholder="Repository owner name"
				/>
			</View>
			<View style={styles.separate}>
				<FormikTextInput
					name="fullName"
					placeholder="Repository name"
				/>
			</View>
			<View style={styles.separate}>
				<FormikTextInput
					name="rating"
					placeholder="Rating between 0 and 100"
				/>
			</View>
			<View style={styles.separate}>
				<FormikTextInput name="review" placeholder="Review" />
			</View>
			<View style={styles.separate}>
				<Pressable onPress={onSubmit}>
					<Text style={[theme.fonts.fontFamily, styles.textInLogin]}>
						Create a review
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

const ReviewFormContainer = ({ onSubmit }) => {
	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <ReviewForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

const Review = () => {
	const onSubmit = async () => {
		console.log("hello");
	};

	return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default Review;
