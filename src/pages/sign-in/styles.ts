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
    },
    link: {
        marginTop: 20,
        marginBottom: 10,
    },
    linkText: {
        color: '#171717',
    },
});

export { styles };
