import axios, { type AxiosInstance, type AxiosRequestConfig } from 'axios';

const api: AxiosInstance = axios.create({
    timeout: 30000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export type ApiCallback<T> = {
    success?: (data: T) => void;
    error?: (error: unknown) => void;
};

export const get = async <T>(
    url: string,
    { success, error }: ApiCallback<T> = {},
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
    { success, error }: ApiCallback<R> = {},
    config?: AxiosRequestConfig
): Promise<void> => {
    try {
        const response = await api.post<R>(url, data, config);
        success?.(response.data);
    } catch (err) {
        error?.(err);
    }
};

export const put = async <T, R>(
    url: string,
    data: T,
    { success, error }: ApiCallback<R> = {},
    config?: AxiosRequestConfig
): Promise<void> => {
    try {
        const response = await api.put<R>(url, data, config);
        success?.(response.data);
    } catch (err) {
        error?.(err);
    }
};

export const del = async <T>(
    url: string,
    { success, error }: ApiCallback<T> = {},
    config?: AxiosRequestConfig
): Promise<void> => {
    try {
        const response = await api.delete<T>(url, config);
        success?.(response.data);
    } catch (err) {
        error?.(err);
    }
};
