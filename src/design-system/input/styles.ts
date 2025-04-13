import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		width: "100%",
		paddingHorizontal: 20,
		marginBottom: 15,
	},
	label: {
		marginBottom: 8,
		color: "#333",
		fontSize: 14,
		fontWeight: "bold",
	},
	inputWrapper: {
		backgroundColor: '#FFF',
		flexDirection: "row",
		alignItems: "center",
		borderWidth: 1,
		borderColor: "#ccc",
		borderRadius: 8,
		padding: 10,
	},
	input: {
		flex: 1,
		fontSize: 16,
		color: "#000",
	},
	prefix: {
		marginRight: 8,
		fontSize: 16,
		color: "#666",
	},
});

export { styles }
