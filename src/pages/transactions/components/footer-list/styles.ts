import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { 
		backgroundColor: "#F0F4FF",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20
	},
	totalText: {
		color: '#ccc', 
		fontSize: 20 
	},
	addButton: {
		alignSelf: "center",
		marginBottom: 30,
		marginTop: 15,
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: "#3b3dbf",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 3, 
		elevation: 5,
		shadowColor: "#000",
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
	}
});

export { styles };
