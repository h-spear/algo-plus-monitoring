export interface ApiResponseTimeMetrics {
    time: Date | string | null;
    compileApiResponseTimeMs: number | null;
    bojSubmitApiResponseTimeMs: number | null;
    jdoodleApiResponseTimeMs: number | null;
    lambdaApiResponseTimeMs: number | null;
    githubApiResponseTimeMs: number | null;
}

export interface ApiUsageMetrics {
    time: string | null;
    jdoodleApiUsage: number | null;
    lambdaApiUsage: number | null;
    userCount: number | null;
}
