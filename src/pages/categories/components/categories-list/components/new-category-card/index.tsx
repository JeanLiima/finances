import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

type NewCategoryCardProps = {
	onNew: VoidFunction
};

const NewCategoryCard = ({ onNew }: NewCategoryCardProps) => (
	<TouchableOpacity onPress={onNew}>
		<View style={styles.card} >
			<Feather name="plus" size={24} color="#333" />
			<Text style={styles.label}>Adicionar agrupamento</Text>
		</View>
	</TouchableOpacity>
);

export { NewCategoryCard };
