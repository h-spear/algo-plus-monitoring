import React, { useEffect, useState } from 'react';
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
import { ApiResponseTimeMetrics } from '@types/monitoring';
import { formatMonthDay } from '@utils/date';

const dummyData: ApiResponseTimeMetrics[] = [
    {
        time: '2025-05-23T00:00:00',
        compileApiResponseTimeMs: 371,
        bojSubmitApiResponseTimeMs: 397,
        jdoodleApiResponseTimeMs: 280,
        lambdaApiResponseTimeMs: 500,
        githubApiResponseTimeMs: 362,
    },
    {
        time: '2025-05-24T00:00:00',
        compileApiResponseTimeMs: 307,
        bojSubmitApiResponseTimeMs: 208,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 439,
        githubApiResponseTimeMs: 295,
    },
    {
        time: '2025-05-25T00:00:00',
        compileApiResponseTimeMs: 191,
        bojSubmitApiResponseTimeMs: 63,
        jdoodleApiResponseTimeMs: 116,
        lambdaApiResponseTimeMs: 55,
        githubApiResponseTimeMs: 65,
    },
    {
        time: '2025-05-26T00:00:00',
        compileApiResponseTimeMs: 268,
        bojSubmitApiResponseTimeMs: 78,
        jdoodleApiResponseTimeMs: 138,
        lambdaApiResponseTimeMs: 91,
        githubApiResponseTimeMs: 178,
    },
    {
        time: '2025-05-27T00:00:00',
        compileApiResponseTimeMs: 265,
        bojSubmitApiResponseTimeMs: 128,
        jdoodleApiResponseTimeMs: 486,
        lambdaApiResponseTimeMs: 354,
        githubApiResponseTimeMs: 159,
    },
    {
        time: '2025-05-28T00:00:00',
        compileApiResponseTimeMs: 301,
        bojSubmitApiResponseTimeMs: 54,
        jdoodleApiResponseTimeMs: 297,
        lambdaApiResponseTimeMs: 224,
        githubApiResponseTimeMs: 375,
    },
    {
        time: '2025-05-29T00:00:00',
        compileApiResponseTimeMs: 282,
        bojSubmitApiResponseTimeMs: 100,
        jdoodleApiResponseTimeMs: 325,
        lambdaApiResponseTimeMs: 73,
        githubApiResponseTimeMs: 259,
    },
    {
        time: '2025-05-30T00:00:00',
        compileApiResponseTimeMs: 241,
        bojSubmitApiResponseTimeMs: 100,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 274,
        githubApiResponseTimeMs: 100,
    },
    {
        time: '2025-05-31T00:00:00',
        compileApiResponseTimeMs: 382,
        bojSubmitApiResponseTimeMs: 91,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 320,
        githubApiResponseTimeMs: 278,
    },
    {
        time: '2025-06-01T00:00:00',
        compileApiResponseTimeMs: 411,
        bojSubmitApiResponseTimeMs: 111,
        jdoodleApiResponseTimeMs: 278,
        lambdaApiResponseTimeMs: 150,
        githubApiResponseTimeMs: 145,
    },
    {
        time: '2025-06-02T00:00:00',
        compileApiResponseTimeMs: 349,
        bojSubmitApiResponseTimeMs: 100,
        jdoodleApiResponseTimeMs: 231,
        lambdaApiResponseTimeMs: 210,
        githubApiResponseTimeMs: 301,
    },
    {
        time: '2025-06-03T00:00:00',
        compileApiResponseTimeMs: 53,
        bojSubmitApiResponseTimeMs: 303,
        jdoodleApiResponseTimeMs: 65,
        lambdaApiResponseTimeMs: 488,
        githubApiResponseTimeMs: 117,
    },
    {
        time: '2025-06-04T00:00:00',
        compileApiResponseTimeMs: 171,
        bojSubmitApiResponseTimeMs: 204,
        jdoodleApiResponseTimeMs: 430,
        lambdaApiResponseTimeMs: 100,
        githubApiResponseTimeMs: 73,
    },
    {
        time: '2025-06-05T00:00:00',
        compileApiResponseTimeMs: 201,
        bojSubmitApiResponseTimeMs: 316,
        jdoodleApiResponseTimeMs: 174,
        lambdaApiResponseTimeMs: 92,
        githubApiResponseTimeMs: 213,
    },
    {
        time: '2025-06-06T00:00:00',
        compileApiResponseTimeMs: 135,
        bojSubmitApiResponseTimeMs: 371,
        jdoodleApiResponseTimeMs: 112,
        lambdaApiResponseTimeMs: 346,
        githubApiResponseTimeMs: 344,
    },
    {
        time: '2025-06-07T00:00:00',
        compileApiResponseTimeMs: 329,
        bojSubmitApiResponseTimeMs: 407,
        jdoodleApiResponseTimeMs: 450,
        lambdaApiResponseTimeMs: 436,
        githubApiResponseTimeMs: 197,
    },
    {
        time: '2025-06-08T00:00:00',
        compileApiResponseTimeMs: 364,
        bojSubmitApiResponseTimeMs: 80,
        jdoodleApiResponseTimeMs: 433,
        lambdaApiResponseTimeMs: 100,
        githubApiResponseTimeMs: 379,
    },
    {
        time: '2025-06-09T00:00:00',
        compileApiResponseTimeMs: 422,
        bojSubmitApiResponseTimeMs: 498,
        jdoodleApiResponseTimeMs: 491,
        lambdaApiResponseTimeMs: 77,
        githubApiResponseTimeMs: 218,
    },
    {
        time: '2025-06-10T00:00:00',
        compileApiResponseTimeMs: 205,
        bojSubmitApiResponseTimeMs: 270,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 90,
        githubApiResponseTimeMs: 324,
    },
    {
        time: '2025-06-11T00:00:00',
        compileApiResponseTimeMs: 162,
        bojSubmitApiResponseTimeMs: 191,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 225,
        githubApiResponseTimeMs: 199,
    },
    {
        time: '2025-06-12T00:00:00',
        compileApiResponseTimeMs: 463,
        bojSubmitApiResponseTimeMs: 138,
        jdoodleApiResponseTimeMs: 249,
        lambdaApiResponseTimeMs: 100,
        githubApiResponseTimeMs: 153,
    },
    {
        time: '2025-06-13T00:00:00',
        compileApiResponseTimeMs: 349,
        bojSubmitApiResponseTimeMs: 283,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 100,
        githubApiResponseTimeMs: 179,
    },
    {
        time: '2025-06-14T00:00:00',
        compileApiResponseTimeMs: 364,
        bojSubmitApiResponseTimeMs: 331,
        jdoodleApiResponseTimeMs: 246,
        lambdaApiResponseTimeMs: 130,
        githubApiResponseTimeMs: 330,
    },
    {
        time: '2025-06-15T00:00:00',
        compileApiResponseTimeMs: 256,
        bojSubmitApiResponseTimeMs: 433,
        jdoodleApiResponseTimeMs: 100,
        lambdaApiResponseTimeMs: 323,
        githubApiResponseTimeMs: 482,
    },
    {
        time: '2025-06-16T00:00:00',
        compileApiResponseTimeMs: 135,
        bojSubmitApiResponseTimeMs: 436,
        jdoodleApiResponseTimeMs: 389,
        lambdaApiResponseTimeMs: 494,
        githubApiResponseTimeMs: 444,
    },
    {
        time: '2025-06-17T00:00:00',
        compileApiResponseTimeMs: 400,
        bojSubmitApiResponseTimeMs: 131,
        jdoodleApiResponseTimeMs: 207,
        lambdaApiResponseTimeMs: 240,
        githubApiResponseTimeMs: 208,
    },
    {
        time: '2025-06-18T00:00:00',
        compileApiResponseTimeMs: 237,
        bojSubmitApiResponseTimeMs: 228,
        jdoodleApiResponseTimeMs: 54,
        lambdaApiResponseTimeMs: 483,
        githubApiResponseTimeMs: 100,
    },
    {
        time: '2025-06-19T00:00:00',
        compileApiResponseTimeMs: 114,
        bojSubmitApiResponseTimeMs: 100,
        jdoodleApiResponseTimeMs: 457,
        lambdaApiResponseTimeMs: 187,
        githubApiResponseTimeMs: 100,
    },
    {
        time: '2025-06-20T00:00:00',
        compileApiResponseTimeMs: 274,
        bojSubmitApiResponseTimeMs: 308,
        jdoodleApiResponseTimeMs: 458,
        lambdaApiResponseTimeMs: 100,
        githubApiResponseTimeMs: 228,
    },
    {
        time: '2025-06-21T00:00:00',
        compileApiResponseTimeMs: 403,
        bojSubmitApiResponseTimeMs: 100,
        jdoodleApiResponseTimeMs: 419,
        lambdaApiResponseTimeMs: 280,
        githubApiResponseTimeMs: 57,
    },
];

interface ApiStatusChartProps {
    className?: string;
}

const getSeriesFromData = (data: ApiResponseTimeMetrics[]): AllSeriesType[] => [
    {
        type: 'line',
        data: data.map((item) => item.compileApiResponseTimeMs),
        label: 'Algo Plus 컴파일 API',
        yAxisId: 'responseTime',
        color: colorAlgoplusBlue,
    },
    {
        type: 'line',
        data: data.map((item) => item.jdoodleApiResponseTimeMs),
        label: 'JDoodle API',
        yAxisId: 'responseTime',
        color: colorAlgoplusOrange,
    },
    {
        type: 'line',
        data: data.map((item) => item.lambdaApiResponseTimeMs),
        label: 'AWS Lambda API',
        yAxisId: 'responseTime',
        color: colorAlgoplusBlue,
    },
    {
        type: 'line',
        data: data.map((item) => item.bojSubmitApiResponseTimeMs),
        label: '백준 제출 API',
        yAxisId: 'responseTime',
        color: colorAlgoplusBlue,
    },
    {
        type: 'line',
        data: data.map((item) => item.githubApiResponseTimeMs),
        label: 'GitHub API',
        yAxisId: 'responseTime',
        color: colorAlgoplusBlue,
    },
];

const ApiStatusChart: React.FC<ApiStatusChartProps> = ({ className }) => {
    const [data, setData] = useState<ApiResponseTimeMetrics[]>([]);
    const [series, setSeries] = useState<AllSeriesType[]>([]);

    useEffect(() => {
        setData(dummyData);
    }, []);

    useEffect(() => {
        setSeries(getSeriesFromData(data));
    }, [data]);

    return (
        <div className={`${className}`}>
            <ChartContainer
                series={series}
                height={340}
                xAxis={[
                    {
                        id: 'date',
                        data: data.map((x) => x.time),
                        scaleType: 'band',
                        valueFormatter: (value) =>
                            `${formatMonthDay(new Date(value))}`,
                    },
                ]}
                yAxis={[
                    {
                        id: 'responseTime',
                        scaleType: 'linear',
                        position: 'left',
                        width: 70,
                        min: 0,
                        max: 2000,
                    },
                    {
                        position: 'right',
                        width: 10,
                    },
                ]}
            >
                <ChartsAxisHighlight x='line' />
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
                    label='응답 시간(ms)'
                    axisId='responseTime'
                    tickLabelStyle={{ fontSize: 10 }}
                />
                <ChartsTooltip />
            </ChartContainer>
        </div>
    );
};

export default ApiStatusChart;
