import React, { SetStateAction, useState } from 'react';
import { View, Text } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';

import { styles } from './styles';

interface Options {
	label: string,
	value: string,
}

interface SelectProps { 
	value: string | null, 
	onChangeValue: (value: SetStateAction<string | null>) => void,
	options: Options[],
	placeholder?: string
}

const Select = ({ 
	value, 
	onChangeValue,
	options,
	placeholder
}:SelectProps) => {
	const [open, setOpen] = useState(false);

	return (
		<View style={styles.container}>
			<Text style={styles.label}>Escolha o parcelamento:</Text>
			<DropDownPicker
				style={styles.dropdown}
				dropDownContainerStyle={styles.dropdownContainer}
				textStyle={styles.text}
				placeholderStyle={styles.placeholder}
				selectedItemLabelStyle={styles.selectedItemLabel}
				open={open}
				value={value}
				items={options}
				setOpen={setOpen}
				setValue={onChangeValue}
				placeholder={placeholder ? placeholder : "Selecione"}
				zIndex={1000}
				showTickIcon={false}
			/>
		</View>
	);
}

export { Select };
