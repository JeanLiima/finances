import { Transaction } from "@/types/transaction";
import { Alert } from "react-native";

const showInstallmentChangeAlert = (onDecision: (divideValue: boolean) => void) =>
	Alert.alert(
		"Atenção",
		"Você alterou a quantidade de parcelas.\n\nDeseja dividir o valor total igualmente entre as parcelas?",
		[
			{ text: "Sim", onPress: () => onDecision(true) },
			{ text: "Não, manter valor atual por parcela", onPress: () => onDecision(false) },
			{ text: "Cancelar", style: "cancel" }
		]
	);

const showValueChangeForAllInstallmentsAlert = (onConfirm: VoidFunction) =>
	Alert.alert(
		"Atenção",
		"Você está editando o valor e aplicando em todas as parcelas.\n\nO novo valor será redistribuído entre elas.",
		[
			{ text: "Entendi", onPress: onConfirm },
			{ text: "Cancelar", style: "cancel" }
		]
	);

const showValueChangeSingleAlert = (onConfirm: VoidFunction) =>
	Alert.alert(
		"Atenção",
		"Você está editando o valor e aplicando somente para esta parcela.\n\nO novo valor não será redistribuído entre elas.",
		[
			{ text: "Entendi", onPress: onConfirm },
			{ text: "Cancelar", style: "cancel" }
		]
	);

const showBreakLinkAlert = (onConfirm: VoidFunction) =>
	Alert.alert(
		"Atenção",
		"Ao editar apenas esta parcela ela perderá o vínculo com as demais. \n\nDeseja continuar?",
		[
			{ text: "Continuar", onPress: onConfirm },
			{ text: "Cancelar", style: "cancel" }
		]
	);

const hasAmountChanged = (partial: Partial<Transaction>, original: Transaction) =>
	partial?.amount !== original?.amount;

const hasInstallmentCountChanged = (partial: Partial<Transaction>, original: Transaction) =>
	partial?.totalInstallment !== original?.totalInstallment;

type OnEditParams = {
	id: string;
	newPayload: Partial<Transaction>;
	oldPayload: Transaction;
	isIsolatedEdit?: boolean;
	shouldRedistributeValue?: boolean;
}
interface ShowTransactionWithInstallmentChangeAlertParams {
	id: string,
	newPayload: Partial<Transaction>,
	originalTransaction: Transaction,
	onEdit: (params: OnEditParams) => Promise<void>
}

const showTransactionWithInstallmentChangeAlert = ({
	id,
	newPayload,
	originalTransaction,
	onEdit
}: ShowTransactionWithInstallmentChangeAlertParams) => {
	const valueChanged = hasAmountChanged(newPayload, originalTransaction);
	const installmentChanged = hasInstallmentCountChanged(newPayload, originalTransaction);

	Alert.alert(
		"Editar transação",
		"Esta transação tem vínculo. \n\nDeseja editar apenas esta parcela ou todas as parcelas deste lançamento?",
		[
			{
				text: "Apenas esta",
				style: "default",
				onPress: () => {
					if (valueChanged) {
						showValueChangeSingleAlert(() => onEdit({ 
							id, 
							newPayload, 
							oldPayload: originalTransaction, 
							isIsolatedEdit: true
						}));
					} else if (installmentChanged) {
						showInstallmentChangeAlert((divideValue) => onEdit({ 
							id, 
							newPayload, 
							oldPayload: originalTransaction, 
							isIsolatedEdit: true, 
							shouldRedistributeValue: divideValue
						}));
					} else {
						showBreakLinkAlert(() => onEdit({
							id, 
							newPayload, 
							oldPayload: originalTransaction,
							isIsolatedEdit: true
						}));
					}
				}
			},
			{
				text: "Todas",
				style: "default",
				onPress: () => {
					if (valueChanged) {
						showValueChangeForAllInstallmentsAlert(() =>
							onEdit({
								id, 
								newPayload, 
								oldPayload: originalTransaction,
								shouldRedistributeValue: true
							})
						);
					} else if (installmentChanged) {
						showInstallmentChangeAlert((divideValue) =>
							onEdit({ 
								id, 
								newPayload, 
								oldPayload: originalTransaction, 
								shouldRedistributeValue: divideValue
							})
						);
					} else {
						onEdit({ 
							id, 
							newPayload, 
							oldPayload: originalTransaction
						});
					}
				}
			},
			{
				text: "Cancelar",
				style: "cancel"
			}
		],
		{ cancelable: true }
	);
};

export { showTransactionWithInstallmentChangeAlert };
