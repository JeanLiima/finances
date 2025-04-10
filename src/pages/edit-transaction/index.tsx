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
		isLoadingSubmitting
	} = useEditTransactions();

	const isDisabled = description === '' || isNaN(parseFloat(amount))

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
				<View style={styles.areaInput}>
					<Input
						placeholder="Descrição"
						value={description}
						onChangeText={onChangeDescription}
						returnKeyType="next"
						onSubmitEditing={() => valueRef.current?.focus()}
					/>
				</View>
				<View style={styles.areaInput}>
					<Input
						placeholder="Valor"
						value={amount}
						onChangeText={onChangeAmount}
						keyboardType="numeric"
						returnKeyType="done"
						ref={valueRef}
						onSubmitEditing={onConfirmeEdit}
					/>
				</View>
				<TransactionTypeSelector value={type} onChange={onChangeType} />
				<Select 
					value={totalInstallment} 
					onChangeValue={onChangeTotalInstallment}
					options={Array.from({ length: 12 }, (_, i) => ({
						label: `${i + 1}x`,
						value: `${i + 1}`,
					}))}
					label="Escolha o parcelamento: (Opcional)"
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
