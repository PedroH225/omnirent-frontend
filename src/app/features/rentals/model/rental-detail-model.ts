import { UserResponseModel } from "@core/user/model/user-response-model";
import { AddressModel } from "@features/address/model/address-model";
import { ItemDetailSnapshotModel } from "@features/items/model/item-snapshot-model";

export interface RentalDetailModel {
    id: string;
    startDate: string | null;
    endDate: string | null;
    finalPrice: number;
    rentalStatus: string;
    rentalPeriod: string;
    renter: UserResponseModel;
    owner: UserResponseModel;
    item: ItemDetailSnapshotModel;
    address: AddressModel;
    rentalPeriodLabel: string;
    rentalStatusLabel: string;
}