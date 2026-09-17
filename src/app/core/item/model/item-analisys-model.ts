import { UserResponseModel } from "@core/user/model/user-response-model";
import { ItemImageModel } from "./Item-image-model";
import { SubCategoryResponse } from "@core/categories/model/subcategory.model";
import { AddressModel } from "@features/address/model/address-model";
import { AddressSummaryModel } from "@core/address/model/address-summary-model";

export interface ItemAnalisysModel {
        id: string;
        name: string;
        brand: string;
        model: string;
        description: string;
        basePrice: number;
        itemCondition: string;
        itemStatus: string;
        subCategory: SubCategoryResponse;
        pickupAddress: AddressSummaryModel;
        owner: UserResponseModel;
        images: ItemImageModel[];
}