import { TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";
import { forwardRef } from "react";

const Input = forwardRef<TextInput, TextInputProps>((props: TextInputProps, ref) => (
	<View style={styles.container}>
		<TextInput
			style={styles.input}
			ref={ref}
			{...props}
		/>	
	</View>
));

export { Input };
