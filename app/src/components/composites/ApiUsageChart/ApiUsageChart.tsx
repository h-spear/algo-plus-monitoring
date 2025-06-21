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
import { fetchUsageLog } from '@services/firebase';

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

    // const loadData = useCallback(() => {
    //     fetchUsageLog(new Date()).then(setData);
    //     // error 처리 필요
    // }, []);

    // const handlePeriodFilter = useCallback(
    //     (periodFilter: PeriodFilterType) => {
    //         setPeriodFilter(periodFilter);
    //         const now = new Date();
    //         if (periodFilter === 'today') {
    //             setPeriod(formatDate(now));
    //         } else if (periodFilter === 'weekly') {
    //             const dateBefore = getDateBefore(now, 7);
    //             setPeriod(`${dateBefore} ~ ${formatDate(now)}`);
    //         } else if (periodFilter === 'monthly') {
    //             const dateBefore = getDateBefore(now, 30);
    //             setPeriod(`${dateBefore} ~ ${formatDate(now)}`);
    //         }
    //         loadData();
    //     },
    //     [loadData]
    // );

    // useEffect(() => {
    //     setPeriodFilter('today');
    // }, []);

    // useEffect(() => {
    //     handlePeriodFilter(periodFilter);
    // }, [periodFilter, handlePeriodFilter]);

    // useEffect(() => {
    //     setSeries(getSeriesFromData(data));
    // }, [data]);

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
