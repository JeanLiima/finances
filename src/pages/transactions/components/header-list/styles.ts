import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		marginTop: 10,
		backgroundColor: "#FFF",
		flexDirection: "row",
		borderRadius: 4,
		marginBottom: 10,
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
		marginEnd: 35,
	},
	item:{
		marginLeft: 10,
		color: "#000",
		fontSize: 16,
	},
});

export { styles };
