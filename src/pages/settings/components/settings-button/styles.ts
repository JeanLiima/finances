import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	settingButton: {
		backgroundColor: "#fff",
		borderColor: "#3b3dbf",
		borderWidth: 1,
		borderRadius: 10,
		paddingVertical: 16,
		paddingHorizontal: 20,
		marginBottom: 12,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	buttonContent: {
		flexDirection: "row",
		alignItems: "center",
	},
	icon: {
		marginRight: 12,
	},
	settingButtonText: {
		fontSize: 18,
		color: "#3b3dbf",
		fontWeight: "500",
	},
	dangerButton: {
		borderColor: "#E63946",
	},
	dangerText: {
		color: "#E63946",
	},
});

export { styles };
