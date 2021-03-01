import { Env, EnvName, Region } from "./env.type";


export const env: Env = {
    name: process.env.REACT_APP__ENV as EnvName || EnvName.local,
    region: Region.sg,
    api: {
        baseUrl: process.env.REACT_APP__API_URL || 'httpL//localhost:8080',
        authUrl: process.env.REACT_APP__AUTH_API_URL || 'httpL//localhost:8080'
    }
}