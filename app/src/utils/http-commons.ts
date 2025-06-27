import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
    timeout: 300000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export const get = async <T>(
    url: string,
    success?: (data: T) => void,
    error?: (error: unknown) => void,
    config?: AxiosRequestConfig
): Promise<void> => {
    try {
        const response = await api.get<T>(url, config);
        success?.(response.data);
    } catch (err) {
        error?.(err);
    }
};

export const post = async <T, R>(
    url: string,
    data: T,
    success?: (data: R) => void,
    error?: (error: unknown) => void,
    config?: AxiosRequestConfig
): Promise<void> => {
    try {
        const response = await api.post<R>(url, data, config);
        success?.(response.data);
    } catch (err) {
        error?.(err);
    }
};
