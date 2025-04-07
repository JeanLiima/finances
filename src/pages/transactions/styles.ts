import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { 
		flex:1,
  		backgroundColor: "#F0F4FF",
	},
	list: {
		flex: 1,
		marginTop: 8,
		marginLeft: 8,
		marginRight: 8,
	},
	emptyContainer: {
		flex: 1,
		justifyContent: 'space-between',
		alignItems: 'center',
		padding: 20,
	},
	emptyTextContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	emptyText: { 
		fontSize: 16,
		color: '#666',
		textAlign: 'center',
		marginBottom: 20,
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
