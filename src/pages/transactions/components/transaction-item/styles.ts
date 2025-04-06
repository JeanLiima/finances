import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		backgroundColor: "#FFF",
		flexDirection: "row",
		borderRadius: 4,
		marginBottom: 14,
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	content:{
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		padding: 12,
	},
	item:{
		color: "#000",
		fontSize: 16,
	},
});

export { styles };
