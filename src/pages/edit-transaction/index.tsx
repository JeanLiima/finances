import { useRef } from "react"
import { 
	View, 
	Text, 
	TouchableOpacity, 
	KeyboardAvoidingView, 
	Platform,
	ActivityIndicator,
	TextInput,
	Keyboard
} from "react-native";
import { useNavigation } from "@react-navigation/native";

import { Input } from "@/design-system/input";
import { Select } from "@/design-system/select";
import { Loading } from "@/components/loading";
import { TransactionTypeSelector } from "@/components/transaction-type-selection";
import { useEditTransaction } from "@/hooks/use-edit-transaction";
import { useCategories } from "@/hooks/use-categories";
import { useAggregations } from "@/hooks/use-aggregations";
import { TRANSACTIONS_TYPES } from "@/constants/transaction-types";
import { CurrencyInput } from "@/components/currency-input";

import { styles } from "./styles";

const EditTransaction = () => {
  	const valueRef = useRef<TextInput>(null);

	const { goBack } = useNavigation();

	const { 
		isLoadingEdit, 
		onConfirmeEdit,
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
		isLoadingSubmitting,
		aggregationId,
		onChangeAggregation
	} = useEditTransaction();

	const { isLoadingCategories, categories } = useCategories();
	const { isLoadingAggregations, aggregations } = useAggregations();

	const isExpense = type === TRANSACTIONS_TYPES.EXPENSE;
	const isDisabled = description === '' || isNaN(parseFloat(amount)) || (isExpense && !categoryId);

	if (isLoadingEdit || isLoadingCategories || isLoadingAggregations) {
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
				<View style={styles.form}>
					<Input
						placeholder="Descrição"
						value={description}
						onChangeText={onChangeDescription}
						returnKeyType="next"
						onSubmitEditing={() => valueRef.current?.focus()}
					/>
					<CurrencyInput
						placeholder="Valor"
						value={amount}
						onChangeText={onChangeAmount}
						returnKeyType="done"
						ref={valueRef}
						onSubmitEditing={() => Keyboard.dismiss()}
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
							/>
							<Select 
								value={aggregationId} 
								onChangeValue={onChangeAggregation}
								label="Agrupamento: (Opcional)"
								options={aggregations.map(({id, name}) => ({
									label: name,
									value: id
								}))}
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
				</View>
				<View style={styles.buttonsContent}>
					<TouchableOpacity
						activeOpacity={0.8}
						style={[
							styles.submitButton,
							isDisabled && styles.disabled
						]}
						onPress={onConfirmeEdit}
						disabled={isDisabled || isLoadingSubmitting}
						>
						{isLoadingSubmitting ? (
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
						{isLoadingSubmitting ? (
							<ActivityIndicator size={20} color="#3b3dbf" />
						) : (
							<Text style={styles.backButtonText}>
								Voltar
							</Text>
						)}
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</View>
	)
};

export { EditTransaction };
