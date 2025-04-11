import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	card: {
		backgroundColor: '#fff',
		borderRadius: 12,
		padding: 16,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	title: {
		fontSize: 16,
		fontWeight: 'bold',
		marginBottom: 12,
		color: '#333',
	},
	subCard: {
		backgroundColor: '#f9f9f9',
		borderRadius: 10,
		padding: 12,
		marginBottom: 10,
	},
	subCardHeader: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	percentageText: {
		fontSize: 13,
		color: '#888',
		fontWeight: '500',
	},
	subCardRow: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 4,
	},
	subCardLabel: {
		fontSize: 13,
		color: '#555',
	},
	label: {
		fontSize: 14,
		color: '#666',
		marginLeft: 6,
	},
	value: {
		fontSize: 14,
		fontWeight: '600',
		color: '#111',
	},
	iconLabel: {
		flexDirection: 'row',
		alignItems: 'center',
	},
});

export { styles };
