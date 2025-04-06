import 'react-native-gesture-handler';

import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';

import { AuthProvider } from './src/contexts/auth';
import Routes from './src/routes';

const App = () => (
	<NavigationContainer>
		<AuthProvider>
			<StatusBar backgroundColor="#F0F4FF" barStyle="dark-content" />
			<Routes />
		</AuthProvider>
	</NavigationContainer>
);

export default App;
