import { StyleSheet, View } from "react-native";
import { useField } from "formik";

import TextInput from "./TextInput";
import Text from "./Text";
import theme from "../theme";

const styles = StyleSheet.create({
	errorText: {
		marginTop: 5,
		color: theme.colors.red,
	},
	correctText: {
		padding: 15,
		marginBottom: 5,
		borderWidth: 1,
		borderColor: "#bbb",
		borderRadius: 5,
		height: 50,
		width: 350,
	},
	errorBorder: {
		borderWidth: 1,
		borderColor: theme.colors.red,
	},
});

const FormikTextInput = ({ name, ...props }) => {
	const [field, meta, helpers] = useField(name);
	const showError = meta.touched && meta.error;

	let changeBorder = styles.correctText;

	if (showError) {
		changeBorder = [styles.correctText, styles.errorBorder];
	}
	return (
		<>
			<View>
				<TextInput
					onChangeText={(value) => helpers.setValue(value)}
					onBlur={() => helpers.setTouched(true)}
					value={field.value}
					error={showError}
					style={changeBorder}
					{...props}
				/>
			</View>
			{showError && <Text style={styles.errorText}>{meta.error}</Text>}
		</>
	);
};

export default FormikTextInput;
