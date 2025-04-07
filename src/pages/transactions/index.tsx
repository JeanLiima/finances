import { useState } from "react";
import { SwipeListView } from "react-native-swipe-list-view";
import { View, Text, Alert, ActivityIndicator } from "react-native";
import { Feather } from "@expo/vector-icons";
import * as Animatable from 'react-native-animatable';

import { MonthlyCarousel } from "@/components/monthly-carousel";
import { Transaction } from "@/types/transaction";

import { useTransactions } from "./hooks/use-transactions";
import { TransactionItem } from "./components/transaction-item";
import { SwipeOptions } from "./components/swipe-options";
import { HeaderList } from "./components/header-list";
import { FooterList } from "./components/footer-list";
import { DetailsModal } from "./components/details-modal";

import { styles } from "./styles";

const Transactions = () => {
	const [transaction, setTransaction] = useState<Transaction | null>(null);

	const {
		isLoadingTransactions,
		transactions, 
		onDelete, 
		onEdit,
		onSort,
		onSelectYearMonth
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
				<>
					<MonthlyCarousel onSelect={onSelectYearMonth}/>
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
						</>
					) : (
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
					)}
					<FooterList />
					<DetailsModal 
						data={transaction} 
						onClose={() => setTransaction(null)}
					/>
				</>
		</View>
	)
};

export { Transactions };
