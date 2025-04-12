import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		backgroundColor: "#FFF",
		flexDirection: "row",
		borderRadius: 8,
		marginBottom: 14,
		height: 50,
		alignItems: "center",
		justifyContent: "space-between",
		width: "100%",

		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 8,
		elevation: 3,
	},
	dataContent: { 
		paddingHorizontal: 10,  
		width: "90%", 
		flexDirection: 'row', 
		alignItems: "center", 
		justifyContent: "center"
	},
	textContent:{
		flex: 1,
		alignItems: "center",
		justifyContent: "space-between",
		flexDirection: "row",
		padding: 12,
	},
	item:{
		color: "#000",
		marginLeft: 8,
		fontSize: 16,
	},
});

export { styles };
