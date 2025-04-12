
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		position: 'relative',
		flex: 3,
  		backgroundColor: 'rgba(34, 34, 34, 0.4)',
	},
	modalContent: {
		flex: 0.5,
		backgroundColor: "#FFF",
		padding: 14,
		gap: 8,
	},
	modalDescriptionContent: {
		flex: 0.9,
		justifyContent: "flex-start",
		backgroundColor: "#FFF",
		gap: 8,
		marginBottom: 8,
	},
	title: {
		alignSelf: "center",
		color: "#000",
		fontSize: 20, 
		fontWeight: 'bold' 
	},
	line: {
		width: "100%",
		flexDirection: 'row',
		justifyContent: "space-around",
		alignContent: "center"
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: "center",
		alignContent: "center",
	},
	valueText: {
		color: "#000",
		fontSize: 16,
		fontWeight: 'bold'
	}
});

export { styles };
