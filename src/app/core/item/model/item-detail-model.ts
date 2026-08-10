import { SubCategoryResponse } from "@core/categories/model/subcategory.model";
import { UserResponseModel } from "@core/user/model/user-response-model";
import { AddressModel } from "@features/address/model/address-model";
import { ItemImageModel } from "./Item-image-model";

export interface ItemDetailModel {
    id: string;
    name: string;
    brand: string;
    model: string;
    description: string;
    basePrice: number;
    itemCondition: string;
    itemStatus: string;
    subCategory: SubCategoryResponse;
    pickupAddress: AddressModel;
    owner: UserResponseModel;
    createdAt: string;
    updatedAt: string;
    images: ItemImageModel[];
    itemConditionLabel: string;
    itemStatusLabel: string;
    priceData: ItemPriceDataModel;
}

export interface ItemPriceDataModel {
    hourPrice: number;
    dailyPrice: number;
    weeklyPrice: number;
    monthlyPrice: number;
}
