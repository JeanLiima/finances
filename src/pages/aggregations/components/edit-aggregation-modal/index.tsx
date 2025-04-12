import { useEffect, useState } from "react";
import { 
	Modal, 
	Text, 
	TouchableOpacity, 
	TouchableWithoutFeedback, 
	View 
} from "react-native"

import { Aggregation } from "@/types/aggregation";
import { Input } from "@/design-system/input";

import { styles } from "./styles";

interface EditAggregationModalProps {
	data: Aggregation | null,
	onSubmit: (id: string, newName: string) => void,
	onClose: VoidFunction
}

const EditAggregationModal = ({ data, onClose, onSubmit }: EditAggregationModalProps) => {
	const [name, setName] = useState<string>(data?.name ?? '');

	useEffect(() => {
		if(data) {
			setName(data.name);
		}
	}, [data])

	const isDisabled = name?.trim()?.length === 0;

	const handleSubmit = () => {
		if(!data?.id) return onClose();
		onSubmit(data.id, name);
		onClose();
	};

	return (
		<Modal visible={!!data} animationType="fade" transparent>
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

export { EditAggregationModal }
