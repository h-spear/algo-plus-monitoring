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
import type { ApiUsageLogDto } from '@types/firebase';
import type { ApiUsageMetrics } from '@types/monitoring';
import { fireStore } from '../../firebase';
import type { AlgoPlusInformation } from '../types/api';
import { convertKeysToCamel } from '../utils/naming';

const COLLECTION_ALGOPLUS_INFORMATION = 'algoplus-information';

const getData = async (
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
    getData(
        COLLECTION_ALGOPLUS_INFORMATION,
        'current',
        (data) => success(convertKeysToCamel<AlgoPlusInformation>(data)),
        (err) => error(err)
    );
};

// async function setData(collectionName: string, docId: string, data: object) {
//     const docRef = doc(fireStore, collectionName, docId);
//     await setDoc(docRef, data, { merge: true });
// }

// const convertDateToUsageLogCollectionKey = (date: Date): string => {
//     const year = date.getFullYear();
//     const month = String(date.getMonth() + 1).padStart(2, '0');
//     const day = String(date.getDate()).padStart(2, '0');
//     const hours = String(date.getHours()).padStart(2, '0');
//     return `${year}-${month}-${day}_${hours}`;
// };

// const generateQueryKeys = (startDate: Date, endDate: Date): string[] => {
//     const keys: string[] = [];
//     const current = new Date(startDate);
//     current.setHours(0, 0, 0, 0);
//     const end = new Date(endDate);
//     end.setHours(23, 59, 59, 999);

//     while (current <= end) {
//         for (let hour = 0; hour < 24; hour++) {
//             const date = new Date(current);
//             date.setHours(hour);
//             keys.push(convertDateToUsageLogCollectionKey(date));
//         }
//         current.setDate(current.getDate() + 1);
//     }
//     return keys;
// };

// const getMultipleData = async (docIds: string[]) => {
//     if (docIds.length === 0) return [];

//     const q = query(
//         collection(fireStore, COLLECTION_API_USAGE_LOG),
//         where(documentId(), 'in', docIds)
//     );

//     const querySnapshot = await getDocs(q);
//     return querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         data: doc.data() as ApiUsageLogDto,
//     }));
// };

// const queryUsageLog = async (startDate: Date, endDate: Date) => {
//     try {
//         const keys = generateQueryKeys(startDate, endDate);

//         const chunkSize = 10;
//         const chunks: string[][] = [];
//         for (let i = 0; i < keys.length; i += chunkSize) {
//             chunks.push(keys.slice(i, i + chunkSize));
//         }

//         const results = [];
//         for (const chunk of chunks) {
//             const data = await getMultipleData(chunk);
//             results.push(...data);
//         }
//         return results.map((item) => item.data !== undefined);
//     } catch (error) {
//         console.error('문서 조회 실패:', error);
//         return [];
//     }
// };
