export interface ItemCreatedModel {
    id: string;
    name: string;
    brand: string;
    model: string;
    description: string | null;
    basePrice: number;
    itemCondition: string;
    itemStatus: string;
    itemConditionLabel: string;
    itemStatusLabel: string;
}