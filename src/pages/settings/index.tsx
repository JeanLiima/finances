import { ScrollView, Text, View } from "react-native";
import { NavigationProp, useNavigation } from "@react-navigation/native";

import { SettingsButton } from "./components/settings-button";
import { CATEGORIES, RootStackParamList } from "@/constants/routes";

import { styles } from "./styles";

const Settings = () => {
	const { navigate } = useNavigation<NavigationProp<RootStackParamList>>();

	const settingsOptions = [
		{ label: "Configurar categorias", icon: "grid", onPress: () => navigate(CATEGORIES) },
		{ label: "Editar dados do perfil", icon: "user", onPress: () => {} },
		{ label: "Aparência", icon: "sun", onPress: () => {} },
	] as const;

	return (
		<ScrollView style={styles.scrollContainer}>
			<View style={styles.container}>
				<Text style={styles.label}>Serviços</Text>
				<SettingsButton {...settingsOptions[0]} />

				<Text style={styles.label}>Aplicativo</Text>
				{settingsOptions.slice(1).map((option) => (
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
