export enum EnvName {local = 'local', dev ='dev', sit='sit', uat='sit', prod='prod'};
export enum Region {sg};

export type Env = {
    name: EnvName,
    region: Region,
    api: {
        baseUrl: string,
        authUrl: string,
    }
};