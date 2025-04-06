import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { SignIn } from '../pages/sign-in';
import { SignUp } from '../pages/sign-up';
import { SIGN_IN, SIGN_UP } from '../constants/routes';

const PublicStack = createNativeStackNavigator();

const PublicRoutes = () => (
	<PublicStack.Navigator 
		initialRouteName={SIGN_IN}
	>
		<PublicStack.Screen
			name={SIGN_IN}
			component={SignIn}
			options={{
				headerShown: false,
			}}
		/>

		<PublicStack.Screen
			name={SIGN_UP}
			component={SignUp}
			options={{
				headerStyle:{
					backgroundColor: '#3b3dbf',
				},
				headerTintColor: '#FFF',
				headerTitle: 'Voltar',
				headerBackButtonDisplayMode: 'minimal',
				
			}}
		/>
	</PublicStack.Navigator>
);

export { PublicRoutes };
