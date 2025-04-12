import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";
import { Feather } from "@expo/vector-icons";

type AggregationCardProps = {
	onNew: VoidFunction
};

const NewAggregationCard = ({ onNew }: AggregationCardProps) => (
	<TouchableOpacity onPress={onNew}>
		<View style={styles.card} >
			<Feather name="plus" size={24} color="#333" />
			<Text style={styles.label}>Adicionar agrupamento</Text>
		</View>
	</TouchableOpacity>
);

export { NewAggregationCard };
