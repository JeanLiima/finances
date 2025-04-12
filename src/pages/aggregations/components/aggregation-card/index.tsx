import { Text, View } from "react-native";

import { Aggregation } from "@/types/aggregation";

import { styles } from "./styles";

type AggregationCardProps = {
	aggregation: Aggregation
};

const AggregationCard = ({ aggregation }: AggregationCardProps) => (
	<View style={styles.card} >
		<Text style={styles.label}>{aggregation.name}</Text>
	</View>
);

export { AggregationCard };
