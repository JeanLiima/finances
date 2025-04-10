import { ScrollView, Text, View } from "react-native";

import { SettingsButton } from "./components/settings-button";
import { styles } from "./styles";

const settingsOptions = [
	{ label: "Configurar categorias", icon: "grid", onPress: () => {} },
	{ label: "Editar dados do perfil", icon: "user", onPress: () => {} },
	{ label: "Aparência", icon: "sun", onPress: () => {} },
] as const;

const Settings = () => {
	return (
		<ScrollView style={styles.scrollContainer}>
			<View style={styles.container}>
				<Text style={styles.label}>Serviços</Text>
				<SettingsButton {...settingsOptions[0]} />

				<Text style={styles.label}>Aplicativo</Text>
				{settingsOptions.slice(1).map((option, index) => (
					<SettingsButton key={index} {...option} />
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
