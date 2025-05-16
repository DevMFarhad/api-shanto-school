export interface ILoginPayload {
    id: string;
    password: string;
}

export interface IChangePassword {
    oldPassword: string;
    newPassword: string;
}
