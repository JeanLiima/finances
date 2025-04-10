import { Text, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type AllocationCardProps = {
	category: { id: string; name: string },
	percentage: number,
	disabledAdd: boolean,
	disabledRemove: boolean,
	onChange: (id: string, delta: number) => void
};

const AllocationCard = ({
	category,
	percentage,
	disabledAdd,
	disabledRemove,
	onChange,
}: AllocationCardProps) => (
	<View style={styles.card}>
		<Text style={styles.name} numberOfLines={1} >{category.name}</Text>

		<View style={styles.control}>
			<TouchableOpacity
				onPress={() => onChange(category.id, -5)}
				disabled={disabledRemove}
				style={[
					styles.button,
					disabledRemove && styles.disabledButton,
				]}
			>
				<Feather name="minus" size={16} color="#FFF" />
			</TouchableOpacity>
				<Text style={styles.percent}>{percentage}%</Text>

			<TouchableOpacity
				onPress={() => onChange(category.id, 5)}
				disabled={disabledAdd}
				style={[
					styles.button,
					disabledAdd && styles.disabledButton,
				]}
			>
				<Feather name="plus" size={16} color="#FFF" />
			</TouchableOpacity>
		</View>
	</View>
);

export { AllocationCard };
