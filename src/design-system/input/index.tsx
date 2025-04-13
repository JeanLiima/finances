import { forwardRef } from "react";
import { Text, TextInput, TextInputProps, View } from "react-native";

import { styles } from "./styles";

type InputProps = { 
	label?: string,
	prefix?: string;
} & TextInputProps

const Input = forwardRef<TextInput, InputProps>(({ label,  prefix, ...props }: InputProps, ref) => (
	<View style={styles.container}>
		{label && <Text style={styles.label}>{label}</Text>}

		<View style={styles.inputWrapper}>
			{prefix && <Text style={styles.prefix}>{prefix}</Text>}
			<TextInput
				style={styles.input}
				ref={ref}
				{...props}
			/>
		</View>
	</View>
));

export { Input };
