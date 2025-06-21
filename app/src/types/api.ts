export type JDoodleApiInfo = {
    creditSpentPerDay: number;
    maxCreditPerDay: number;
};

export type ChromeWebStoreInfo = {
    title: string;
    rating: string;
    comment: number;
    users: number;
    version: string;
    lastUpdatedDate: string;
    fileSize: string;
    provider: string;
    language: string;
};

export type GitHubInfo = {
    id: number;
    nodeId: string;
    name: string;
    url: string;
    description: string;
    stargazersCount: number;
    watchersCount: number;
    forksCount: number;
    openIssuesCount: number;
    openPrCount: number;
    license: string;
    version: string;
    commitsCount: number;
    contributorsCount: number;
    branchesCount: number;
};

export type AwsLambdaFunctionInfo = {
    name: string;
    invocationCount: number;
};

export type AwsLambdaInfo = {
    freeTierLimit: number;
    functions: AwsLambdaFunctionInfo[];
    remainingFree: number;
    totalInvocations: number;
};

export type AlgoPlusInformation = {
    jdoodleApi?: JDoodleApiInfo;
    chromeWebStore?: ChromeWebStoreInfo;
    github?: GitHubInfo;
    awsLambda?: AwsLambdaInfo;
};
