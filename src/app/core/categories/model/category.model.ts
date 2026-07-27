import { SubCategoryResponse } from "./subcategory.model";

export interface CategoryResponse {
    id: string;
    name: string;
    categoryLabel: string;
    subCategories: SubCategoryResponse[];
}
