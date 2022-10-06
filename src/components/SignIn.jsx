import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
	username: yup.string().required("Username is required"),
	password: yup.string().required("Password is required"),
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
	password: "",
};

const SignInForm = ({ onSubmit }) => {
	return (
		<View style={styles.viewContainer}>
			<View style={styles.separate}>
				<FormikTextInput name="username" placeholder="Username" />
			</View>
			<View style={styles.separate}>
				<FormikTextInput
					name="password"
					placeholder="Password"
					secureTextEntry={true}
				/>
			</View>
			<View style={styles.separate}>
				<Pressable onPress={onSubmit}>
					<Text style={[theme.fonts.fontFamily, styles.textInLogin]}>
						Sign in
					</Text>
				</Pressable>
			</View>
		</View>
	);
};

const SignIn = () => {
	const [signIn] = useSignIn();
	// const [signIn, result] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signIn({ username, password });
			// await signIn({ username, password });
			navigate("/", { replace: true });
			console.log(
				"🚀 ~ file: SignIn.jsx ~ line 75 ~ onSubmit ~ data.authenticate.accessToken",
				data.authenticate.accessToken
			);
		} catch (e) {
			console.log("🚀 ~ file: SignIn.jsx ~ line 76 ~ onSubmit ~ e", e);
		}
	};

	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <SignInForm onSubmit={handleSubmit} />}
		</Formik>
	);
};

export default SignIn;
