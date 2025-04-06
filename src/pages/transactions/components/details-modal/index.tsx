import { 
	Modal, 
	Text, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"

import { formatCurrency } from "@/utils/format-currency";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";

import { Transaction } from "../../hooks/use-transactions";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

interface DetailsModalProps {
	data: Transaction | null,
	onClose: VoidFunction
}

const DetailsModal = ({ data, onClose }: DetailsModalProps) => {
	const isIncomeType = data?.type === TRANSACTIONS_TYPES.INCOME;
	const formattedValue = data?.value ? formatCurrency(data?.value) : undefined;

	return (
		<Modal visible={!!data} animationType="fade" transparent={true}>
        	<View style={styles.container}>
				<TouchableWithoutFeedback onPress={onClose}>
				<View style={{ flex:1 }}></View>
				</TouchableWithoutFeedback>
				<View style={styles.modalContent}>
					<Text style={styles.title}>Detalhes</Text>
					<Text style={styles.item}>Descrição: {data?.description}</Text>
					<View style={styles.line}>
						<View style={styles.column}>
							<Text style={styles.item}>Valor:
								<Text 
									style={[styles.item, {
										color: isIncomeType ? "#12A454" : "#E83F5B",
										fontWeight: 'bold' 
									}]}
									>
									{!isIncomeType && " -"} R$ {formattedValue}
								</Text>
							</Text>
						</View>
						<View style={styles.column}>
							<View style={[styles.type,{
								borderColor: isIncomeType ? "#12A454" : "#E83F5B",
								backgroundColor: isIncomeType ? "#12A45420" : "#E83F5B20",
							}]}>
								<Feather
									name={isIncomeType ? "arrow-down-circle" : "arrow-up-circle"} 
									size={20} 
									color={isIncomeType ? "#12A454" : "#E83F5B"} 
								/>
								<Text style={[styles.item, {
									color: isIncomeType ? "#12A454" : "#E83F5B"
								}]}>
									{isIncomeType ? "Entrada" : "Saída"}
								</Text>
							</View>
						</View>
					</View>
				</View>
    		</View>
      </Modal>
	)
};

export { DetailsModal }
