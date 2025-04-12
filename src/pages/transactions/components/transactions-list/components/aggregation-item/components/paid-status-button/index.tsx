import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { PAID_STATUS } from "@/constants/paid-status";
import { usePaidStatus } from "@/pages/transactions/hooks/use-paid-status";

import { styles } from "./styles";
import { Transaction } from "@/types/transaction";

interface PaidStatusButtonProps {
	items: Transaction[],
	status: PAID_STATUS
};

const PaidStatusButton = ({ items, status }:PaidStatusButtonProps) => {
	const { onChangePaidStatusBulk } = usePaidStatus();

	const onPaidChange = () => {
		onChangePaidStatusBulk(
			items,
			status === PAID_STATUS.PAID ? PAID_STATUS.UNPAID : PAID_STATUS.PAID
		);
	};

	const isPaid = status === PAID_STATUS.PAID;

	return (
		<TouchableOpacity
			style={[styles.paidButton, isPaid ? styles.paid : styles.unpaid]}
			onPress={onPaidChange}
		>
			<Feather name={isPaid ? 'check-circle' : 'alert-circle'} size={24} color="#fff" />
		</TouchableOpacity>
	)
};

export { PaidStatusButton };
