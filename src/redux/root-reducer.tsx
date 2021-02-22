import {combineReducers} from 'redux';

import {persistReducer } from 'redux-persist';

import storage from 'redux-persist/lib/storage';

import searchLayoutReducer from './search-page/layout-reducer';


const persistConfig = {
    key: 'root',
    storage,
    whitelist: []
}

const rootReducer = combineReducers({
    layout: searchLayoutReducer,
});

export default persistReducer(persistConfig, rootReducer);