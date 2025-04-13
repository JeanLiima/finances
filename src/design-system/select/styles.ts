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
		overflow: 'hidden',
		borderWidth: 1,
		borderColor: "#ccc",
	},
	triggerText: {
		fontSize: 17,
		color: '#121212',
	},
	label: {
		marginBottom: 8,
		color: "#333",
		fontSize: 14,
		fontWeight: "bold",
	},
	pickerContainer: {
		flex: 0.4,
		backgroundColor: '#fff',
		borderRadius: 8,
	},
	picker: {
		justifyContent: "flex-start",
	},
	pickerItem: {
		fontSize: 16,
		color: '#333',
	}
});
