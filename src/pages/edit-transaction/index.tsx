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
import { TransactionTypeSelector } from "@/components/transaction-type-selection";
import { useEditTransactions } from "@/hooks/use-edit-transaction";
import { useCategories } from "@/hooks/use-categories";

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
		isLoadingSubmitting
	} = useEditTransactions();

	const {
		categories
	} = useCategories();

	const isDisabled = description === '' || isNaN(parseFloat(amount)) || !categoryId

	if (isLoadingEdit) {
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
					onSubmitEditing={onConfirmeEdit}
				/>
				<TransactionTypeSelector value={type} onChange={onChangeType} />
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
			</KeyboardAvoidingView>
		</View>
	)
};

export { EditTransaction };
