import {createSelector} from 'reselect';

const getLayout = (state:any)=>state.layout;

export const selectSearchLayout = createSelector(
    [getLayout],
    layout => layout
)