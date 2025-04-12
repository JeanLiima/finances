import { SwipeListView } from "react-native-swipe-list-view";

import { Transaction } from "@/types/transaction";
import { SwipeOptions } from "@/components/swipe-options";

import { TransactionItem } from "../transaction-item";

type SwipeRowProps = {
	item: Transaction,
	onEdit: VoidFunction,
	onDelete: VoidFunction,
	onPress: VoidFunction,
	rightOpenValue?: number
}

const SwipeRow = ({
	item,
	onEdit,
	onDelete,
	onPress,
	rightOpenValue
}: SwipeRowProps) => {
	return (
		<SwipeListView
			data={[item]}
			keyExtractor={(i) => i.id}
			renderItem={() => (
				<TransactionItem data={item} onViewDetails={onPress} />
			)}
			renderHiddenItem={(_, rowMap) => (
				<SwipeOptions
					itemId={item.id}
					rowMap={rowMap}
					onEdit={onEdit}
					onDelete={onDelete}
				/>
			)}
			swipeToOpenPercent={20}
			rightOpenValue={rightOpenValue ?? -180}
			disableRightSwipe
			disableLeftSwipe={false}
		/>
	);
};

export { SwipeRow }
