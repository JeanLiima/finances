import { Feather } from "@expo/vector-icons";
import { Text, View } from "react-native"
import * as Animatable from 'react-native-animatable';

import { styles } from "./styles";

const EmptyTransactionState = () => (
	<View style={styles.emptyContainer}>
		<View style={styles.emptyTextContent}>
			<Text style={styles.emptyText}>
				Nenhuma transação encontrada neste período.
			</Text>
			<Text style={styles.emptyText}>
				Toque no botão <Text style={{ fontWeight: 'bold' }}>+</Text> abaixo para adicionar sua primeira transação.
			</Text>
		</View>
		<Animatable.View
			animation="bounce"
			iterationCount="infinite"
			duration={1500}
			style={{ marginTop: 16}}
		>
			<Feather style={{ textAlign: "center" }} name="arrow-down" size={60} color="#ccc"  />
		</Animatable.View>
	</View>
);

export { EmptyTransactionState };
