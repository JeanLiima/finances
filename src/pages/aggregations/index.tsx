import { useState } from "react";
import { View } from "react-native";
import { SwipeListView } from "react-native-swipe-list-view";

import { Loading } from "@/components/loading";
import { useAggregations } from "@/hooks/use-aggregations";
import { SwipeOptions } from "@/components/swipe-options";
import { Aggregation } from "@/types/aggregation";

import { AggregationCard } from "./components/aggregation-card";
import { EditAggregationModal } from "./components/edit-aggregation-modal";
import { NewAggregationCard } from "./components/new-aggregation-card";
import { RegisterAggregationModal } from "./components/register-aggregation-modal";
import { styles } from "./styles";

const Aggregations = () => {
	const [isAggregationToRegisterOpen, setIsAggregationToRegisterOpen] = useState<boolean>(false);
	const [aggregationToEdit, setAggregationToEdit] = useState<Aggregation | null>(null);

	const { 
		isLoadingAggregations,
		aggregations,
		onEditAggregation,
		onDeleteAggregation,
		onRegisterAggregation
	} = useAggregations();

	if (isLoadingAggregations) {
		return (
			<Loading />
		);
	}

	return (
		<View style={styles.container}>
			<SwipeListView
				style={styles.list}
				data={aggregations}
				keyExtractor={(item) => item.id}
				renderItem={({ item }) => <AggregationCard aggregation={item} />}
				renderHiddenItem={({ item }, rowMap) => (
					<SwipeOptions
						itemId={item.id}
						rowMap={rowMap}
						onEdit={() => setAggregationToEdit(item)}
						onDelete={() => onDeleteAggregation(item.id)}
					/>
				)}
				ListFooterComponent={<NewAggregationCard onNew={() => setIsAggregationToRegisterOpen(true)}/>}
				swipeToOpenPercent={20}
				rightOpenValue={-165}
				disableRightSwipe
				showsVerticalScrollIndicator={false}
			/>
			<EditAggregationModal 
				data={aggregationToEdit} 
				onSubmit={onEditAggregation}
				onClose={() => setAggregationToEdit(null)}
			/>
			<RegisterAggregationModal 
				isOpen={isAggregationToRegisterOpen}
				onSubmit={onRegisterAggregation}
				onClose={() => setIsAggregationToRegisterOpen(false)}
			/>
		</View>
	);
};

export { Aggregations };
