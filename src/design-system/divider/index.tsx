import React from 'react';
import { View, StyleSheet } from 'react-native';

interface DividerProps {
  color?: string;
  thickness?: number;
  marginVertical?: number;
};

const Divider = ({
	color = '#E0E0E0',
	thickness = StyleSheet.hairlineWidth,
	marginVertical = 8,
}: DividerProps) => (
    <View
		style={{
			height: thickness,
			backgroundColor: color,
			marginVertical,
			width: '100%',
		}}
    />
);

export { Divider };
