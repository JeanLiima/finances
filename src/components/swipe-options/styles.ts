import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container:{
		backgroundColor: "#FFF",
		flexDirection: "row",
		justifyContent: "flex-end",
		borderRadius: 4,
		height: 50,
		width: "100%"
	},
	deleteButton:{
		width: 96,
    	height: '100%',
		borderTopRightRadius: 4,
		borderBottomRightRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#EF4444',
	},
	editButton:{
		width: 97,
    	height: '100%',
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3B82F6',
	},
	paidButton: {
		width: 97,
    	height: '100%',
		borderTopLeftRadius: 4,
		borderBottomLeftRadius: 4,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: '#3B82F6',
	},
	paid: {
		backgroundColor: '#4CAF50',
	},
	unpaid: {
		backgroundColor: '#FFC107',
	},
	buttonText: {
		color: "#FFF",
		paddingLeft: 8,
		paddingRight: 8,
	},
});

export { styles };
