import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		backgroundColor: "#FFF",
		flexDirection: "row",
		justifyContent: "flex-end",
		borderRadius: 8,
		height: 50,
		width: "100%"
	},
	deleteButton:{
		width: 96,
    	height: '100%',
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EF4444',
	},
	editButton:{
		width: 97,
    	height: '100%',
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3B82F6',
	},
	buttonText: {
		color: "#FFF",
		paddingLeft: 8,
		paddingRight: 8,
	},
});

export { styles };
