import { useNavigation } from "@react-navigation/native";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, TouchableOpacity, Alert, ActivityIndicator } from "react-native";

import { REGISTER_TRANSACTION } from "@/constants/routes";

import { Transaction, useTransactions } from "./hooks/use-transactions";
import { TransactionItem } from "./components/transaction-item";
import { SwipeOptions } from "./components/swipe-options";
import { HeaderList } from "./components/header-list";
import { FooterList } from "./components/footer-list";

import { styles } from "./styles";
import { DetailsModal } from "./components/details-modal";
import { useState } from "react";

const Transactions = () => {
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	const { navigate } = useNavigation();
	const {
		isLoadingTransactions,
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

	if (isLoadingTransactions) {
		return (
			<View
				style={{
					flex: 1,
					justifyContent: 'center',
					alignItems: 'center',
					backgroundColor: '#F0F4FF',
				}}
			>
				<ActivityIndicator size="large" color="#131313" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{hasTransactions ? (
				<>
					<HeaderList onSort={onSort} />
					<SwipeListView
						style={styles.list}
						data={transactions}
						keyExtractor={(item) => item.id}
						renderItem={({ item }) => <TransactionItem data={item} onViewDetails={() => setTransaction(item)} />}
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
					<DetailsModal 
						data={transaction} 
						onClose={() => setTransaction(null)}
					/>
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
