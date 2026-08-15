import { UserResponseModel } from "@core/user/model/user-response-model";
import { AddressModel } from "@features/address/model/address-model";
import { ItemDetailSnapshotModel } from "@features/items/model/item-snapshot-model";

export interface RentalCreatedModel {
    id: string;
    startDate: string | null;
    endDate: string | null;
    finalPrice: number;
    rentalStatus: string;
    rentalPeriod: string;
    item: ItemDetailSnapshotModel;
    address: AddressModel;
    rentalPeriodLabel: string;
    rentalStatusLabel: string;
}