import {Layout, SearchActionTypes} from './types/search-types';

export const searchEntity = (layout:Layout) =>{
    return ({
    type: SearchActionTypes.FILTER_RESULT,
    payload: layout
})};
