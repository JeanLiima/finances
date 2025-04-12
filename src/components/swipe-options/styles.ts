import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		justifyContent: "flex-end",
		backgroundColor: "#FFF",
		flexDirection: "row",
		borderRadius: 8,
		marginBottom: 14,
		height: 50,
		alignItems: "center",
		width: "100%",
	},
	content: {
		flex: 0.5, 
		borderRadius: 8,
		flexDirection: 'row',
		height: '100%',
	},
	deleteButton:{
		flex: 0.5,
    	height: '100%',
		borderTopRightRadius: 8,
		borderBottomRightRadius: 8,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EF4444',
	},
	editButton:{
		flex: 0.5,
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
