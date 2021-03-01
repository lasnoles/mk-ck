

export interface User {
    name: string,
    password?: string,
    isAuthUser: boolean,
    securityGroup?: string
}

export enum UserActionTypes{
    SET_CURRENT_USER, LOGIN, LOGOUT
}