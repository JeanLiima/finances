import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons'

import { Transaction } from "@/types/transaction";
import { useDeleteTransaction } from "@/hooks/use-delete-transaction";

import { styles } from "./styles";

interface SwipeOptionsProps {
	item: Transaction;
	rowMap: { [key: string]: any };
	onEdit: VoidFunction;
};

const SwipeOptions = ({ item, rowMap, onEdit }: SwipeOptionsProps) => {
	const {	onConfirmDelete } = useDeleteTransaction();

	const handleDelete = () => {
		rowMap?.[item.id]?.closeRow();
		onConfirmDelete(item);
	};
	const handleEdit = () => {
		rowMap?.[item.id]?.closeRow();
		onEdit?.();
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.editButton}
				onPress={handleEdit}
			>
				<Feather name="edit" size={24} color="#fff" />
			</TouchableOpacity>
			<TouchableOpacity
				style={styles.deleteButton}
				onPress={handleDelete}
			>
				<Feather name="trash-2" size={24} color="#fff" />
			</TouchableOpacity>
		</View>
	)
};

export { SwipeOptions };
