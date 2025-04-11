import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

type FooterProps = {
	isDisabled: boolean,
	onBack: VoidFunction,
	onNext: VoidFunction
}

const Footer = ({ isDisabled, onBack, onNext }: FooterProps) => {
	return (
		<View style={styles.footer}>
			<TouchableOpacity
				style={[styles.nextButton,isDisabled && styles.disabled]}
				onPress={onNext}
				disabled={isDisabled}
			>
				<Text style={styles.nextButtonText}>
					Próximo
				</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				onPress={onBack} 
				style={styles.backButton}
			>
				<Text style={styles.backButtonText}>
					Voltar
				</Text>
			</TouchableOpacity>
		</View>
	);
};

export { Footer };
