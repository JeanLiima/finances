import { useMemo, useState } from 'react';
import { 
	View, 
	Text, 
	Modal, 
	TouchableWithoutFeedback, 
	TouchableOpacity, 
	Keyboard 
} from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { styles } from './styles';

interface Options {
	label: string,
	value: string,
}

interface SelectProps { 
	value?: string, 
	onChangeValue: (id: string) => void,
	options: Options[],
	placeholder?: string,
	label?: string,
	optional?: boolean,
}

const Select = ({
	label,
	placeholder,
	value,
	onChangeValue,
	options,
	optional = true
}: SelectProps) => {
	const [modalVisible, setModalVisible] = useState(false);

	const hasValue = useMemo(() => !!value && value.length > 0, [value]);
	const formattedValue = useMemo(() => hasValue? options.find(option => option.value === value)!.label : '', [options, value]);
	const displayText = hasValue ? formattedValue : (placeholder ?? 'Selecionar');

	const handleValueChange = (selectedId: string) => onChangeValue(selectedId);

	return (
		<>
			<View style={styles.container}>
				{ label && <Text style={styles.label}>{label}</Text> }
				<TouchableOpacity 
					onPress={() => {
						Keyboard.dismiss();
						setModalVisible(true);
					}} 
					style={styles.trigger}
				>
					<Text style={[styles.triggerText, { color: hasValue ? '#121212' : "#ccc" }]}>
						{displayText}
					</Text>
				</TouchableOpacity>
			</View>
			<Modal visible={modalVisible} animationType="fade" transparent={true}>
				<View style={styles.closeContainer}>
					<TouchableWithoutFeedback onPress={() => setModalVisible(false)}>
						<View style={{ flex: 1 }}></View>
					</TouchableWithoutFeedback>
				</View>
				<View style={styles.pickerContainer}>
					<Picker
						selectedValue={value ?? ''}
						onValueChange={handleValueChange}
						style={styles.picker}
						placeholder={placeholder ?? "Selecione"}
						itemStyle={styles.pickerItem}
						mode="dropdown"
					>
						{optional && <Picker.Item label="Selecione..." value={''} enabled={false} />}
						{options.map(item => (
							<Picker.Item 
								key={item.value} 
								label={item.label} 
								value={item.value} 
							/>
						))}
					</Picker>
				</View>
			</Modal>
			</>
	);
}

export { Select };
