import {UserActionTypes, User} from './types/user-types';

export const setCurrentUser = (user: User) =>({
    type: UserActionTypes.SET_CURRENT_USER,
    payload: user
});


export const login = (user: User) => {
    return {
        type: UserActionTypes.LOGIN,
        payload: user
    }
}

export const logout = (user: User) => {
    return {
        type: UserActionTypes.LOGOUT,
        payload: user
    }
}