export interface ItemCardModel {
    id: string;
    name: string;
    conditionLabel: string;
    categoryLabel?: string;
    price: {
        dailyPrice: number;
    };
    imageUrl?: string;
}