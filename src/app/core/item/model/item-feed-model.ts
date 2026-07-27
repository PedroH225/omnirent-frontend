export interface ItemFeed {
    id: string;
    name: string;
    itemCondition: string;
    itemConditionLabel: string;
    price: ItemPrice;
    subCategoryName: string;
    createdAt: string;
    owner: ItemOwner;
    thumbnailStorageKey: string | null;
}

export interface ItemPrice {
    hourPrice: number;
    dailyPrice: number;
    weeklyPrice: number;
    monthlyPrice: number;
}

export interface ItemOwner {
    id: string;
    username: string;
}