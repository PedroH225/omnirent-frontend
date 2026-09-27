export interface ItemFormDraft {
  name: string;
  model: string;
  brand: string;
  description: string;
  basePrice: number;
  itemCondition?: string;

  categoryId?: string;
  subCategoryId?: string;
  addressId?: string;
}