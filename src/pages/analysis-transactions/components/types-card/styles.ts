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
	row: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		marginBottom: 8,
	},
	label: {
		fontSize: 14,
		color: '#666',
		marginLeft: 6,
	},
	value: {
		marginTop: 8,
		fontSize: 14,
		fontWeight: '600',
		color: '#111',
	},
	iconLabel: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	progressBar: {
		width: '100%',
		height: 10,
		backgroundColor: '#eee',
		borderRadius: 5,
		marginTop: 8,
	},
	progressFill: {
		height: 10,
		borderRadius: 5,
	},
});

export { styles };
