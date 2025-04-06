import { Text, TouchableOpacity, View } from "react-native";

import { Transaction } from "../../hooks/use-transactions";
import { styles } from "./styles";
import { useState } from "react";

interface HeaderListProps {
	onSort: (column: keyof Transaction) => void
}

const HeaderList = ({ onSort }: HeaderListProps) => {
	

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => onSort('status')}>
				<Text style={styles.item}>Status</Text>
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
	)
};

export { HeaderList };
