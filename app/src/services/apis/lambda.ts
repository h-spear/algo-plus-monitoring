import { post } from '@utils/http-commons';
import type { ApiCallback } from '@utils/http-commons';

const ALGO_PLUS_MONITORING_API_URL =
    'https://xiq3phad6a.execute-api.ap-northeast-2.amazonaws.com/default/AlgoPlusMonitoringApi';

export const updateAlgoPlusInformation = async (
    success?: (data: string) => void,
    error?: (error: unknown) => void
) => {
    post(ALGO_PLUS_MONITORING_API_URL, {}, success, error);
};
