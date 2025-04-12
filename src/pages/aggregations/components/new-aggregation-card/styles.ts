import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		gap: 8,
		backgroundColor: '#fff',
		borderRadius: 8,
		padding: 12,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	label: {
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
});
