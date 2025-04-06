import React from 'react';
import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';

import { NavigationDrawer } from '../components/navigation-drawer';

import { Home } from '../pages/home';
import { HOME } from '../constants/routes';

const PrivateDrawer = createDrawerNavigator();

const PrivateRoutes = () => (
    <PrivateDrawer.Navigator
		initialRouteName={HOME}
		drawerContent={(props: DrawerContentComponentProps) => <NavigationDrawer {...props} />}
		screenOptions={{
			headerShown: false,
			drawerStyle: {
				backgroundColor: '#FFF',
				paddingTop: 20,
			},
			drawerActiveBackgroundColor:'#3b3dbf',
			drawerActiveTintColor: '#FFF',
			drawerInactiveBackgroundColor: '#F0F2FF',
			drawerInactiveTintColor: '#121212'
		}}
    >
		<PrivateDrawer.Screen
			name={HOME}
			component={Home}
			options={{
				drawerLabel: 'Inicio',
			}}
		/>
	</PrivateDrawer.Navigator>
);

export { PrivateRoutes };
