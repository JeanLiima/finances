import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	card: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		backgroundColor: '#fff',
		borderRadius: 12,
		paddingVertical: 10,
		paddingHorizontal: 16,
		marginBottom: 16,
		shadowColor: '#000',
		shadowOpacity: 0.05,
		shadowOffset: { width: 0, height: 2 },
		shadowRadius: 6,
		elevation: 3,
	},
	name: {
		flex: 1,
		fontSize: 16,
		color: "#333",
		fontWeight: "500",
	},
	control: {
		flex: 0.5,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "flex-end",
		gap: 8
	},
	button: {
		backgroundColor: "#3b3dbf",
		padding: 12,
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
		width: 40,
		textAlign: "center"
	},
});
