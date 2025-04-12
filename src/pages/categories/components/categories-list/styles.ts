import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4FF",
		padding: 16,
	},
	editButton: {
		alignSelf: 'flex-end',
		marginBottom: 10,
		width: 45,
		height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        alignItems: 'center',
        justifyContent: 'center',
	},
	list: {
		flex: 1,
		marginTop: 8,
		marginLeft: 8,
		marginRight: 8,
	}
});
