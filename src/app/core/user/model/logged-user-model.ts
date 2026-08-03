export class LoggedUserModel {
    constructor(
        public readonly id: string,
        public readonly username: string,
        public readonly name: string,
        public readonly locale: string,
        public readonly timezone: string
    ) {}
}