import { Text, TouchableOpacity, View } from "react-native";

import { Transaction } from "@/types/transaction";

import { styles } from "./styles";

interface HeaderListProps {
	onSort: (column: keyof Transaction) => void
}

const HeaderList = ({ onSort }: HeaderListProps) => (
	<View style={styles.container}>
		<TouchableOpacity onPress={() => onSort('status')}>
			<Text style={styles.item}>Status</Text>
		</TouchableOpacity>
		<TouchableOpacity onPress={() => onSort('type')}>
			<Text style={styles.item}>Tipo</Text>
		</TouchableOpacity>
		<View style={styles.content}>
			<TouchableOpacity onPress={() => onSort('description')}>
				<Text style={styles.item}>Descrição</Text>
			</TouchableOpacity>
			<TouchableOpacity onPress={() => onSort('value')}>
				<Text style={styles.item}>Valor</Text>
			</TouchableOpacity>
		</View>
	</View>
);

export { HeaderList };
