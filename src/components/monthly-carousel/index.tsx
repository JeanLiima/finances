import { useMemo, useRef, useState } from "react";
import { 
	Dimensions, 
	FlatList, 
	InteractionManager, 
	Text, 
	TouchableOpacity,
	View
} from "react-native";

import { styles } from "./styles";
import { formatYearMonth } from "@/utils/format-to-year-month";

const { width } = Dimensions.get('window');
const ITEMS_VISIBLE = 3;
const SEPARATOR_WIDTH = 8;
const ITEM_WIDTH = (width - SEPARATOR_WIDTH * (ITEMS_VISIBLE - 1)) / ITEMS_VISIBLE;
const ITEM_TOTAL_WIDTH = ITEM_WIDTH + SEPARATOR_WIDTH;

const formatMonth = (date: Date, currentYear: number) => {
  const monthNames = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dec'];
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return year === currentYear ? month : `${month} / ${String(year).slice(2)}`;
};

const generateMonths = () => {
  const now = new Date();
  const currentMonthIndex = now.getMonth();
  const currentYear = now.getFullYear();

  const monthsBehind = 6;
  const monthAhead = 12;
  const months: { label: string; date: Date }[] = [];

  for (let i = -monthsBehind; i <= monthAhead; i++) {
    const date = new Date(currentYear, currentMonthIndex + i, 1);
    months.push({
      date,
      label: formatMonth(date, currentYear),
    });
  }

  return months;
};

interface MonthlyCarouselProps {
	initialSelectedDate?: Date,
	onSelect: (yearMonth: string) => void
}

const MonthlyCarousel = ({
	onSelect, 
	initialSelectedDate = new Date()
}: MonthlyCarouselProps) => {
	const flatListRef = useRef<FlatList>(null);
	const months = useMemo(() => generateMonths(), []);

	const findInitialIndex = (date: Date | undefined) => {
		if (!date) return new Date().getMonth(); 
		const index = months.findIndex(
		  m => m.date.getMonth() === date.getMonth() &&
			   m.date.getFullYear() === date.getFullYear()
		);
		return index !== -1 ? index : 6;
	};
	
	const [selectedIndex, setSelectedIndex] = useState(() => findInitialIndex(initialSelectedDate));

	return (
		<View style={styles.container}>
			<FlatList
				style={styles.monthList}
				ref={flatListRef}
				data={months}
				horizontal
				keyExtractor={(_, idx) => idx.toString()}
				showsHorizontalScrollIndicator={false}
				decelerationRate="fast"
				snapToAlignment="center"
				snapToInterval={ITEM_TOTAL_WIDTH}
				contentContainerStyle={{
				  paddingHorizontal: (width - ITEM_TOTAL_WIDTH) / 2,
				}}
				initialScrollIndex={selectedIndex}
				getItemLayout={(_, index) => ({
					length: ITEM_TOTAL_WIDTH,
					offset: ITEM_TOTAL_WIDTH * index,
					index,
				})}
				renderItem={({ item, index }) => {
					const isSelected = index === selectedIndex;
					
					return (
						<TouchableOpacity
							style={[
								{ width: ITEM_WIDTH },
								styles.monthItem,
								isSelected && styles.selectedMonthItem,
							]}
							onPress={() => {
								setSelectedIndex(index);
								onSelect(formatYearMonth(item.date));
								InteractionManager.runAfterInteractions(() => {
									flatListRef.current?.scrollToIndex({ index, animated: true });
								});
							}}
						>
						<Text
							style={[
								styles.monthText,
								isSelected && styles.selectedMonthText,
							]}
						>
							{item.label}
						</Text>
					</TouchableOpacity>
					);
				}}
				ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
			/>
		</View>
	);
};

export { MonthlyCarousel };
