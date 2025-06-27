import { post } from '@utils/http-commons';

const ALGO_PLUS_MONITORING_API_URL = import.meta.env.VITE_MONITORING_API_URL;

export const updateAlgoPlusInformation = async (
    success?: (data: string) => void,
    error?: (error: unknown) => void
) => {
    post(ALGO_PLUS_MONITORING_API_URL, {}, success, error);
};
