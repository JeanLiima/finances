import { View, Text } from 'react-native';
import { DrawerItemList, DrawerContentScrollView, DrawerItem, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import { useAuth } from '@/hooks/auth';

import { styles } from './styles';

const NavigationDrawer = (props: DrawerContentComponentProps) => {
	const { loggedUser, onSignOut } = useAuth();

	return (
		<>
			<DrawerContentScrollView {...props} contentContainerStyle={styles.scrollContainer}>
				<View style={styles.header}>
					<Text style={styles.welcome}>Bem-vindo</Text>
					<Text
						style={styles.username}
						numberOfLines={1}
					>
						{loggedUser?.name}
					</Text>
				</View>

				<DrawerItemList {...props} />
			</DrawerContentScrollView>

			<View style={styles.footer}>
				<DrawerItem
					{...props}
					label="Sair"
					onPress={onSignOut}
					icon={({ color, size }) => (
						<Feather name="log-out" size={size} color="#E63946" />
					)}
					labelStyle={[styles.logoutLabel]}
					style={styles.logoutButton}
				/>
			</View>
		</>
	);
};

export { NavigationDrawer };
