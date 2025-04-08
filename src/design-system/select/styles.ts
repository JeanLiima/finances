import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		margin: 20,
		zIndex: 1000,
	},
	label: {
		marginBottom: 8,
		fontSize: 16,
	},
	dropdown: {
		borderWidth: 2,
		borderColor: '#FFF'
	},
	dropdownContainer: {
		borderWidth: 2,
		borderColor: '#FFF'
	},
	text: {         
		fontSize: 16,
		color: '#333',
	},
	placeholder: {
		color: '#ccc',
	},
	selectedItemLabel: {
		fontWeight: 'bold',
	},
	listItemLabel: {
		color: '#333',
	}
});

export { styles };
