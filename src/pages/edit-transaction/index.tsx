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
import { TransactionTypeSelector } from "@/components/transaction-type-selection";

import { useEditTransactions } from "./hooks/use-edit-transaction";
import { styles } from "./styles";

const EditTransaction = () => {
  	const valueRef = useRef<TextInput>(null);

	const { goBack } = useNavigation();

	const { 
		isLoadingEdit, 
		onEdit,
		description,
		onChangeDescription,
		value,
		onChangeValue,
		type,
		onChangeType,
	}= useEditTransactions();

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
						onSubmitEditing={onEdit}
					/>
				</View>
				<TransactionTypeSelector value={type} onChange={onChangeType} />
				<TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submitButton}
                    onPress={onEdit}
                >
                    {isLoadingEdit ? (
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
                    {isLoadingEdit ? (
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

export { EditTransaction };
