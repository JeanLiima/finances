import { useRef, useState } from 'react';
import {
    Platform,
    ActivityIndicator,
    View,
    KeyboardAvoidingView,
    TouchableOpacity,
    Text,
	Alert,
	TextInput,
} from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';

import { Input } from '@/design-system/input';
import { useAuth } from '@/hooks/auth';
import { RootStackParamList, SIGN_UP } from '@/constants/routes';

import { styles } from './styles';

const SignIn = () => {
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

	const passwordRef = useRef<TextInput>(null);

    const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();
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
                <View style={styles.areaInput}>
                    <Input
                        placeholder="Digite seu email"
                        value={email}
                        onChangeText={setEmail}
						returnKeyType="next"
						onSubmitEditing={() => passwordRef.current?.focus()}
                    />
                </View>
                <View style={styles.areaInput}>
                    <Input
                        placeholder="Digite sua senha"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={true}
						ref={passwordRef}
						returnKeyType="done"
						onSubmitEditing={handleSignIn}
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
                    onPress={() => navigate(SIGN_UP)}
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
