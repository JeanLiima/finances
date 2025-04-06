import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { styles } from "./styles";

const TransactionDetails = () => {
	const { goBack } = useNavigation();

	return (
		<View style={styles.container}>
			<TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backButton}
                    onPress={goBack}
            >
				<Text style={styles.backButtonText}>
					Voltar
				</Text>
            </TouchableOpacity>
		</View>
	);
};

export { TransactionDetails };
