import {
    collection,
    doc,
    documentId,
    endAt,
    Firestore,
    getDoc,
    getDocs,
    orderBy,
    query,
    QueryConstraint,
    setDoc,
    startAt,
    where,
} from 'firebase/firestore';
import { fireStore } from '../../firebase';
import type { AlgoPlusInformation } from '@types/api';
import { convertKeysToCamel } from '@utils/naming';
import type { ApiUsageMetrics } from '../types/monitoring';

const COLLECTION_ALGOPLUS_INFORMATION = 'algoplus-information';
const COLLECTION_API_USAGE = 'api-usage-metrics';
const COLLECTION_API_DAILY_USAGE = 'api-daily-usage-metrics';

const fetchDocumentById = async (
    collectionName: string,
    docId: string,
    success: (data: Record<string, unknown>) => void,
    error: (err: unknown) => void
): Promise<void> => {
    try {
        const docRef = doc(fireStore, collectionName, docId);
        const docSnap = await getDoc(docRef);
        const data = docSnap.exists()
            ? (docSnap.data() as Record<string, unknown>)
            : {};
        success(data);
    } catch (err) {
        error(err);
    }
};

export const fetchAlgoPlusInformation = async (
    success: (data: AlgoPlusInformation) => void,
    error: (err: unknown) => void
): Promise<void> => {
    fetchDocumentById(
        COLLECTION_ALGOPLUS_INFORMATION,
        'current',
        (data) => success(convertKeysToCamel<AlgoPlusInformation>(data)),
        (err) => error(err)
    );
};

const fetchDocsBetweenDates = async (
    collectionName: string,
    startDate: Date,
    endDate: Date,
    suffix?: string
) => {
    const startId = `${startDate.toISOString().split('T')[0]}${
        suffix ? suffix : ''
    }`;
    endDate.setDate(endDate.getDate() + 1);
    const endId = `${endDate.toISOString().split('T')[0]}${
        suffix ? suffix : ''
    }`;

    const q = query(
        collection(fireStore, collectionName),
        orderBy('__name__'),
        startAt(startId),
        endAt(endId)
    );

    return await getDocs(q);
};

const fetchUsageDocsDate = async (collectionName: string, date: Date) => {
    return fetchDocsBetweenDates(collectionName, date, date, '_09');
};

export const fetchHourlyUsageMetrics = async (
    date: Date,
    success: (data: ApiUsageMetrics[]) => void,
    error: (err: unknown) => void
): Promise<void> => {
    try {
        const querySnapshot = await fetchUsageDocsDate(
            COLLECTION_API_USAGE,
            date
        );
        const results: ApiUsageMetrics[] = new Array(24).fill(null);
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            const index = parseInt(id.split('_')[1]);
            const apiUsageMetrics: ApiUsageMetrics = {
                time: `${id.split('_')[1]}:00`,
                jdoodleApiUsage: data['jdoodle_api_usage'],
                lambdaApiUsage: data['lambda_api_usage'],
                userCount: data['user_count'],
            };
            if (results[index - 9] == null) {
                results[index - 9] = apiUsageMetrics;
            }
        });

        for (let i = 0; i < 24; ++i) {
            if (results[i] == null) {
                results[i] = {
                    time: `${((i + 9) % 24).toString().padStart(2, '0')}:00`,
                    jdoodleApiUsage: 0,
                    lambdaApiUsage: 0,
                    userCount: 0,
                };
            }
        }
        success(results);
    } catch (err) {
        error(err);
    }
};

export const fetchDailyUsageMetrics = async (
    startDate: Date,
    endDate: Date,
    success: (data: ApiUsageMetrics[]) => void,
    error: (err: unknown) => void
): Promise<void> => {
    try {
        const querySnapshot = await fetchDocsBetweenDates(
            COLLECTION_API_DAILY_USAGE,
            startDate,
            endDate
        );
        const map = new Map();
        querySnapshot.forEach((doc) => {
            const id = doc.id;
            const data = doc.data();
            const splited = id.split('_')[0].split('-');
            const formattedTime = splited[1] + '.' + splited[2];
            map.set(id.split('_')[0], {
                time: formattedTime,
                jdoodleApiUsage: data['jdoodle_api_usage'],
                lambdaApiUsage: data['lambda_api_usage'],
                userCount: data['user_count'],
            });
        });

        const results: ApiUsageMetrics[] = [];
        for (
            let d = new Date(startDate);
            d < endDate;
            d.setDate(d.getDate() + 1)
        ) {
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            const key = `${year}-${month}-${day}`;
            const splited = key.split('-');
            const formattedTime = splited[1] + '.' + splited[2];
            const value = map.has(key)
                ? map.get(key)
                : {
                      time: formattedTime,
                      jdoodleApiUsage: 0,
                      lambdaApiUsage: 0,
                      userCount: 0,
                  };
            results.push(value);
        }
        success(results);
    } catch (err) {
        error(err);
    }
};
