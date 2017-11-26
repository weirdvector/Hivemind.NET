
export class Login {
    public userId: number;
    public email: string;
    public password: string;
    public userGuid: string;

    public constructor(partial: Partial<Login>) {
        if (partial.userId) {
            this.userId = partial.userId;
        }
        if (partial.email) {
            this.email = partial.email;
        }
        if (partial.password) {
            this.password = partial.password;
        }
        if (partial.userGuid) {
            this.userGuid = partial.userGuid;
        }
    }
}