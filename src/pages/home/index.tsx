import React from "react"

import { View, Text, TouchableOpacity } from "react-native";

import { useAuth } from "../../hooks/auth";

const Home = () => {
	const { loggedUser, onSignOut } = useAuth();

	return (
		<View style={{ flex: 1, backgroundColor: '#F0F4FF', alignItems: 'center', justifyContent: 'center'}}>
			<Text>Nome: {loggedUser?.name}</Text>
			<Text>Email: {loggedUser?.email}</Text>
			<TouchableOpacity 
				onPress={onSignOut} 
				style={{ marginTop: 20, backgroundColor: '#3b3dbf', padding: 10, borderRadius: 8 }}
			>
				<Text style={{ color: '#FFF', fontSize: 18 }}>
					Sair
				</Text>
			</TouchableOpacity>
		</View>
	)
};

export { Home };
