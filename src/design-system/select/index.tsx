import { SetStateAction, useState } from 'react';
import { View, Text, Modal, TouchableWithoutFeedback, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import { styles } from './styles';

interface Options {
	label: string,
	value: string,
}

interface SelectProps { 
	value?: string, 
	onChangeValue: (value: SetStateAction<string | undefined>) => void,
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

	const hasValue = value && value.length > 0;
	const formattedValue = options.find(option => option.value === value)?.label;
	const displayText = hasValue ? formattedValue : (placeholder ?? 'Selecionar');

	const handleValueChange = (itemValue: string) => onChangeValue(itemValue ?? null);

	return (
		<>
			<View style={styles.container}>
				<Text style={styles.label}>{label}</Text>
				<TouchableOpacity onPress={() => setModalVisible(true)} style={styles.trigger}>
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
