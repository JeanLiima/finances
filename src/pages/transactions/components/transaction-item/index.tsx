import { Text, View } from "react-native";

import { Transaction } from "../../hooks/use-transactions";

import { PaidStatusButton } from "./components/paid-status-button";
import { styles } from "./styles";

interface TransactionItemProps {
  data: Transaction
};

const TransactionItem = ({ data }: TransactionItemProps) => (
	<View style={styles.container}>
		<PaidStatusButton status={data.status} id={data.id} />
		<View style={styles.content}>
			<Text style={styles.item}>{data.description}</Text>
			<Text style={styles.item}>R$ {data.value.toString().replace('.', ',')}</Text>
		</View>
	</View>
);

export { TransactionItem };
