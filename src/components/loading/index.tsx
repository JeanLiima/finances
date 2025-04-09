import { ActivityIndicator, View } from "react-native";

const Loading = () => (
	<View
		style={{
			flex: 1,
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#F0F4FF',
		}}
	>
		<ActivityIndicator size="large" color="#131313" />
	</View>
);

export { Loading };
