import {Layout, SortTypes} from './types/search-types';

const layout: Layout = {
    securityRole: 'INQUIRY_BROKER_CODE',
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
        },
        'lastModified' : {
            type: 'date',
            len: 20,
            display: 'Last Modified'
        },
        'lastModifiedBy' : {
            type: 'string',
            len: 10,
            display: 'Last Modified By'
        }
    },
    searchCriterias: [
        {label: 'By Borker Code', serviceUrl:'', fields:['brokerCode', 'brokerName']}
    ],
    details: {
        columns: ['brokerCode', 'brokerName', 'lastModified', 'lastModifiedBy'],
        sortedBy: ['brokerCode'],
        sortedType: SortTypes.ASC,
        rowsInBatch: 50,
        routeToDetail: ':brokerCode'
    }
}


const searchLayoutReducer = (state=layout, action:any) =>{
    switch (action.type) {
        
        default:
            return state;
    }
}

export default searchLayoutReducer;

