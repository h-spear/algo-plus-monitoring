import React, { useContext, useEffect, useState } from 'react';
import ItemWrapper from '@components/base/ItemWrapper/ItemWrapper';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChromeIcon from '@icons/ChromeIcon/ChromeIcon';
import TextWidgetContent from '@components/base/TextWidgetContent/TextWidgetContent';
import RocketIcon from '@icons/RocketIcon/RocketIcon';
import UsageDonutWidget from '@components/composites/UsageDonutWidget/UsageDonutWidget';
import UsageInfo from '@components/base/UsageInfo/UsageInfo';
import HealthCheckWidgetContent from '@components/base/HealthCheckWidgetContent/HealthCheckWidgetContent';
import ApiUsageChart from '@components/composites/ApiUsageChart/ApiUsageChart';
import { colorAlgoplusBlue, colorAlgoplusOrange } from '@themes';
import TimeDisplay from '@components/base/TimeDisplay/TimeDisplay';
import { formatDateTime } from '@utils/date';
import type {
    AwsLambdaMonitoringInfo,
    ChromeWebStoreMonitoringInfo,
    GitHubMonitoringInfo,
    JDoodleApiMonitoringInfo,
} from '@types/api';
import { fetchAlgoPlusInformation } from '@services/firebase';
import { updateAlgoPlusInformation } from '@services/apis/lambda';
import GitHubIssuesDataGrid from '@components/composites/GitHubIssuesDataGrid/GitHubIssuesDataGrid';
import GitHubInfoContent from '@components/composites/GitHubInfoContent/GitHubInfoContent';
import type { HealthCheckData } from '@types/api';
import { fetchHealthCheckData } from '@services/firebase';
import type { AlgoPlusInformation } from '@types/api';
import CloudUploadRoundedIcon from '@mui/icons-material/CloudUploadRounded';
import LightModeRoundedIcon from '@mui/icons-material/LightModeRounded';
import { AuthContext } from '@/auth/AuthContext';
import { Button } from '@mui/material';

const Dashboard = () => {
    const [githubInfo, setGithubInfo] = useState<GitHubMonitoringInfo | null>(
        {}
    );
    const [awsLambdaInfo, setAwsLambdaInfo] =
        useState<AwsLambdaMonitoringInfo | null>({});
    const [jdoodleApiInfo, setJDoodleApiInfo] =
        useState<JDoodleApiMonitoringInfo | null>({});
    const [chromeWebStoreInfo, setChromeWebStoreInfo] =
        useState<ChromeWebStoreMonitoringInfo | null>({});
    const [lastUpdatedTime, setLastUpdatedTime] = useState<Date | null>(null);
    const [healthCheckData, setHealthCheckData] =
        useState<HealthCheckData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const auth = useContext<AuthContext>(AuthContext);

    const loadData = () => {
        fetchAlgoPlusInformation(
            (data: AlgoPlusInformation) => {
                setGithubInfo(data.github);
                setAwsLambdaInfo(data.awsLambda);
                setJDoodleApiInfo(data.jdoodleApi);
                setChromeWebStoreInfo(data.chromeWebStore);
                setLastUpdatedTime(new Date(data.timestamp.seconds * 1000));
                setLoading(false);
            },
            (err: Error) => {
                console.error(err);
            }
        );
        fetchHealthCheckData(
            (data: HealthCheckData) => {
                setHealthCheckData(data);
            },
            (err: Error) => {
                console.error(err);
            }
        );
    };

    const flushData = () => {
        setLoading(true);
        setGithubInfo({});
        setAwsLambdaInfo({});
        setJDoodleApiInfo({});
        setChromeWebStoreInfo({});
        setLastUpdatedTime(null);
        setHealthCheckData(null);
    };

    const updateData = () => {
        flushData();
        updateAlgoPlusInformation(
            (data: AlgoPlusInformation) => {
                console.log(data);
                if (data === 'ok') {
                    loadData();
                }
            },
            (err: Error) => {
                console.error(err);
            }
        );
    };

    useEffect(() => {
        loadData();
    }, []);

    return (
        <div className='bg-white max-w-340 min-w-90 w-full m-6 py-4 px-6'>
            <div className='flex justify-between flex-col items-center pb-2 sm:items-start sm:flex-row sm:pb-0'>
                <h1 className='text-3xl font-bold mb-4 font-mono group relative cursor-pointer'>
                    Dashboard
                    <div className='hidden group-hover:flex absolute w-50 h-20 justify-center items-center'>
                        <div className='w-full bg-green-900 absolute top-0 left-0 h-full group-hover:opacity-30 rounded-b-xl rounded-tr-xl'></div>
                        <Button
                            onClick={() => auth.logout()}
                            variant='contained'
                            color='success'
                            sx={{ width: '120px' }}
                        >
                            LOGOUT
                        </Button>
                    </div>
                </h1>
                <div className='flex items-center gap-2'>
                    <button
                        disabled={loading}
                        className={`text-xs border-1 rounded-xl px-2 h-4 flex items-center justify-center transition-all ${
                            loading
                                ? 'text-gray-300 bg-gray-100 border-gray-300 cursor-none'
                                : 'text-blue-900 bg-blue-100 border-blue-300 hover:bg-blue-400 hover:text-white '
                        }`}
                        onClick={() => updateData()}
                    >
                        데이터 갱신
                    </button>
                    <TimeDisplay
                        className='w-36'
                        text={loading ? '' : formatDateTime(lastUpdatedTime)}
                    />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<PersonRoundedIcon fontSize='inherit' />}
                        iconClass='mb-1'
                        text={chromeWebStoreInfo?.users}
                        textClass='text-3xl'
                        unit='사용자'
                    />
                </ItemWrapper>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://chromewebstore.google.com/detail/algo-plus/egomkekembecbmlmmoflfdaobgkliiid/reviews'
                >
                    <TextWidgetContent
                        icon={<GradeRoundedIcon fontSize='inherit' />}
                        iconClass='text-yellow-500'
                        text={chromeWebStoreInfo?.rating}
                        textClass='text-4xl'
                        unit={`평점 ${
                            chromeWebStoreInfo.comment
                                ? chromeWebStoreInfo.comment + '개'
                                : ''
                        }`}
                    />
                </ItemWrapper>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://github.com/algo-plus'
                >
                    <TextWidgetContent
                        icon={<GitHubIcon fontSize='inherit' />}
                        iconClass='mb-2'
                        text={githubInfo?.version}
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://chromewebstore.google.com/detail/algo-plus/egomkekembecbmlmmoflfdaobgkliiid'
                >
                    <TextWidgetContent
                        icon={<ChromeIcon size={28} />}
                        iconClass='mr-1.5'
                        text={chromeWebStoreInfo?.version}
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://github.com/algo-plus/algo-plus/graphs/contributors'
                >
                    <TextWidgetContent
                        icon={<RocketIcon fontSize={28} />}
                        iconClass='mb-1'
                        text={
                            githubInfo?.contributorsCount
                                ? `${githubInfo.contributorsCount}명`
                                : null
                        }
                        textClass='text-3xl'
                        unit='기여자'
                    />
                </ItemWrapper>
            </div>
            <div className='flex flex-wrap'>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://www.jdoodle.com/'
                >
                    <UsageDonutWidget
                        loading={loading}
                        title={
                            <div className='flex flex-col items-center'>
                                <h3 className='text-xl font-bold'>
                                    JDoodle API 사용량
                                </h3>
                                <span className='text-gray-600'>
                                    매일 9시 초기화
                                </span>
                            </div>
                        }
                        value={jdoodleApiInfo?.creditSpentPerDay}
                        min={0}
                        max={jdoodleApiInfo?.maxCreditPerDay}
                        className='h-80 min-w-60'
                        color={colorAlgoplusOrange}
                        description={
                            <UsageInfo
                                text={
                                    jdoodleApiInfo?.creditSpentPerDay &&
                                    jdoodleApiInfo?.maxCreditPerDay
                                        ? `${(
                                              (jdoodleApiInfo.creditSpentPerDay /
                                                  jdoodleApiInfo.maxCreditPerDay) *
                                              100
                                          ).toFixed(1)}%`
                                        : ''
                                }
                                caption1={
                                    jdoodleApiInfo?.maxCreditPerDay
                                        ? `${jdoodleApiInfo.maxCreditPerDay.toLocaleString()}회 / 1일`
                                        : ''
                                }
                                caption2={
                                    jdoodleApiInfo?.maxCreditPerDay
                                        ? '총 사용 가능한 크레딧'
                                        : null
                                }
                            />
                        }
                    />
                </ItemWrapper>
                <ItemWrapper
                    className='flex-1/5'
                    link='https://ap-northeast-2.console.aws.amazon.com/cloudwatch/home?region=ap-northeast-2#home:'
                >
                    <UsageDonutWidget
                        loading={loading}
                        title={
                            <div className='flex flex-col items-center'>
                                <h3 className='text-xl font-bold'>
                                    AWS Lambda 사용량
                                </h3>
                                <span className='text-gray-600'>
                                    매월 1일 자정 초기화
                                </span>
                            </div>
                        }
                        value={awsLambdaInfo?.totalInvocations}
                        min={0}
                        max={awsLambdaInfo?.freeTierLimit}
                        className='h-80 min-w-60'
                        color={colorAlgoplusBlue}
                        description={
                            <UsageInfo
                                text={
                                    awsLambdaInfo?.totalInvocations &&
                                    awsLambdaInfo?.freeTierLimit
                                        ? `${(
                                              (awsLambdaInfo.totalInvocations /
                                                  awsLambdaInfo.freeTierLimit) *
                                              100
                                          ).toFixed(1)}%`
                                        : ''
                                }
                                caption1={
                                    awsLambdaInfo?.freeTierLimit
                                        ? `${awsLambdaInfo.freeTierLimit.toLocaleString()}회 / 1개월`
                                        : ''
                                }
                                caption2={
                                    awsLambdaInfo?.freeTierLimit
                                        ? '무료 할당량'
                                        : null
                                }
                            />
                        }
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-3/5'>
                    <ApiUsageChart
                        className='w-full pt-2 h-80'
                        loading={loading}
                    />
                </ItemWrapper>
            </div>

            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-2/5' outline={false}>
                    <div className='flex w-full flex-col sm:flex-row'>
                        <div className='flex flex-1/2 flex-col'>
                            <ItemWrapper
                                className='flex-1/2'
                                link='https://ap-northeast-2.console.aws.amazon.com/lambda/home?region=ap-northeast-2#/functions/AlgoPlusCompiler?subtab=triggers&tab=code'
                            >
                                <div className='flex flex-col w-full'>
                                    <p
                                        className={`text-gray-400 font-thin flex items-center w-full pl-2 pt-2 `}
                                    >
                                        <CloudUploadRoundedIcon fontSize='inherit' />
                                        <span className='ml-1 text-xs'>
                                            알고플러스 컴파일 API
                                        </span>
                                    </p>
                                    <div className='w-full flex justify-center'>
                                        <HealthCheckWidgetContent
                                            data={
                                                healthCheckData?.algoPlusCompiler
                                            }
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            </ItemWrapper>
                            <ItemWrapper
                                className='flex-1/2'
                                link='https://www.jdoodle.com/'
                            >
                                <div className='flex flex-col w-full'>
                                    <p
                                        className={`text-gray-400 font-thin flex items-center w-full pl-2 pt-2 `}
                                    >
                                        <LightModeRoundedIcon fontSize='inherit' />
                                        <span className='ml-1 text-xs'>
                                            JDoodle 컴파일 API
                                        </span>
                                    </p>
                                    <div className='w-full flex justify-center'>
                                        <HealthCheckWidgetContent
                                            data={
                                                healthCheckData?.jdoodleCompiler
                                            }
                                            loading={loading}
                                        />
                                    </div>
                                </div>
                            </ItemWrapper>
                        </div>
                        <div className='flex flex-1/2 flex-col'>
                            <ItemWrapper className='flex-1/2'>
                                <GitHubInfoContent
                                    data={githubInfo}
                                    loading={loading}
                                    className='h-84'
                                />
                            </ItemWrapper>
                        </div>
                    </div>
                </ItemWrapper>
                <ItemWrapper className='flex-3/5'>
                    <GitHubIssuesDataGrid
                        data={githubInfo.bugIssues}
                        className='h-84'
                    />
                </ItemWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
