import { View, Pressable } from "react-native";
import { Formik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-native";

import Text from "./Text";
import FormikTextInput from "./FormikTextInput";
import theme from "../theme";
import useSignUp from "../hooks/useSignUp";
import useSignIn from "../hooks/useSignIn";

const validationSchema = yup.object().shape({
	username: yup.string().min(1).max(30).required("Username is required"),
	password: yup.string().min(5).max(50).required("Password is required"),
	passwordConfirm: yup
		.string()
		.oneOf([yup.ref("password"), null])
		.required("Password confirm is required"),
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

const SignUpForm = ({ onSubmit }) => {
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
				<FormikTextInput
					name="passwordConfirm"
					placeholder="Password confirmation"
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

export const SignUpContainer = ({ onSubmit }) => {
	return (
		<Formik
			validationSchema={validationSchema}
			initialValues={initialValues}
			onSubmit={onSubmit}
		>
			{({ handleSubmit }) => <SignUpForm onSubmit={handleSubmit} />}
		</Formik>
	);
};
const SignUp = () => {
	const [signUp] = useSignUp();
	const [signIn] = useSignIn();
	const navigate = useNavigate();

	const onSubmit = async (values) => {
		const { username, password } = values;

		try {
			const { data } = await signUp({ username, password });
			console.log(
				"🚀 ~ file: SignUp.jsx ~ line 98 ~ onSubmit ~ data",
				data
			);
			const { data: logInData } = await signIn({ username, password });
			console.log(
				"🚀 ~ file: SignUp.jsx ~ line 100 ~ onSubmit ~ logInData",
				logInData
			);
			navigate("/", { replace: true });
		} catch (e) {
			console.log("🚀 ~ file: SignUp.jsx ~ line 99 ~ onSubmit ~ e", e);
		}
	};

	return <SignUpContainer onSubmit={onSubmit} />;
};

export default SignUp;
