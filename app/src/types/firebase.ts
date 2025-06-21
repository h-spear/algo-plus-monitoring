export type FirestoreDoc = {
    id: string;
    data: ApiUsageLogDto; // 또는 any, 실제 데이터 구조에 따라
};

export interface ApiUsageLogDto {
    timestamp: Date;
    jdoodleApiUsage: number;
    lambdaApiUsage: number;
    userCount: number;
}
