import {env} from '../env/env.const';

export const BASE_API_ENDPOINT = `${env.api.baseUrl}/api`;
export const BASE_AUTH_API_ENDPOINT = `${env.api.authUrl}/api`;

export const API_MS_TIMEOUT = 60 * 1000;