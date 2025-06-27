import React from 'react';
import type { HealthCheckMetrics } from '@types/api';
import { CircularProgress } from '@mui/material';

interface HealthCheckWidgetContentProps {
    className?: string;
    data: HealthCheckMetrics;
    loading: boolean;
}

const HealthCheckWidgetContent: React.FC<HealthCheckWidgetContentProps> = ({
    className,
    data,
    loading,
}) => {
    return (
        <div
            className={`w-60 h-33 flex flex-col justify-center items-center ${className} mb-0.5`}
        >
            {!loading && data ? (
                <div className='flex flex-col items-center h-24'>
                    <h1
                        className={`text-7xl px-6 py-1 mb-1 text-gray-50 ${
                            data.pass ? 'bg-green-500' : 'bg-red-400'
                        }`}
                    >
                        {data.pass ? 'OK' : 'FAIL'}
                    </h1>
                    {data.pass ? (
                        <span className='text-sm text-gray-600'>
                            응답 시간 : <b>{data.elapsedTime.toFixed(1)}</b>ms
                        </span>
                    ) : (
                        <></>
                    )}
                </div>
            ) : (
                <CircularProgress color='primary' size={48} />
            )}
        </div>
    );
};

export default HealthCheckWidgetContent;
