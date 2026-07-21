
export class AuthModel {
  constructor(
    public email: string,
    public password: string
  ) {}
}

export class TokenResponse {
    constructor(
        public token: string
    ) {}
}