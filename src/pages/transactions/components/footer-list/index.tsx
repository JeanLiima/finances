import { Text, TouchableOpacity, View } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { REGISTER_TRANSACTION } from "@/constants/routes";

import { styles } from "./styles";

const FooterList = () => {
	const { navigate } = useNavigation();

	return (
		<View style={styles.container}>
			{/* <Text style={styles.totalText}>Total: </Text> */}
			<TouchableOpacity
				onPress={() => navigate(REGISTER_TRANSACTION as never)}
				style={styles.addButton}
			>
				<Feather name="plus" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export { FooterList };
