import { TouchableOpacity, View } from "react-native";
import { Feather } from '@expo/vector-icons';
import { styles } from "./styles";

interface SwipeOptionsProps {
	itemId: string,
	rowMap: { [key: string]: any },
	onEdit: VoidFunction,
	onDelete: VoidFunction
}

const SwipeOptions = ({
	itemId,
	rowMap,
	onEdit,
	onDelete,
}: SwipeOptionsProps) => {
	const handleDelete = () => {
		rowMap?.[itemId]?.closeRow();
		onDelete();
	};

	const handleEdit = () => {
		rowMap?.[itemId]?.closeRow();
		onEdit();
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
	);
};

export { SwipeOptions };
