import React, { useCallback, useEffect, useState } from 'react';
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
import { ApiUsageMetrics } from '@types/monitoring';
import { FormControl, MenuItem, Select } from '@mui/material';
import TimeDisplay from '@components/base/TimeDisplay/TimeDisplay';
import { formatDate, getDateBefore } from '@utils/date';

const dummyData: ApiUsageMetrics[] = [
    {
        time: '00:00',
        jdoodleApiUsage: 651,
        lambdaApiUsage: 263,
        userCount: 288,
    },
    {
        time: '01:00',
        jdoodleApiUsage: 564,
        lambdaApiUsage: 557,
        userCount: 279,
    },
    {
        time: '02:00',
        jdoodleApiUsage: 261,
        lambdaApiUsage: 214,
        userCount: 283,
    },
    {
        time: '03:00',
        jdoodleApiUsage: 422,
        lambdaApiUsage: 252,
        userCount: 269,
    },
    {
        time: '04:00',
        jdoodleApiUsage: 539,
        lambdaApiUsage: 722,
        userCount: 294,
    },
    {
        time: '05:00',
        jdoodleApiUsage: 706,
        lambdaApiUsage: 365,
        userCount: 271,
    },
    {
        time: '06:00',
        jdoodleApiUsage: 786,
        lambdaApiUsage: 228,
        userCount: 263,
    },
    {
        time: '07:00',
        jdoodleApiUsage: 720,
        lambdaApiUsage: 281,
        userCount: 252,
    },
    {
        time: '08:00',
        jdoodleApiUsage: 774,
        lambdaApiUsage: 660,
        userCount: 205,
    },
    {
        time: '09:00',
        jdoodleApiUsage: 610,
        lambdaApiUsage: 587,
        userCount: 236,
    },
    {
        time: '10:00',
        jdoodleApiUsage: 324,
        lambdaApiUsage: 730,
        userCount: 274,
    },
    {
        time: '11:00',
        jdoodleApiUsage: 333,
        lambdaApiUsage: 370,
        userCount: 296,
    },
    {
        time: '12:00',
        jdoodleApiUsage: 586,
        lambdaApiUsage: 251,
        userCount: 235,
    },
    {
        time: '13:00',
        jdoodleApiUsage: 343,
        lambdaApiUsage: 242,
        userCount: 205,
    },
    {
        time: '14:00',
        jdoodleApiUsage: 266,
        lambdaApiUsage: 238,
        userCount: 271,
    },
    {
        time: '15:00',
        jdoodleApiUsage: 747,
        lambdaApiUsage: 796,
        userCount: 287,
    },
    {
        time: '16:00',
        jdoodleApiUsage: 412,
        lambdaApiUsage: 771,
        userCount: 248,
    },
    {
        time: '17:00',
        jdoodleApiUsage: 492,
        lambdaApiUsage: 381,
        userCount: 209,
    },
    {
        time: '18:00',
        jdoodleApiUsage: 360,
        lambdaApiUsage: 788,
        userCount: 208,
    },
    {
        time: '19:00',
        jdoodleApiUsage: 671,
        lambdaApiUsage: 581,
        userCount: 231,
    },
    {
        time: '20:00',
        jdoodleApiUsage: 589,
        lambdaApiUsage: 257,
        userCount: 254,
    },
    {
        time: '21:00',
        jdoodleApiUsage: 576,
        lambdaApiUsage: 422,
        userCount: 284,
    },
    {
        time: '22:00',
        jdoodleApiUsage: 450,
        lambdaApiUsage: 757,
        userCount: 267,
    },
    {
        time: '23:00',
        jdoodleApiUsage: 753,
        lambdaApiUsage: 391,
        userCount: 295,
    },
];

type PeriodFilterType = 'today' | 'weekly' | 'monthly' | 'daily';
interface ApiUsageChartProps {
    className?: string;
}

const getSeriesFromData = (data: ApiUsageMetrics[]): AllSeriesType[] => [
    {
        type: 'bar',
        data: data.map((item) => item.userCount),
        label: '사용자',
        yAxisId: 'user',
        color: colorLightGreen,
    },
    {
        type: 'line',
        data: data.map((item) => item.jdoodleApiUsage),
        label: 'JDoodle API 호출 횟수',
        yAxisId: 'callCount',
        color: colorAlgoplusOrange,
    },
    {
        type: 'line',
        data: data.map((item) => item.lambdaApiUsage),
        label: 'AWS Lambda API 호출 횟수',
        yAxisId: 'callCount',
        color: colorAlgoplusBlue,
    },
];

const ApiUsageChart: React.FC<ApiUsageChartProps> = ({ className }) => {
    const [data, setData] = useState<ApiUsageMetrics[]>([]);
    const [series, setSeries] = useState<AllSeriesType[]>([]);
    const [periodFilter, setPeriodFilter] = useState<PeriodFilterType>('today');
    const [period, setPeriod] = useState<string>('');

    const loadData = useCallback(() => {
        setData(dummyData);
    }, []);

    const handlePeriodFilter = useCallback(
        (periodFilter: PeriodFilterType) => {
            setPeriodFilter(periodFilter); // 이 부분은 사실 불필요할 수 있습니다(아래 참고)
            const now = new Date();
            if (periodFilter === 'today') {
                setPeriod(formatDate(now));
            } else if (periodFilter === 'weekly') {
                const dateBefore = getDateBefore(now, 7);
                setPeriod(`${dateBefore} ~ ${formatDate(now)}`);
            } else if (periodFilter === 'monthly') {
                const dateBefore = getDateBefore(now, 30);
                setPeriod(`${dateBefore} ~ ${formatDate(now)}`);
            }
            loadData();
        },
        [loadData]
    );

    useEffect(() => {
        setPeriodFilter('today');
    }, []);

    useEffect(() => {
        handlePeriodFilter(periodFilter);
    }, [periodFilter, handlePeriodFilter]);

    useEffect(() => {
        setSeries(getSeriesFromData(data));
    }, [data]);

    return (
        <div className={`${className}`}>
            <div className='flex justify-between items-center px-3 h-10'>
                <TimeDisplay icon='calendar' text={period} className='h-full' />
                <h1 className='text-xl'></h1>
                <FormControl variant='standard' sx={{ minWidth: 120 }}>
                    <Select
                        value={periodFilter}
                        onChange={(value) =>
                            setPeriodFilter(value.target.value)
                        }
                        size='small'
                        sx={{
                            height: 32,
                            paddingTop: '8px',
                            paddingLeft: '6px',
                            marginBottom: '8px',
                            fontSize: '0.775rem',
                            width: 120,
                        }}
                    >
                        <MenuItem value='today'>오늘</MenuItem>
                        <MenuItem value='weekly'>최근 7일</MenuItem>
                        <MenuItem value='monthly'>최근 30일</MenuItem>
                        <MenuItem value='daily'>날짜 선택</MenuItem>
                    </Select>
                </FormControl>
            </div>
            <ChartContainer
                series={series}
                height={280}
                xAxis={[
                    {
                        id: 'date',
                        data: data.map((x) => x.time),
                        scaleType: 'band',
                    },
                ]}
                yAxis={[
                    {
                        id: 'callCount',
                        scaleType: 'linear',
                        position: 'left',
                        width: 70,
                        min: 0,
                        max: 1000,
                        // valueFormatter: (value) => {
                        //     if (value >= 1000) {
                        //         return `${(value / 1000).toFixed(1)}K`;
                        //     }
                        //     return `${value}`;
                        // },
                    },
                    {
                        id: 'user',
                        scaleType: 'linear',
                        position: 'right',
                        valueFormatter: (value) => `${value}`,
                        width: 50,
                        max: 300,
                    },
                ]}
            >
                <ChartsAxisHighlight x='line' />
                <BarPlot />
                <LinePlot />
                <LineHighlightPlot />
                <ChartsXAxis
                    axisId='date'
                    tickInterval={(value, index) => {
                        return index % 3 === 0;
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
    );
};

export default ApiUsageChart;
