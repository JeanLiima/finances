import { Text, View } from "react-native";
import { styles } from "./styles";
import { PropsWithChildren } from "react";

interface TermValueProps extends PropsWithChildren {
	term: string
}

const TermValue = ({
	term, 
	children
}: TermValueProps) => {
	const isPrimitive = typeof children === 'string' || typeof children === 'number';

	return (
		<View style={styles.container}>
			<Text style={styles.itemTerm}>{term}</Text>
			{isPrimitive ? (
        		<Text style={styles.itemValue}>{children}</Text>
			) : (
				children
			)}
		</View>
	);
};

export { TermValue };
