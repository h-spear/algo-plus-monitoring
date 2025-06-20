import React from 'react';
import ItemWrapper from '@components/ItemWrapper/ItemWrapper';
import PersonRoundedIcon from '@mui/icons-material/PersonRounded';
import GradeRoundedIcon from '@mui/icons-material/GradeRounded';
import GitHubIcon from '@mui/icons-material/GitHub';
import ChromeIcon from '@icons/ChromeIcon/ChromeIcon';
import TextWidgetContent from '@components/TextWidgetContent/TextWidgetContent';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';

import { ChartContainer } from '@mui/x-charts/ChartContainer';
import { ChartsXAxis } from '@mui/x-charts/ChartsXAxis';
import { ChartsYAxis } from '@mui/x-charts/ChartsYAxis';
import { ChartsTooltip } from '@mui/x-charts/ChartsTooltip';
import { ChartsAxisHighlight } from '@mui/x-charts/ChartsAxisHighlight';
import { LineHighlightPlot, LinePlot } from '@mui/x-charts/LineChart';
import { BarPlot, type AllSeriesType } from '@mui/x-charts';
import {
    colorAlgoplusBlue,
    colorAlgoplusOrange,
    colorLightGreen,
} from '@themes';
import RocketIcon from '@icons/RocketIcon/RocketIcon';
import UsageDonutWidget from '../UsageDonutWidget/UsageDonutWidget';
import UsageInfo from '../UsageInfo/UserInfo';
import TimeDisplay from '../TimeDisplay/TimeDisplay';

interface DailyData {
    date: string;
    jdoodleApiCallCount: number;
    lambdaApiCallCount: number;
    user: number;
}

const generateRandomData = (): DailyData[] => {
    const today = new Date('2025-06-20');
    const result: DailyData[] = [];
    for (let i = 0; i < 31; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - 30 + i);
        result.push({
            date: date.toISOString().split('T')[0],
            jdoodleApiCallCount: Math.floor(Math.random() * (2000 - 1500 + 1)),
            lambdaApiCallCount: Math.floor(Math.random() * (2000 - 1500 + 1)),
            user: Math.floor(Math.random() * (250 - 200 + 1)) + 200,
        });
    }
    return result;
};

const alphabetStock: DailyData[] = generateRandomData();
const series: AllSeriesType[] = [
    {
        type: 'bar',
        data: alphabetStock.map((item) => item.user),
        label: '사용자',
        yAxisId: 'user',
        color: colorLightGreen,
    },
    {
        type: 'line',
        data: alphabetStock.map((item) => item.jdoodleApiCallCount),
        label: 'JDoodle API 호출 횟수',
        yAxisId: 'callCount',
        color: colorAlgoplusOrange,
    },
    {
        type: 'line',
        data: alphabetStock.map((item) => item.lambdaApiCallCount as number),
        label: 'AWS Lambda API 호출 횟수',
        yAxisId: 'callCount',
        color: colorAlgoplusBlue,
    },
];

const Dashboard = () => {
    return (
        <div className='bg-white max-w-f8c537 min-w-90 w-full m-6 py-4 px-6'>
            <h1 className='text-3xl font-bold mb-4'>Dashboard</h1>
            <div className='flex flex-wrap'>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<PersonRoundedIcon fontSize='inherit' />}
                        iconClass='mb-1'
                        text='212명'
                        textClass='text-3xl'
                        unit='사용자'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<GradeRoundedIcon fontSize='inherit' />}
                        iconClass='text-yellow-500'
                        text='5.0'
                        textClass='text-4xl'
                        unit='평점'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<GitHubIcon fontSize='inherit' />}
                        iconClass='mb-2'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
                    <TextWidgetContent
                        icon={<ChromeIcon size={28} />}
                        iconClass='mr-1.5'
                        text='1.0.9'
                        textClass='text-3xl'
                        unit='버전'
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-1/6'>
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
                                caption2='총 사용 가능한 크레딧'
                            />
                        }
                    />
                </ItemWrapper>
                <ItemWrapper className='flex-3/5'>
                    <div className='w-full pt-2 h-80'>
                        <ChartContainer
                            series={series}
                            height={320}
                            xAxis={[
                                {
                                    id: 'date',
                                    data: alphabetStock.map(
                                        (day) => new Date(day.date)
                                    ),
                                    scaleType: 'band',
                                    valueFormatter: (value) =>
                                        value.toLocaleDateString(),
                                    height: 40,
                                },
                            ]}
                            yAxis={[
                                {
                                    id: 'callCount',
                                    scaleType: 'linear',
                                    position: 'left',
                                    width: 50,
                                    min: 0,
                                    max: 2000,
                                    valueFormatter: (value) => {
                                        if (value >= 1000) {
                                            return `${(value / 1000).toFixed(
                                                1
                                            )}K`;
                                        }
                                        return `${value}`;
                                    },
                                },
                                {
                                    id: 'user',
                                    scaleType: 'linear',
                                    position: 'right',
                                    valueFormatter: (value) => `${value}`,
                                    width: 55,
                                    max: 300,
                                },
                            ]}
                        >
                            <ChartsAxisHighlight x='line' />
                            <BarPlot />
                            <LinePlot />

                            <LineHighlightPlot />
                            <ChartsXAxis
                                label='날짜'
                                axisId='date'
                                tickInterval={(value, index) => {
                                    return index % 5 === 0;
                                }}
                                tickLabelStyle={{
                                    fontSize: 10,
                                }}
                            />
                            <ChartsYAxis
                                label='호출 횟수(회)'
                                axisId='callCount'
                                tickLabelStyle={{ fontSize: 10 }}
                            />
                            <ChartsYAxis
                                label='사용자(명)'
                                axisId='user'
                                tickLabelStyle={{ fontSize: 10 }}
                            />
                            <ChartsTooltip />
                        </ChartContainer>
                    </div>
                </ItemWrapper>
            </div>
        </div>
    );
};

export default Dashboard;
