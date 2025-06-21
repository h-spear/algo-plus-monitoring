import { get } from '@utils/http-commons';
import type { ApiCallback } from '@utils/http-commons';
import type { AlgoPlusMonitoringMetrics } from '@types/api';

const ALGO_PLUS_MONITORING_API_URL =
    'https://xiq3phad6a.execute-api.ap-northeast-2.amazonaws.com/default/AlgoPlusMonitoringApi';

export const fetchMonitoringMetrics = async ({
    success,
    error,
}: ApiCallback<AlgoPlusMonitoringMetrics> = {}) => {
    get(ALGO_PLUS_MONITORING_API_URL, {
        success,
        error,
    });
};
