import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useCreateReview from "../hooks/useCreateReview";

const validationSchema = yup.object().shape({
	ownerName: yup
		.string()
		.lowercase()
		.required("Repository owner name is required"),
	repositoryName: yup
		.string()
		.lowercase()
		.required("Repository name is required"),
	rating: yup.number().min(0).max(100).required("Rating is required"),
	text: yup.string().max(2000),
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
	ownerName: "",
	repositoryName: "",
	rating: "",
	text: "",
};

const ReviewForm = ({ onSubmit }) => {
	return (
		<View style={styles.viewContainer}>
			<View style={styles.separate}>
				<FormikTextInput
					name="ownerName"
					placeholder="Repository owner name"
				/>
			</View>
			<View style={styles.separate}>
				<FormikTextInput
					name="repositoryName"
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
				<FormikTextInput
					name="text"
					placeholder="Review"
					multiline={true}
				/>
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
	const [createReview] = useCreateReview();
	const navigate = useNavigate();
	const onSubmit = async (values) => {
		const { repositoryName, rating, text, ownerName } = values;
		try {
			const { data } = await createReview({
				repositoryName,
				ownerName,
				rating: Number(rating),
				text,
			});
			navigate(`/${data.createReview.repositoryId}`);
		} catch (e) {
			console.log(
				"🚀 ~ file: ReviewForm.jsx ~ line 119 ~ onSubmit ~ e",
				e
			);
		}
	};

	return <ReviewFormContainer onSubmit={onSubmit} />;
};

export default Review;
