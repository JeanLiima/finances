import React, { useState } from 'react';
import {
    Platform,
    ActivityIndicator,
    View,
    KeyboardAvoidingView,
    TextInput,
    TouchableOpacity,
    Text,
	Alert
} from 'react-native';

import { useAuth } from '../../hooks/auth';

import { styles } from './styles';

const SignUp = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const { isLoadingAuth, onSignUp } = useAuth();

	const handleSignUp = () =>{
		if(email === '' || password === '' || name === '') {
			Alert.alert(
				"Atenção",
				"Preencha todos os campos antes de cadastrar.",
				[
					{
						text: "OK",
					},
				],
				{ cancelable: false }
			);
			return;
		};

		onSignUp(email, password, name);
	}

	return (
		<View style={styles.background}>
			<KeyboardAvoidingView
				style={styles.container}
				behavior={Platform.OS === 'ios' ? 'padding' : undefined}
				enabled
			>
				<View style={styles.areaInput}>
					<TextInput
						style={styles.input}
						placeholder="Seu nome"
						value={name}
						onChangeText={setName}
					/>
				</View>
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
					onPress={handleSignUp}
				>
					{isLoadingAuth ? (
						<ActivityIndicator size={20} color="#FFF" />
					) : (
						<Text style={styles.submitText}>
							Cadastrar
						</Text>
					)}
				</TouchableOpacity>
			</KeyboardAvoidingView>
		</View>
	)
};

export { SignUp };
