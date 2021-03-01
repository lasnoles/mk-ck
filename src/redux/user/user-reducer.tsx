import {UserActionTypes, User} from './types/user-types';
import { SERVER_URL } from "../../service/env.config";

const INITIAL_STATE = {
    currentUser: null
}

interface Action {
    payload: User
    type: UserActionTypes
}
const userReducer = (state = INITIAL_STATE, action: Action) => {
    switch (action.type) {
        case UserActionTypes.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload,
                access_token: ''
            }
        case UserActionTypes.LOGIN:
            //TODO add logic here:
            return {
                ...state,
                currentUser: action.payload,
                access_token: ''
            }
        default:
            return state;
    }
}

export default userReducer;
