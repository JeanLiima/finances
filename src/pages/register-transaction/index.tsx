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

import { useRegisterTransactions } from "./hooks/use-register-transaction";
import { styles } from "./styles";

const RegisterTransaction = () => {
  	const valueRef = useRef<TextInput>(null);

	const { goBack } = useNavigation();

	const { 
		isLoadingRegister, 
		onRegister,
		description,
		onChangeDescription,
		value,
		onChangeValue,
		type,
		onChangeType,
		numberOfInstallment,
		onChangeNumberOfInstallment,
	}= useRegisterTransactions();

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
						value={value}
						onChangeText={onChangeValue}
						keyboardType="numeric"
						returnKeyType="done"
						ref={valueRef}
						onSubmitEditing={onRegister}
					/>
				</View>
				<TransactionTypeSelector value={type} onChange={onChangeType} />
				<Select 
					value={numberOfInstallment} 
					onChangeValue={onChangeNumberOfInstallment}
					options={Array.from({ length: 12 }, (_, i) => ({
						label: `${i + 1}x`,
						value: `${i + 1}`,
					}))}
				/>
				<TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submitButton}
                    onPress={onRegister}
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
                        <ActivityIndicator size={20} color="#FFF" />
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
