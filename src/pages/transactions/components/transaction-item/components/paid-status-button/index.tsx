import { Feather } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";

import { PAID } from "@/constants/paid-status";
import { usePaidStatus } from "@/pages/transactions/hooks/use-paid-status";

import { styles } from "./styles";

interface PaidStatusButtonProps {
	status: PAID,
	id: string,
};

const PaidStatusButton = ({ status, id }:PaidStatusButtonProps) => {
	const { onChangePaidStatus } = usePaidStatus();

	const onPaidChange = () => {
		onChangePaidStatus(
			status === PAID.PAID ? PAID.UNPAID : PAID.PAID, 
			id
		);
	};

	const isPaid = status === PAID.PAID;

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
