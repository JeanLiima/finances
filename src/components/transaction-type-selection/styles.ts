import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 12,
		marginHorizontal: 20,
		marginBottom: 15,
	},
	button: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		padding: 10,
		borderWidth: 1,
		borderRadius: 8,
		justifyContent: "center",
	},
	label: {
		fontSize: 14,
		fontWeight: "500",
	},
});
  
export { styles };
