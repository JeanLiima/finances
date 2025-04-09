import { TouchableOpacity, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { REGISTER_TRANSACTION, RootStackParamList } from "@/constants/routes";

import { styles } from "./styles";

interface FooterListProps {
	yearMonth?: string
}

const AddTransactionFooterButton = ({ yearMonth }: FooterListProps) => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	const onNew = async () => {
		navigate(REGISTER_TRANSACTION, {
			yearMonth: yearMonth,
		} as RootStackParamList[typeof REGISTER_TRANSACTION]);
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				onPress={onNew}
				style={styles.addButton}
			>
				<Feather name="plus" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export { AddTransactionFooterButton };
