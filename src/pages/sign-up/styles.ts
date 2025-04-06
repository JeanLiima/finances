import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    background: {
        flex: 1,
        backgroundColor: '#F0F4FF',
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    areaInput: {
        flexDirection: 'row'
    },
    input: {
        backgroundColor: '#FFF',
        width: '90%',
        fontSize: 17,
        padding: 10,
        borderRadius: 8,
        color: '#121212',
        marginBottom: 15,
    },
    submitButton: {
        width: '90%',
        height: 45,
        borderRadius: 8,
        backgroundColor: '#3b3dbf',
        marginTop: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    submitText: {
        fontSize: 20,
        color: '#FFF',
    }
});

export { styles }
