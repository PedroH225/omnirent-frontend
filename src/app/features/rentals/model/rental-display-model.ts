export class RentalDisplayModel {
  constructor(
    public readonly id: string,
    public readonly startDate: string | null,
    public readonly endDate: string | null,
    public readonly finalPrice: number,
    public readonly rentalStatus: string,
    public readonly rentalPeriod: string,
    public readonly itemSnapshotDto: ItemSnapshotModel,
    public readonly createdAt: string,
    public readonly rentalPeriodLabel: string,
    public readonly rentalStatusLabel: string
  ) {}
}

export class ItemSnapshotModel {
  constructor(
    public readonly id: string,
    public readonly name: string,
    public readonly thumbnailKey: string | null
  ) {}
}