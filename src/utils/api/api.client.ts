import axios, {AxiosError, AxiosInstance} from  'axios';
import applyConverters from "axios-case-converter";
import {useAuthTokenInterceptor as applyAuthTokenInterceptor} from 'axios-jwt';
import { API_MS_TIMEOUT, BASE_API_ENDPOINT, BASE_AUTH_API_ENDPOINT } from "./api.const";
import {ErrorData} from './api.type';
import { identity} from '../function';

const NETWORK_ERROR_CODE = 0;
const REQUEST_TIME_OUT_CODE = 408;

const getApiError = (error: AxiosError<ErrorData>) => {
    if (error.code === 'ECONNABORTED') {
        return {status: REQUEST_TIME_OUT_CODE};
    }

    if (error.response) {
        return error.response;
    }

    return {status: NETWORK_ERROR_CODE};
}

const reThrowAsAPiError = (error: AxiosError<ErrorData>) => {
    throw getApiError(error);
}

const applyApiErrorInterceptor = (apiClient: AxiosInstance) => {
    apiClient.interceptors.response.use(identity(), reThrowAsAPiError)
}

export const axiosClientFactory = (url: string) => {
    const apiClient: AxiosInstance = axios.create({
        baseURL: url,
        timeout: API_MS_TIMEOUT
    });

    applyConverters(apiClient as any);
    applyApiErrorInterceptor (apiClient);
    return apiClient;
};

const secure = (apiClient: AxiosInstance) => {
    applyAuthTokenInterceptor(apiClient, {requestRefresh: ()=> Promise.resolve('')});
    return apiClient;
}

export const securedApiClient: AxiosInstance = secure(axiosClientFactory(BASE_API_ENDPOINT));
export const authAPiClient: AxiosInstance = axiosClientFactory(BASE_AUTH_API_ENDPOINT);