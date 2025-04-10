import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';
import { Feather } from '@expo/vector-icons';

import { NavigationDrawer } from '@/components/navigation-drawer';
import {
	TRANSACTIONS,
	REGISTER_TRANSACTION,
	EDIT_TRANSACTION,
	TRANSACTIONS_ANALYSIS,
	SETTINGS,
	CATEGORIES,
} from '@/constants/routes';
import { RegisterTransaction } from '@/pages/register-transaction';
import { Transactions } from '@/pages/transactions';
import { EditTransaction } from '@/pages/edit-transaction';
import { TransactionAnalysis } from '@/pages/analysis-transactions';
import { Settings } from '@/pages/settings';
import { Categories } from '@/pages/categories';

const PrivateDrawer = createDrawerNavigator();

const PrivateRoutes = () => (
	<PrivateDrawer.Navigator
		initialRouteName={TRANSACTIONS_ANALYSIS}
		drawerContent={(props: DrawerContentComponentProps) => <NavigationDrawer {...props} />}
		screenOptions={{
			drawerStyle: {
				backgroundColor: '#FFF',
				paddingTop: 20,
			},
			headerTitleAlign: 'center',
			drawerItemStyle: {
				marginVertical: 4,
				borderRadius: 4,
			},
			drawerActiveBackgroundColor: '#3b3dbf',
			drawerActiveTintColor: '#FFF',
			drawerInactiveBackgroundColor: '#F0F2FF',
			drawerInactiveTintColor: '#3b3dbf',
		}}
	>
		<PrivateDrawer.Screen
			name={TRANSACTIONS_ANALYSIS}
			component={TransactionAnalysis}
			options={{
				title: 'Análises de Transações',
				drawerIcon: ({ color, size }) => <Feather name="bar-chart" color={color} size={size} />,
			}}
		/>
		<PrivateDrawer.Screen
			name={TRANSACTIONS}
			component={Transactions}
			options={{
				title: 'Transações',
				drawerIcon: ({ color, size }) => <Feather name="list" color={color} size={size} />,
			}}
		/>
		<PrivateDrawer.Screen
			name={SETTINGS}
			component={Settings}
			options={{
				title: 'Configurações',
				drawerIcon: ({ color, size }) => <Feather name="settings" color={color} size={size} />,
			}}
		/>

		<PrivateDrawer.Screen
			name={EDIT_TRANSACTION}
			component={EditTransaction}
			options={{
				title: 'Edição de Transação',
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<PrivateDrawer.Screen
			name={REGISTER_TRANSACTION}
			component={RegisterTransaction}
			options={{
				title: 'Cadastro de Transação',
				drawerItemStyle: { display: 'none' },
			}}
		/>
		<PrivateDrawer.Screen
			name={CATEGORIES}
			component={Categories}
			options={{
				title: 'Categorias',
				drawerItemStyle: { display: 'none' },
			}}
		/>
	</PrivateDrawer.Navigator>
);

export { PrivateRoutes };
