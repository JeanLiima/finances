import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { 
		flex:1,
  		backgroundColor: "#F0F4FF",
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: { 
		fontSize: 20, 
		fontWeight: 'bold' 
	},
	emptyButton: { 
		marginTop: 20, 
		backgroundColor: '#3b3dbf', 
		padding: 10, 
		borderRadius: 8 
	},
	emptyButtonText: { 
		color: '#FFF', 
		fontSize: 20 
	},
});

export { styles };
