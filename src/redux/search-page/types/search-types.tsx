export interface OptionValues{
    key: string,
    value: string
}

export interface LayoutProperty {
    type: string,
    len: number,
    display: string
    optionValues?: Array<OptionValues>
}

export interface LayoutPropertyMap<T> {
    [property: string]: T 
}

export enum SortTypes {ASC, DES}

export interface LayoutDetails {
    sampleValues?: Array<string>,
    sortedBy: Array<string>,
    sortedType: SortTypes,
    rowsInBatch: number,
    routeToDetail: string
}

export interface SearchCriteria {
    label: string,
    serviceUrl: string,
    fields: Array<string>
}

export interface KeyValueMap<T> {
    [property: string]: T 
}

export interface Layout {
    securityRole: string,
    properties: LayoutPropertyMap<LayoutProperty>,
    searchCriterias: Array<SearchCriteria>,
    details: LayoutDetails,
    resultData: Array<KeyValueMap<string>>,
    loadingUrl: string
}

export enum SearchActionTypes {
    FILTER_RESULT
}