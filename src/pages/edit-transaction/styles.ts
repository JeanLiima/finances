import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
	background: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
		paddingTop: 20
    },
    areaInput: {
        flexDirection: 'row'
    },
    submitButton: {
        width: '89%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
	submitButtonText: {
        fontSize: 20,
        color: '#FFF',
    },
	backButton: {
		width: '89%',
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
