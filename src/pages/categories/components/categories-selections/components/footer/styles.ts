import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
	disabled: {
		opacity: 0.4,
	},
	footer: {
		marginBottom: 20,
		alignItems: "center",
	},
	nextButton: {
        width: '100%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    nextButtonText: {
        fontSize: 20,
        color: '#FFF',
    },
	backButton: {
		width: '100%',
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
