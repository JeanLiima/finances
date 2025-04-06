import React, { useState } from 'react';
import {
    Platform,
    ActivityIndicator,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
	Alert,
    // Image
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useAuth } from '../../hooks/auth';
import { SIGN_UP } from '../../constants/routes';

import { styles } from './styles';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigation = useNavigation();
    const { onSignIn, isLoadingAuth } = useAuth();

	const handleSignIn = () => {
		if(email === '' || password === '') {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de acessar.",
				[
					{
						text: "OK",
					},
				],
				{ cancelable: false }
			);
			return;
		}
		onSignIn(email, password);
	};

    return (
        <View style={styles.background}>
            <KeyboardAvoidingView
                style={styles.container}
                behavior={Platform.OS === 'ios' ? 'padding' : undefined}
                enabled
            >
                {/* <Image
                    source={require('../../assets/Logo.png')}
                    style={styles.logo}
                /> */}
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Seu email"
                        value={email}
                        onChangeText={setEmail}
                    />
                </View>
                <View style={styles.areaInput}>
                    <TextInput
                        style={styles.input}
                        placeholder="Sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
                    />
                </View>
                <TouchableOpacity
                    activeOpacity={0.8}
                    style={styles.submitButton}
                    onPress={handleSignIn}
                >
                    {isLoadingAuth ? (
                        <ActivityIndicator size={20} color="#FFF" />
                    ) : (
                        <Text style={styles.submitText}>
							Acessar
						</Text>
                    )}
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate(SIGN_UP as never)}
                    style={styles.link}
                >
                    <Text style={styles.linkText}>
						Crie uma conta
					</Text>
                </TouchableOpacity>
            </KeyboardAvoidingView>
        </View>
    )
};

export { SignIn }
