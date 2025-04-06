import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: { 
		flex:1,
  		backgroundColor: "#F0F4FF",
		alignItems: "center"
	},
	backButton: {
		width: '90%',
		height: 45,
		borderRadius: 8,
		backgroundColor: '#FFF',
		borderColor: '#3b3dbf',
		borderWidth: 1,
		marginTop: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	backButtonText: {
		fontSize: 20,
		color: '#3b3dbf',
	},
});

export { styles };
