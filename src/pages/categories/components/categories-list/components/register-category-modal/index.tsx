import { useState } from "react";
import { 
	Modal, 
	Text, 
	TouchableOpacity, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"

import { Input } from "@/design-system/input";

import { styles } from "./styles";

interface RegisterCategoryModalProps {
	isOpen?: boolean,
	onSubmit: (newName: string) => void,
	onClose: VoidFunction
}

const RegisterCategoryModal = ({ isOpen = false, onClose, onSubmit }: RegisterCategoryModalProps) => {
	const [name, setName] = useState<string>('');

	const isDisabled = name?.trim()?.length === 0;

	const handleSubmit = () => {
		onSubmit(name);
		onClose();
	};

	return (
		<Modal visible={isOpen} animationType="fade" transparent>
			<TouchableWithoutFeedback onPress={onClose}>
				<View style={styles.container}>
					<TouchableWithoutFeedback>
						<View style={styles.modalContent}>
							<Input
								label="Nome"
								placeholder="Nome"
								value={name}
								onChangeText={setName}
								returnKeyType="next"
							/>
							<TouchableOpacity
								activeOpacity={0.8}
								style={[
									styles.submitButton,
									isDisabled && styles.disabled
								]}
								disabled={isDisabled}
								onPress={handleSubmit}
							>
								<Text style={styles.submitButtonText}>
									Salvar
								</Text>
							</TouchableOpacity>
						</View>
					</TouchableWithoutFeedback>
				</View>
			</TouchableWithoutFeedback>
		</Modal>
	)
};

export { RegisterCategoryModal }
