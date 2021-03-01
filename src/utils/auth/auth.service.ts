import {authAPiClient} from '../api/api.client';
import {AuthenticationCredentials, AuthenticationResponse} from './auth.type';

const UAA_SERVER_URL = '';

export async function authenticate(credential: AuthenticationCredentials)
    :Promise<AuthenticationResponse> {

    const response = await authAPiClient.post<AuthenticationResponse> (
        UAA_SERVER_URL,
        credential,
        {
            headers: {
                contentType: 'application/json',
                accepts: 'application/json'
            },
        }
    );

    return response.data;
}
