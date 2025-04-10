import { Text, TouchableOpacity, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type FooterProps = {
	total: number,
	onBack: () => void;
}

const Footer = ({ total, onBack }: FooterProps) => {
	return (
		<View style={styles.footer}>
			<View
				style={[
					styles.total,
					{
						backgroundColor: total === 100 ? "#E8F5E9" : "#FFF8E1"
					}
				]}
			>
				<Feather
					name={total === 100 ? "check-circle" : "alert-circle"}
					size={18}
					color={total === 100 ? "#4CAF50" : "#FFC107"}
					style={{ marginRight: 8 }}
				/>
				<Text
					style={[
						styles.totalText,
						{ color: total === 100 ? "#4CAF50" : "#FFC107" }
					]}
				>
					Total alocado: {total}%
				</Text>
			</View>
			<TouchableOpacity
				style={[
					styles.saveButton, 
					total !== 100 && styles.disabled
				]}
				disabled={total !== 100}
			>
				<Text style={styles.saveButtonText}>Salvar</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={onBack} style={styles.backButton}>
				<Text style={styles.backButtonText}>Voltar</Text>
			</TouchableOpacity>
		</View>
	);
};

export { Footer };
