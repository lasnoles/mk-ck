import {Layout, SortTypes} from '../redux/search-page/types/search-types';

const outstandingContractLayout: Layout =
{
    entityName: 'Outstanding Contract',
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

export default outstandingContractLayout;