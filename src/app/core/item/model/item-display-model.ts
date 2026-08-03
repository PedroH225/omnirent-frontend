export interface ItemDisplay {
    id: string;
    name: string;
    basePrice: number;
    itemCondition: string;
    itemConditionLabel: string;
    itemStatus: string;
    itemStatusLabel: string;
    subCategoryName: string;
    thumbnailKey: string | null;
    createdAt: string;
}