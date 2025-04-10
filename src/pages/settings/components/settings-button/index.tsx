import { TouchableOpacity, Text, View } from "react-native";
import { Feather } from "@expo/vector-icons";

import { styles } from "./styles";

type SettingsButtonProps = {
	label: string;
	icon: keyof typeof Feather.glyphMap;
	onPress: () => void;
	variant?: "default" | "danger";
};

const SettingsButton = ({ 
	label,
	icon,
	onPress,
	variant = "default",
}: SettingsButtonProps) => {
	const isDanger = variant === "danger";

	return (
		<TouchableOpacity
			activeOpacity={0.8}
			style={[
				styles.settingButton,
				isDanger && styles.dangerButton,
			]}
			onPress={onPress}
		>
			<View style={styles.buttonContent}>
				<Feather
					name={icon}
					size={20}
					color={isDanger ? "#E63946" : "#3b3dbf"}
					style={styles.icon}
				/>
				<Text
					style={[
						styles.settingButtonText,
						isDanger && styles.dangerText,
					]}
				>
					{label}
				</Text>
			</View>
		</TouchableOpacity>
	);
};

export { SettingsButton };
