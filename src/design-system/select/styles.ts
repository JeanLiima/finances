import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	closeContainer: {
		flex: 1,
		backgroundColor: 'rgba(34, 34, 34, 0.4)',
	},
	trigger: {
		padding: 10,
		backgroundColor: '#FFF',
		borderRadius: 8,
	},
	triggerText: {
		fontSize: 17,
		color: '#121212',
	},
	label: {
		fontSize: 18,
		marginBottom: 10,
	},
	pickerContainer: {
		flex: 0.4,
		backgroundColor: '#fff',
		borderRadius: 8,
		overflow: 'hidden',
	},
	picker: {
		justifyContent: "flex-start",
	},
	pickerItem: {
		fontSize: 16,
		color: '#333',
	}
});
