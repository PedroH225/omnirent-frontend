export class AddressRequestModel {

  constructor(
    public id: string,
    public street: string,
    public number: string,
    public complement: string | null,
    public district: string,
    public city: string,
    public state: string,
    public country: string,
    public zipCode: string,
  ) {}
}