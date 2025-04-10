import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#F0F4FF",
		padding: 16,
	},
	advanceButton: {
		width: '100%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
		marginBottom: 20,
	},
	advanceButtonText: {
		fontSize: 20,
        color: '#FFF',
	},
	disabled: {
		opacity: 0.5,
	},
});
