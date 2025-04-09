import { 
	ActivityIndicator, 
	Text, 
	TouchableOpacity, 
	View 
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { REGISTER_TRANSACTION } from "@/constants/routes";

import { useAnalysisTransactions } from "./hooks/use-analysis-transactions";
import { styles } from "./styles";

const TransactionAnalysis = () => {
	const hasTransactions = true;

	const { navigate } = useNavigation();
	const { 
		isLoadingAnalysisTransactions, 
		totalPaidTransactions 
	} = useAnalysisTransactions();

	if (isLoadingAnalysisTransactions) {
			return (
				<View
					style={{
						flex: 1,
						justifyContent: 'center',
						alignItems: 'center',
						backgroundColor: '#F0F4FF',
					}}
				>
					<ActivityIndicator size="large" color="#131313" />
				</View>
			);
		}

	return (
		<View style={styles.container}>
			{hasTransactions ? (
				<Text>
					{totalPaidTransactions}
				</Text>
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
						Não há transações registradas.
					</Text>
					<TouchableOpacity 
						onPress={() => navigate(REGISTER_TRANSACTION as never)} 
						style={styles.emptyButton}
					>
						<Text style={styles.emptyButtonText}>
							Cadastre agora
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export { TransactionAnalysis };
