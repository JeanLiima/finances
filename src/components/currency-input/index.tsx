import { forwardRef } from "react";
import { TextInput, TextInputProps } from "react-native";

import { Input } from "@/design-system/input";

interface InputProps extends TextInputProps {
	label?: string;
	suffix?: string;
	currency?: boolean;
}

const CurrencyInput = forwardRef<TextInput, InputProps>(({ 
	label, 
	suffix, 
	value, 
	onChangeText, 
	...props 
}, ref ) => {
		const handleCurrencyChange = (text: string) => {
			const numericValue = text.replace(/\D/g, "");

			const cents = parseInt(numericValue || "0", 10);

			const formatted = (cents / 100).toLocaleString("pt-BR", {
				minimumFractionDigits: 2,
				maximumFractionDigits: 2,
			});

			onChangeText?.(formatted);
		};

		return (
			<Input
				prefix="R$"
				ref={ref}
				value={value}
				onChangeText={handleCurrencyChange}
				keyboardType="numeric"
				{...props}
			/>
		);
	}
);

export { CurrencyInput };
