import {Layout, SearchActionTypes, SortTypes} from './types/search-types';

const layout: Layout = {
    securityRole: 'BROKER_INQUIRY',
    properties: {
        'brokerCode' : {
            type: 'string',
            len: 10,
            display: 'Broker Code'
        },
        'brokerName' : {
            type: 'string',
            len: 10,
            display: 'Broker Name'
        }
    },
    searchCriterias: [
        {label: 'By Borker Code', serviceUrl:'', fields:['brokerCode', 'brokerName']}
    ],
    details: {
        sortedBy: ['brokerCode'],
        sortedType: SortTypes.ASC,
        rowsInBatch: 50,
        routeToDetail: ':brokerCode'
    },
    resultData:[],
    loadingUrl: "http://localhost:8080/api/v1/brokers"
}


const searchLayoutReducer = (state=layout, action:any) =>{
    switch (action.type) {
        case SearchActionTypes.FILTER_RESULT:
            return {
                ...state,
                layout: action.payload
            }
        default:
            return state;
    }
}

export default searchLayoutReducer;

