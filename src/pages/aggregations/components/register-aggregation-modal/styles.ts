
import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: 'rgba(34, 34, 34, 0.4)',
		alignItems: 'center',
		paddingTop: 90,
		paddingHorizontal: 20,
	},
	modalContent: {
		width: "100%", 
		paddingVertical: 30,
		gap: 8,
		backgroundColor: '#F0F4FF',
		borderRadius: 8,
	},
	submitButton: {
        height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        alignItems: 'center',
        justifyContent: 'center',
		marginHorizontal: 20,
    },
    submitButtonText: {
        fontSize: 16,
        color: '#FFF',
    },
	disabled: {
		opacity: 0.4,
	},
});

export { styles };
