import { TextInput, TextInputProps } from "react-native";

import { styles } from "./styles";
import { forwardRef } from "react";

const Input = forwardRef<TextInput, TextInputProps>((props: TextInputProps, ref) => (
	<TextInput
		style={styles.input}
		ref={ref}
		{...props}
	/>	
));

export { Input };
