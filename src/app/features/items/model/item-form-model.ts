import { CategoryResponse } from "@core/categories/model/category.model";
import { SubCategoryResponse } from "@core/categories/model/subcategory.model";
import { AddressModel } from "@features/address/model/address-model";

export interface ItemFormModel {
    name: string;
    model: string;
    brand: string;
    description: string;
    basePrice: number;
    itemCondition: string;

    category?: CategoryResponse;
    subCategory?: SubCategoryResponse;
    address?: AddressModel;
}