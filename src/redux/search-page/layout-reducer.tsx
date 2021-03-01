import {Layout, SearchActionTypes, SortTypes} from './types/search-types';

let layout: Layout = {
    entityName: 'Broker',
    securityRole: 'BROKER_INQUIRY',
    properties: {
        'brokerCode' : {
            type: 'string',
            len: 10,
            display: 'Broker Code',
            changable: false,
            isAuditField: false
        },
        'brokerName' : {
            type: 'string',
            len: 10,
            display: 'Broker Name',
            changable: true,
            isAuditField: false
        },
        'createdBy': {
            type: 'string',
            len: 20,
            display: 'Created By',
            changable: false,
            isAuditField: true
        },
        'createdOn': {
            type: 'string',
            len: 20,
            display: 'Created On',
            changable: false,
            isAuditField: true
        },
        'approvedBy': {
            type: 'string',
            len: 20,
            display: 'Approved By',
            changable: false,
            isAuditField: true
        },
        'approvedOn': {
            type: 'string',
            len: 20,
            display: 'Approved On',
            changable: false,
            isAuditField: true
        },
    },
    searchCriterias: [
        {label: 'By Borker Code', serviceUrl:'', fields:['brokerCode']}
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

interface Action {
    payload:any,
    type: SearchActionTypes
}

const searchLayoutReducer = (state=layout, action:Action) =>{
    switch (action.type) {
        case SearchActionTypes.RESET_LAYOUT:
            return action.payload
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

