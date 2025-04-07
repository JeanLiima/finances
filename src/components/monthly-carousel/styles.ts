import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		maxHeight: 80,
		shadowColor: '#000',
		shadowOffset: { width: 0, height: 2 },
		shadowOpacity: 0.1,
		shadowRadius: 4,
		elevation: 3,
	},
	monthList: { 
		marginTop: 10,
		marginBottom: 10,
		maxHeight: 80,
	},
	monthItem: {
		maxHeight: 40,
		paddingVertical: 10,
		borderRadius: 4,
		backgroundColor: '#FFF',
		alignItems: 'center',
	},
	selectedMonthItem: {
		backgroundColor: '#3b3dbf',
	},
	monthText: {
		color: '#333',
		fontSize: 16,
		fontWeight: 'bold',
	},
	selectedMonthText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});

export { styles };
