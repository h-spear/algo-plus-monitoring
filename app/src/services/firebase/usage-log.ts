import {
    collection,
    doc,
    documentId,
    getDoc,
    getDocs,
    query,
    setDoc,
    where,
} from 'firebase/firestore';
import { fireStore } from '../../../firebase';
import type { ApiUsageLogDto } from '@types/firebase';
import type { ApiUsageMetrics } from '@types/monitoring';

const COLLECTION_API_USAGE_LOG = 'api-usage-log';

async function getData(collectionName: string, docId: string) {
    const docRef = doc(fireStore, collectionName, docId);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
        return docSnap.data();
    }
    return {};
}

async function setData(collectionName: string, docId: string, data: object) {
    const docRef = doc(fireStore, collectionName, docId);
    await setDoc(docRef, data, { merge: true });
}

const convertDateToUsageLogCollectionKey = (date: Date): string => {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    return `${year}-${month}-${day}_${hours}`;
};

const generateQueryKeys = (startDate: Date, endDate: Date): string[] => {
    const keys: string[] = [];
    const current = new Date(startDate);
    current.setHours(0, 0, 0, 0);
    const end = new Date(endDate);
    end.setHours(23, 59, 59, 999);

    while (current <= end) {
        for (let hour = 0; hour < 24; hour++) {
            const date = new Date(current);
            date.setHours(hour);
            keys.push(convertDateToUsageLogCollectionKey(date));
        }
        current.setDate(current.getDate() + 1);
    }
    return keys;
};

const getMultipleData = async (docIds: string[]) => {
    if (docIds.length === 0) return [];

    const q = query(
        collection(fireStore, COLLECTION_API_USAGE_LOG),
        where(documentId(), 'in', docIds)
    );

    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data() as ApiUsageLogDto,
    }));
};

const queryUsageLog = async (startDate: Date, endDate: Date) => {
    try {
        const keys = generateQueryKeys(startDate, endDate);

        const chunkSize = 10;
        const chunks: string[][] = [];
        for (let i = 0; i < keys.length; i += chunkSize) {
            chunks.push(keys.slice(i, i + chunkSize));
        }

        const results = [];
        for (const chunk of chunks) {
            const data = await getMultipleData(chunk);
            results.push(...data);
        }
        return results.map((item) => item.data !== undefined);
    } catch (error) {
        console.error('문서 조회 실패:', error);
        return [];
    }
};

export const fetchUsageLog = async (date: Date): Promise<ApiUsageMetrics[]> => {
    try {
        const keys = [];
        for (let hour = 0; hour < 24; hour++) {
            date.setHours(hour);
            keys.push(convertDateToUsageLogCollectionKey(date));
        }

        const chunkSize = 10;
        const chunks: string[][] = [];
        for (let i = 0; i < keys.length; i += chunkSize) {
            chunks.push(keys.slice(i, i + chunkSize));
        }

        const results = [];
        for (const chunk of chunks) {
            const data = await getMultipleData(chunk);
            results.push(...data);
        }

        const hourMap = new Map<number, object>();
        results.forEach((item) => {
            const hour = parseInt(item.id.split('_')[1]);
            hourMap.set(hour, item.data);
        });

        const filledData: ApiUsageMetrics[] = [];
        for (let hour = 0; hour < 24; hour++) {
            if (hourMap.has(hour)) {
                const data = hourMap.get(hour)! as ApiUsageLogDto;
                filledData.push({
                    time: `${hour.toString().padStart(2, '0')}:00`,
                    jdoodleApiUsage: data.jdoodleApiUsage || 0,
                    lambdaApiUsage: data.lambdaApiUsage || 0,
                    userCount: data.userCount || 0,
                });
            } else {
                filledData.push({
                    time: `${hour.toString().padStart(2, '0')}:00`,
                    jdoodleApiUsage: 0,
                    lambdaApiUsage: 0,
                    userCount: 0,
                });
            }
        }
        return filledData;
    } catch (error) {
        console.error('문서 조회 실패:', error);
        return [];
    }
};

export const saveUsageLog = async (
    date: Date,
    data: ApiUsageLogDto
): Promise<string | null> => {
    try {
        const key = convertDateToUsageLogCollectionKey(date);
        const existingData = getData(COLLECTION_API_USAGE_LOG, key);
        setData(COLLECTION_API_USAGE_LOG, key, { ...existingData, ...data });
        return key;
    } catch (error) {
        console.error('데이터 저장 실패:', error);
        return null;
    }
};
