import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flexDirection: "row",
		gap: 12,
		marginHorizontal: 20,
		marginBottom: 20,
	},
	button: {
		flex: 1,
		flexDirection: "row",
		alignItems: "center",
		gap: 8,
		padding: 12,
		borderWidth: 1.5,
		borderRadius: 8,
		justifyContent: "center",
	},
	label: {
		fontSize: 16,
		fontWeight: "500",
	},
});
  
export { styles };
