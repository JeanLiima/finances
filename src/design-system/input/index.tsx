import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

type InputProps = { 
	label?: string 
} & TextInputProps

const Input = forwardRef<TextInput, InputProps>(({ label, ...props }: InputProps, ref) => (
	<View style={styles.container}>
		{ label && (
			<Text style={styles.label}>
				{label}
			</Text> 
		)}
		<TextInput
			style={styles.input}
			ref={ref}
			{...props}
		/>	
	</View>
));

export { Input };
