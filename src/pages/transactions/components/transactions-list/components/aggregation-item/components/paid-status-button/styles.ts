import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	paidButton: {
		width: 50,
		height: '100%',
		borderTopLeftRadius: 8,
		borderBottomLeftRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3B82F6',
	},
	paid: {
		backgroundColor: '#4CAF50',
	},
	unpaid: {
		backgroundColor: '#FFC107',
	},
	buttonText: {
		color: "#FFF",
		paddingLeft: 8,
		paddingRight: 8,
	},
});

export { styles };
