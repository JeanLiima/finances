import { createDrawerNavigator, DrawerContentComponentProps } from '@react-navigation/drawer';

import { NavigationDrawer } from '@/components/navigation-drawer';
import { TRANSACTIONS, REGISTER_TRANSACTION, EDIT_TRANSACTION, TRANSACTION_DETAILS } from '@/constants/routes';
import { RegisterTransaction } from '@/pages/register-transaction';
import { Transactions } from '@/pages/transactions';
import { EditTransaction } from '@/pages/edit-transaction';
import { TransactionDetails } from '@/pages/transaction-details';

const PrivateDrawer = createDrawerNavigator();

const PrivateRoutes = () => (
    <PrivateDrawer.Navigator
		initialRouteName={TRANSACTIONS}
		drawerContent={(props: DrawerContentComponentProps) => <NavigationDrawer {...props} />}
		screenOptions={{
			drawerStyle: {
				backgroundColor: '#FFF',
				paddingTop: 20
			},
			headerTitleAlign: 'center',
			drawerItemStyle:{
				marginVertical: 4,
				borderRadius: 4,
			},
			drawerActiveBackgroundColor:'#3b3dbf',
			drawerActiveTintColor: '#FFF',
			drawerInactiveBackgroundColor: '#F0F2FF',
			drawerInactiveTintColor: '#3b3dbf'
		}}
    >
		<PrivateDrawer.Screen
			name={TRANSACTIONS}
			component={Transactions}
			options={{
				title: 'Transações',
			}}
		/>
		<PrivateDrawer.Screen
			name={EDIT_TRANSACTION}
			component={EditTransaction}
			options={{
				title: 'Edição de transação',
				drawerItemStyle: { display: 'none' }
			}}
		/>
		<PrivateDrawer.Screen
			name={TRANSACTION_DETAILS}
			component={TransactionDetails}
			options={{
				title: 'Detalhes da transação',
				drawerItemStyle: { display: 'none' }
			}}
		/>
		<PrivateDrawer.Screen
			name={REGISTER_TRANSACTION}
			component={RegisterTransaction}
			options={{
				title: 'Cadastro de transação',
			}}
		/>
	</PrivateDrawer.Navigator>
);

export { PrivateRoutes };
