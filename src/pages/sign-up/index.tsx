import { useRef, useState } from 'react';
import {
    Platform,
    ActivityIndicator,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
	Alert,
	TextInput
} from 'react-native';

import { useAuth } from '@/hooks/auth';
import { Input } from '@/design-system/input';

import { styles } from './styles';

const SignUp = () => {
	const [name, setName] = useState<string>('');
	const [email, setEmail] = useState<string>('');
	const [password, setPassword] = useState<string>('');

	const emailRef = useRef<TextInput>(null);
	const passwordRef = useRef<TextInput>(null);

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
					<Input
						placeholder="Digite seu nome"
						value={name}
						onChangeText={setName}
						returnKeyType="next"
						onSubmitEditing={() => emailRef.current?.focus()}
					/>
				</View>
				<View style={styles.areaInput}>
					<Input
						placeholder="Digite seu email"
						value={email}
						onChangeText={setEmail}
						ref={emailRef}
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current?.focus()}
					/>
				</View>
				<View style={styles.areaInput}>
					<Input
						placeholder="Sua senha"
						value={password}
						onChangeText={setPassword}
						secureTextEntry={true}
						ref={passwordRef}
						returnKeyType="done"
						onSubmitEditing={handleSignUp}
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
