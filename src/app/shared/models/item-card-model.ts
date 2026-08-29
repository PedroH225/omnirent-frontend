export interface ItemFeedCardModel {
    id: string;
    name: string;
    condition: string;
    conditionLabel: string;
    categoryLabel?: string;
    price: {
        dailyPrice: number;
    };
    imageUrl?: string;
}