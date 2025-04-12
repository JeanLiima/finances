import { TouchableOpacity, View } from "react-native";
import { NavigationProp, RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import { Feather } from "@expo/vector-icons";

import { REGISTER_TRANSACTION, RootStackParamList, TRANSACTIONS, TRANSACTIONS_ANALYSIS } from "@/constants/routes";

import { styles } from "./styles";

interface TransactionsFooterButtonsProps {
	yearMonth?: string,
	onlyAddButton?: boolean
}

const TransactionsFooterButtons = ({ yearMonth, onlyAddButton = false }: TransactionsFooterButtonsProps) => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
	const route = useRoute<RouteProp<RootStackParamList>>();

	const onNew = async () => {
		navigate(REGISTER_TRANSACTION, {
			yearMonth: yearMonth,
		});
	};

	return (
		<View style={styles.container}>
			{!onlyAddButton && (
				<TouchableOpacity
					onPress={() => navigate(route.name === TRANSACTIONS ? TRANSACTIONS_ANALYSIS : TRANSACTIONS)}
					style={styles.addButton}
					>
					<Feather name={route.name === TRANSACTIONS ? "bar-chart" : "list"} size={24} color="#fff" />
				</TouchableOpacity>
			)}
			<TouchableOpacity
				onPress={onNew}
				style={styles.addButton}
			>
				<Feather name="plus" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	);
};

export { TransactionsFooterButtons };
