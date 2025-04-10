import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	scrollContainer: {
		flexGrow: 1,
		paddingTop: 20,
	},
	header: {
		alignItems: 'center',
		marginBottom: 10,
	},
	welcome: {
		fontSize: 18,
		marginTop: 14,
		color: '#444',
	},
	username: {
		fontSize: 17,
		fontWeight: 'bold',
		marginBottom: 14,
		paddingHorizontal: 20,
		color: '#3b3dbf',
	},
	footer: {
		borderTopWidth: 1,
		borderTopColor: '#eee',
		paddingTop: 10,
		paddingBottom: 20,
	},
	logoutButton: {
		marginHorizontal: 10,
		borderWidth: 1,
		borderColor: '#E63946',
		borderRadius: 6,
	},
	logoutLabel: {
		color: '#E63946',
		fontWeight: 'bold',
	},
});

export { styles };
