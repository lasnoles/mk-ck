import {combineReducers} from 'redux';

import {persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import searchLayoutReducer from './search-page/layout-reducer';
import userReducer from './user/user-reducer'
import {reducer as oidcReducer} from 'redux-oidc';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    layout: searchLayoutReducer,
    user: userReducer,
    oidc: oidcReducer
});

export default persistReducer(persistConfig, rootReducer);