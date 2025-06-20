import React, { useState } from 'react';
import ItemWrapper from '@components/base/ItemWrapper/ItemWrapper';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChromeIcon from '@icons/ChromeIcon/ChromeIcon';
import TextWidgetContent from '@components/base/TextWidgetContent/TextWidgetContent';
import RocketIcon from '@icons/RocketIcon/RocketIcon';
import UsageDonutWidget from '@components/base/UsageDonutWidget/UsageDonutWidget';
import UsageInfo from '@components/base/UsageInfo/UserInfo';
import StatusWidget from '@components/base/StatusWidget/StatusWidget';
import ApiUsageChart from '@components/composites/ApiUsageChart/ApiUsageChart';
import { colorAlgoplusBlue, colorAlgoplusOrange } from '@themes';
import ApiStatusChart from '@components/composites/ApiStatusChart/ApiStatusChart';
import TimeDisplay from '@components/base/TimeDisplay/TimeDisplay';
import { formatDateTime } from '@utils/date';

const Dashboard = () => {
    return (
        <div className='bg-white max-w-340 min-w-90 w-full m-6 py-4 px-6'>
            <div className='flex justify-between items-start'>
                <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
                <div className='flex items-center gap-2'>
                    <button className='text-xs text-blue-900 border-blue-300 border-1 bg-blue-100 rounded-xl px-2 h-4 flex items-center justify-center'>
                        데이터 갱신
                    </button>
                    <TimeDisplay text={formatDateTime(new Date())} />
                </div>
            </div>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<PersonRoundedIcon fontSize='inherit' />}
                        iconClass='mb-1'
                        text='212명'
                        textClass='text-3xl'
                        unit='사용자'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<GradeRoundedIcon fontSize='inherit' />}
                        iconClass='text-yellow-500'
                        text='5.0'
                        textClass='text-4xl'
                        unit='평점'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<GitHubIcon fontSize='inherit' />}
                        iconClass='mb-2'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<ChromeIcon size={28} />}
                        iconClass='mr-1.5'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/5'>
                    <TextWidgetContent
                        icon={<RocketIcon fontSize={28} />}
                        iconClass='mb-1'
                        text='5명'
                        textClass='text-3xl'
                        unit='기여자'
                    />
                </ItemWrapper>
            </div>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-1/5'>
                    <UsageDonutWidget
                        title='JDoodle API 사용량'
                        value={212}
                        min={0}
                        max={2050}
                        className='h-80 min-w-60'
                        color={colorAlgoplusOrange}
                        description={
                            <UsageInfo
                                percent={((212 / 2025) * 100).toFixed(1)}
                                caption1='2,025회 / 1일'
                                caption2='총 사용 가능한 크레딧'
                            />
                        }
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/5'>
                    <UsageDonutWidget
                        title='AWS Lambda 사용량'
                        value={300}
                        min={0}
                        max={1000000}
                        className='h-80 min-w-60'
                        color={colorAlgoplusBlue}
                        description={
                            <UsageInfo
                                percent={((212 / 2025) * 100).toFixed(1)}
                                caption1='1,000,000회 / 1개월'
                                caption2='무료 할당량'
                            />
                        }
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-3/5'>
                    <ApiUsageChart className='w-full pt-2 h-80' />
                </ItemWrapper>
            </div>

            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-2/5' outline={false}>
                    <div className='flex w-full flex-col'>
                        <div className='flex flex-1/2 flex-col sm:flex-row'>
                            <ItemWrapper className='flex-1/2'>
                                <StatusWidget
                                    passed={false}
                                    label='백준 제출 API 상태'
                                    caption='제출 번호 : 12345678'
                                    captionLink='https://naver.com'
                                />
                            </ItemWrapper>
                            <ItemWrapper className='flex-1/2'>
                                <StatusWidget
                                    passed={true}
                                    label='백준 제출 API 상태'
                                    caption='제출 번호 : 12345678'
                                />
                            </ItemWrapper>
                        </div>
                        <div className='flex flex-1/2 flex-col sm:flex-row'>
                            <ItemWrapper className='flex-1/2'>
                                <StatusWidget
                                    passed={true}
                                    label='백준 제출 API 상태'
                                />
                            </ItemWrapper>
                            <ItemWrapper className='flex-1/2'>
                                <StatusWidget
                                    passed={true}
                                    label='백준 제출 API 상태'
                                    caption='제출 번호 : 12345678'
                                    captionLink='https://naver.com'
                                />
                            </ItemWrapper>
                        </div>
                    </div>
                </ItemWrapper>
                <ItemWrapper className='flex-3/5'>
                    <ApiStatusChart className='w-full pt-2 h-84 my-[0.5px]' />
                </ItemWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
