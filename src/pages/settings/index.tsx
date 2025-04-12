import { ScrollView, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { 
	AGGREGATIONS, 
	CATEGORIES, 
	RootStackParamList
} from "@/constants/routes";

import { SettingsButton } from "./components/settings-button";

import { styles } from "./styles";

const Settings = () => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	const servicesOptions = [
		{ label: "Configurar agrupamentos", icon: "grid", onPress: () => navigate(AGGREGATIONS) },
		{ label: "Configurar categorias", icon: "grid", onPress: () => navigate(CATEGORIES) },
	] as const;

	const appOptions = [
		{ label: "Editar dados do perfil", icon: "user", onPress: () => {} },
		{ label: "Aparência", icon: "sun", onPress: () => {} },
	] as const;

	return (
		<ScrollView style={styles.scrollContainer}>
			<View style={styles.container}>
				<Text style={styles.label}>Serviços</Text>
				{servicesOptions.map((option) => (
					<SettingsButton key={option.label} {...option} />
				))}

				<Text style={styles.label}>Aplicativo</Text>
				{appOptions.map((option) => (
					<SettingsButton key={option.label} {...option} />
				))}

				<View style={{ height: 40 }} />

				<SettingsButton
					label="Sair"
					icon="log-out"
					onPress={() => {}}
					variant="danger"
				/>
			</View>
		</ScrollView>
	);
};

export { Settings };
