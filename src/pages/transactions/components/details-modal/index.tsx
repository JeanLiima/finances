import { 
	Modal, 
	Text, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"
import { format } from "date-fns";

import { TermValue } from "@/design-system/term-value";
import { formatCurrency } from "@/utils/format-currency";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { Transaction } from "@/types/transaction";

import { TransactionTypeBadge } from "./components/transaction-type-badge";
import { styles } from "./styles";
import { Divider } from "@/design-system/divider";

interface DetailsModalProps {
	data: Transaction | null,
	onClose: VoidFunction
}

const DetailsModal = ({ data, onClose }: DetailsModalProps) => {
	const isIncomeType = data?.type === TRANSACTIONS_TYPES.INCOME;
	
	const installmentValue = data?.numberOfInstallment ? data?.value / data?.numberOfInstallment : data?.value;
	const formattedValue = installmentValue ? formatCurrency(installmentValue) : undefined;
	const formattedCreatedAt = data?.createdAt ? format(data.createdAt.toDate(), 'dd/MM/yyyy - HH:mm:ss') : null;
	const formattedLastUpdatedAt = data?.lastUpdatedAt ? format(data.lastUpdatedAt.toDate(), 'dd/MM/yyyy - HH:mm:ss') : null;

	return (
		<Modal visible={!!data} animationType="fade" transparent={true}>
        	<View style={styles.container}>
				<TouchableWithoutFeedback onPress={onClose}>
				<View style={{ flex:1 }}></View>
				</TouchableWithoutFeedback>
				<View style={styles.modalContent}>
					{data?.type && <TransactionTypeBadge type={data.type} />}
					<Text style={styles.title}>Detalhes</Text>
					<Divider />
					<View style={styles.modalDescriptionContent}>
						<TermValue term={"Descrição: "}>{data?.description}</TermValue>
						{data?.numberOfInstallment && (
							<>
								<TermValue term={"Quantidade de vezes: "}>
									{data?.numberOfInstallment}
								</TermValue>
								<TermValue term={"Valor: "}>
									<Text
										style={[
											styles.valueText, {
												color: isIncomeType ? "#12A454" : "#E83F5B",
												fontWeight: 'bold' 
											}
										]}
										>
										{!isIncomeType && " -"} R$ {formattedValue}
									</Text>
								</TermValue>
							</>
						)}
						<TermValue term={data?.numberOfInstallment ? "Valor total:" : "Valor:"}>
							<Text 
								style={[
									styles.valueText, {
										color: isIncomeType ? "#12A454" : "#E83F5B",
										fontWeight: 'bold' 
									}
								]}
								>
								{!isIncomeType && " -"} R$ {data?.numberOfInstallment && data?.value ? formatCurrency(data.value) : formattedValue}
							</Text>
						</TermValue>
					</View>
					<Divider />
					<TermValue term={"Criado: "}>{formattedCreatedAt}</TermValue>
					{formattedLastUpdatedAt && (<TermValue term={"Última atualização: "}>{formattedLastUpdatedAt}</TermValue>)}
				</View>
    		</View>
      </Modal>
	)
};

export { DetailsModal }
