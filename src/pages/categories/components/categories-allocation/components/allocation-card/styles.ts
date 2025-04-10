import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		backgroundColor: "#FFF",
		paddingHorizontal: 15,
		marginBottom: 10,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		borderWidth: 1,
		borderColor: "#3b3dbf",
		height: 75
	},
	name: {
		flex: 1,
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
	control: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between"
	},
	button: {
		backgroundColor: "#3b3dbf",
		padding: 16,
		borderRadius: 10,
		alignItems: "center",
	},
	disabledButton: {
		opacity: 0.3,
	},
	percent: {
		fontSize: 14,
		color: "#3b3dbf",
		fontWeight: "500",
	},
});
