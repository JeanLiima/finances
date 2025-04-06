
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 3,
  		backgroundColor: 'rgba(34, 34, 34, 0.4)',
	},
	modalContent: {
		flex: 0.2,
		backgroundColor: "#FFF",
		padding: 14,
		gap: 8
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
		justifyContent: "space-between",
		alignContent: "center"
	},
	column: {
		flex: 1,
		flexDirection: 'column',
		justifyContent: "center",
		alignContent: "center",
	},
	item: {
		color: "#000",
		fontSize: 16,
	},
	type: {
		alignSelf: 'center',
		gap: 8,
		paddingHorizontal: 10,
		paddingVertical: 5,
		borderWidth: 1,
		borderRadius: 4,
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center"
	}
});

export { styles };
