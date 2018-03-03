/*
 * This file is autogenerated. Please see README.md for instructions on editing.
 */
 

export class User {
    public email: string;
    public userGuid: string;
    public userGangIds: any;

    public constructor(partial: Partial<User>) {
        if (partial.email) {
            this.email = partial.email;
        }
        if (partial.userGuid) {
            this.userGuid = partial.userGuid;
        }
        if (partial.userGangIds) {
            this.userGangIds = partial.userGangIds;
        }
    }
}