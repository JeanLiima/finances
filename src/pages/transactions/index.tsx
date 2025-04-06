import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, TouchableOpacity, Alert } from "react-native";
import { Feather } from "@expo/vector-icons";

import { REGISTER_TRANSACTION } from "@/constants/routes";

import { useTransactions } from "./hooks/use-transactions";
import { TransactionItem } from "./components/transaction-item";
import { SwipeOptions } from "./components/swipe-options";
import { HeaderList } from "./components/header-list";

import { styles } from "./styles";
import { FooterList } from "./components/footer-list";

const Transactions = () => {
	const { navigate } = useNavigation();
	const { 
		transactions, 
		onDelete, 
		onEdit,
		onSort
	 } = useTransactions();

	const hasTransactions = transactions.length > 0;

	const handleDelete = (id: string, description: string) => {
		if(!id) return;
		Alert.alert(
			"Atenção",
			`Você tem certeza que deseja deletar o registro "${description}"?`,
			[
				{
					text: "OK",
					onPress: () => onDelete(id),
				},
				{
					text: "Cancelar",
					style: "cancel",
				},
			],
		);
	};

	return (
		<View style={styles.container}>
			{hasTransactions ? (
				<>
					<HeaderList onSort={onSort} />
					<SwipeListView
						style={styles.list}
						data={transactions}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TransactionItem data={item} />}
						renderHiddenItem={({ item }, rowMap) => (
							<SwipeOptions
								itemId={item.id}
   								rowMap={rowMap}
								onDelete={() => handleDelete(item.id, item.description)} 
								onEdit={() => onEdit(item.id)}
							/>
						)}
						swipeToOpenPercent={20}
						rightOpenValue={-190}
						leftOpenValue={-80}
						showsVerticalScrollIndicator={false}
					/>
					<FooterList />
				</>
			) : (
				<View style={styles.emptyContainer}>
					<Text style={styles.emptyText}>
						Não há transações registradas.
					</Text>
					<TouchableOpacity 
						onPress={() => navigate(REGISTER_TRANSACTION as never)} 
						style={styles.emptyButton}
					>
						<Text style={styles.emptyButtonText}>
							Cadastre agora
						</Text>
					</TouchableOpacity>
				</View>
			)}
		</View>
	)
};

export { Transactions };
