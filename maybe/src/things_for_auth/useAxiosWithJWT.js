import { useEffect } from 'react';

import useRefreshToken from './useRefreshToken';
import { axiosWithJWT } from '../api/axios';
import useAuth from './useAuth';

const useAxiosWithJWT = () => {
    const refresh = useRefreshToken();
    const { auth } = useAuth();

    useEffect(() => {

        //Attach interceptors to the request/response in order to get a token
        const requestInterceptor = axiosWithJWT.interceptors.request.use(

            config => {

                if (!config.headers['Authorization']) {
                    config.headers['Authorization'] = `Bearer ${auth?.accessToken}`;
                }

                return config;

            }, (err) => Promise.reject(err)
        );

        const responseInterceptor = axiosWithJWT.interceptors.response.use(

            //If we get a response (token still valid).
            response => response,

            //If expired
            async (err) => {
                const prevRequest = err?.config;

                if (err?.response?.status === 403 && !prevRequest?.sent) {
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers = { ...prevRequest.headers };
                    prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;

                    return axiosWithJWT(prevRequest);
                }

                return Promise.reject(err);
            }
        );

        // Clear interceptors
        return () => {
            axiosWithJWT.interceptors.request.eject(requestInterceptor);
            axiosWithJWT.interceptors.response.eject(responseInterceptor);
        }

    }, [auth, refresh])

    return axiosWithJWT;
}

export default useAxiosWithJWT;