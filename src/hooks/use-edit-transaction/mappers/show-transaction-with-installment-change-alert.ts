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

const hasValueChanged = (partial: Partial<Transaction>, original: Transaction) =>
	partial?.value !== original?.value;

const hasInstallmentCountChanged = (partial: Partial<Transaction>, original: Transaction) =>
	partial?.totalInstallment !== original?.totalInstallment;

const showTransactionWithInstallmentChangeAlert = (
	id: string,
	partialPayload: Partial<Transaction>,
	originalTransaction: Transaction,
	onEdit: (
		id: string,
		partialPayload: Partial<Transaction>,
		isIsolatedEdit: boolean,
		shouldRedistributeValue: boolean
	) => Promise<void>
) => {
	const valueChanged = hasValueChanged(partialPayload, originalTransaction);
	const installmentChanged = hasInstallmentCountChanged(partialPayload, originalTransaction);

	Alert.alert(
		"Editar transação",
		"Esta transação tem vínculo. \n\nDeseja editar apenas esta parcela ou todas as parcelas deste lançamento?",
		[
			{
				text: "Apenas esta",
				style: "default",
				onPress: () => {
					if (valueChanged) {
						showValueChangeSingleAlert(() => onEdit(id, partialPayload, true, false));
					} else if (installmentChanged) {
						showInstallmentChangeAlert((divideValue) => onEdit(id, partialPayload, true, divideValue));
					} else {
						showBreakLinkAlert(() => onEdit(id, partialPayload, true, false));
					}
				}
			},
			{
				text: "Todas",
				style: "default",
				onPress: () => {
					if (valueChanged) {
						showValueChangeForAllInstallmentsAlert(() =>
							onEdit(id, partialPayload, false, true)
						);
					} else if (installmentChanged) {
						showInstallmentChangeAlert((divideValue) =>
							onEdit(id, partialPayload, false, divideValue)
						);
					} else {
						onEdit(id, partialPayload, false, false);
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
