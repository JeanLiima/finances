import { View, Text } from 'react-native';
import { DrawerItemList, DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';

import { useAuth } from '@/hooks/auth';

const NavigationDrawer = (props: DrawerContentComponentProps) => {
  const { loggedUser, onSignOut } = useAuth();

  return(
	<>
		<DrawerContentScrollView {...props}>
			<View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 25 }}>
				<Text style={{ fontSize: 18, marginTop: 14 }}>
					Bem-vindo
				</Text>
				<Text 
					style={{ fontSize: 17, fontWeight: 'bold', marginBottom: 14, paddingHorizontal: 20 }}
					numberOfLines={1}
				>
					{loggedUser && loggedUser.name}
				</Text>
			</View>

			<DrawerItemList {...props} />

		</DrawerContentScrollView>
		<View style={{ marginBottom: 20, marginTop: 10 }}>
			<DrawerItem
				{...props}
				label="Sair"
				onPress={onSignOut}
				labelStyle={{ alignSelf: 'center' }}
			/>
		</View>
	</>
  )
};

export { NavigationDrawer };
