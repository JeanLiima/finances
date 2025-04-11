import { useRef } from "react"
import { 
	View, 
	Text, 
	TouchableOpacity, 
	KeyboardAvoidingView, 
	Platform,
	ActivityIndicator,
	TextInput
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@/design-system/input";
import { Select } from "@/design-system/select";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { useTransactions } from "@/hooks/use-transactions";
import { TransactionTypeSelector } from "@/components/transaction-type-selection";
import { useRegisterTransaction } from "@/hooks/use-register-transaction";
import { useCategories } from "@/hooks/use-categories";
import { Loading } from "@/components/loading";

import { styles } from "./styles";

const RegisterTransaction = () => {
  	const valueRef = useRef<TextInput>(null);

	const { goBack } = useNavigation();

	const { 
		isLoadingRegister, 
		onConfirmRegister,
		description,
		onChangeDescription,
		amount,
		onChangeAmount,
		type,
		onChangeType,
		totalInstallment,
		onChangeTotalInstallment,
		categoryId,
		onChangeCategory,
		parentId,
		onChangeParentId,
	}= useRegisterTransaction();

	const {	isLoadingCategories, categories } = useCategories();

	const { isLoadingTransactions, transactions } = useTransactions();

	const isExpense = type === TRANSACTIONS_TYPES.EXPENSE;
	const isDisabled = description === '' || isNaN(parseFloat(amount)) || (isExpense && !categoryId);

	if (isLoadingTransactions || isLoadingCategories) {
		return (
			<Loading />
		);
	}

	return (
		<View style={styles.background}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<Input
					placeholder="Descrição"
					value={description}
					onChangeText={onChangeDescription}
					returnKeyType="next"
					onSubmitEditing={() => valueRef.current?.focus()}
				/>
				<Input
					placeholder="Valor"
					value={amount}
					onChangeText={onChangeAmount}
					keyboardType="numeric"
					returnKeyType="done"
					ref={valueRef}
					onSubmitEditing={onConfirmRegister}
				/>
				<TransactionTypeSelector value={type} onChange={onChangeType} />
				{isExpense && (
					<>
						<Select 
							value={categoryId} 
							onChangeValue={onChangeCategory}
							label="Categoria:"
							options={categories.map(({id, name}) => ({
								label: name,
								value: id
							}))}
							optional={false}
						/>
						<Select 
							value={parentId} 
							onChangeValue={onChangeParentId}
							label="Vínculo:"
							options={transactions.map(({id, description}) => ({
								label: description,
								value: id
							}))}
							optional={false}
						/>
					</>
				)}
				<Select 
					value={totalInstallment} 
					onChangeValue={onChangeTotalInstallment}
					label="Parcelamento: (Opcional)"
					options={Array.from({ length: 12 }, (_, i) => ({
						label: `${i + 1}x`,
						value: `${i + 1}`,
					}))}
				/>
				<TouchableOpacity
                    activeOpacity={0.8}
                    style={[
						styles.submitButton,
						isDisabled && styles.disabled
					]}
					disabled={isDisabled || isLoadingRegister}
                    onPress={onConfirmRegister}
                >
                    {isLoadingRegister ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (
                        <Text style={styles.submitButtonText}>
							Salvar
						</Text>
                    )}
                </TouchableOpacity>
				<TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.backButton}
                    onPress={goBack}
                >
                    {isLoadingRegister ? (
                        <ActivityIndicator size={20} color="#3b3dbf" />
                    ) : (
                        <Text style={styles.backButtonText}>
							Voltar
						</Text>
                    )}
                </TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
};

export { RegisterTransaction };
