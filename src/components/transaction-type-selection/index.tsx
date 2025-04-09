import { Keyboard, Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

import { styles } from "./styles";

interface TypeButtonProps {
	label: string;
	selected: boolean;
	onPress: () => void;
	icon: keyof typeof Feather.glyphMap;
	color: string;
}

const TypeButton = ({ label, selected, onPress, icon, color }: TypeButtonProps) => (
	<TouchableOpacity
		style={[
			styles.button,
			{
				backgroundColor: selected ? `${color}20` : "#fff",
				borderColor: selected ? color : "#ccc",
			},
		]}
		onPress={onPress}
	>
		<Feather name={icon} size={20} color={selected ? color : "#ccc"} />
		<Text style={[styles.label, { color: selected ? color : "#ccc" }]}>{label}</Text>
	</TouchableOpacity>
);

interface TransactionTypeSelectorProps {
	value: TRANSACTIONS_TYPES;
	onChange: (value: TRANSACTIONS_TYPES) => void;
}

const TransactionTypeSelector = ({ value, onChange }: TransactionTypeSelectorProps) => {

	const handleChange = (type: TRANSACTIONS_TYPES) => {
		Keyboard.dismiss();
		onChange(type);
	};

	return (
		<View style={styles.container}>
			<TypeButton
				label="Entrada"
				selected={value === TRANSACTIONS_TYPES.INCOME}
				onPress={() => handleChange(TRANSACTIONS_TYPES.INCOME)}
				icon="arrow-down-circle"
				color="#12A454"
			/>
			<TypeButton
				label="Saída"
				selected={value === TRANSACTIONS_TYPES.EXPENSE}
				onPress={() => handleChange(TRANSACTIONS_TYPES.EXPENSE)}
				icon="arrow-up-circle"
				color="#E83F5B"
			/>
		</View>
	);
};

export { TransactionTypeSelector };
