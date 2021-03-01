import { ApiError } from "../api/api.type"

export type AuthenticationCredentials = {
    username: string,
    password: string,
    countryCode: string
}

export type AuthenticationResponse = {
    accessToken: string,
    authorities: string[]
}

export type AuthToken = {
    exp: number,
    username: string,
    securityGroups: string[]
}

export type Session = {
    expirationTimestamp: number,
    username: string,
    authorities: string[]
}

export type AuthState = {
    isAuthenticated: boolean,
    isLoading: boolean,
    session?: Session,
    error?: ApiError
}

export type SessionActivation = 'session-active' | 'session-inactive'

export type AuthHook = {
    state: AuthState,
    login: (credential: AuthenticationCredentials) => void,
    logout: () => void
}