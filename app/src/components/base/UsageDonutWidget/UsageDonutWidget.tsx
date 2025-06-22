import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { colorDark } from '@themes';
import { CircularProgress } from '@mui/material';

interface UsageDonutWidgetProps {
    title?: React.ReactNode;
    value?: number;
    min?: number;
    max?: number;
    color?: string;
    width?: number;
    height?: number;
    valueTextSize?: number;
    description?: React.ReactNode;
    className?: string;
    loading: boolean;
}

const UsageDonutWidget: React.FC<UsageDonutWidgetProps> = ({
    title,
    value,
    min = 0,
    max = 100,
    color = colorDark,
    width = 200,
    height = 200,
    valueTextSize = 44,
    description = <></>,
    className,
    loading,
}) => {
    return (
        <div
            className={`flex flex-col justify-between items-center py-4 ${className}`}
        >
            {title}
            {!loading ? (
                <Gauge
                    width={width}
                    height={height}
                    value={value}
                    valueMin={min}
                    valueMax={max}
                    cornerRadius='50%'
                    sx={() => ({
                        [`& .${gaugeClasses.valueText}`]: {
                            fontSize: valueTextSize,
                            fontWeight: 'bold',
                        },
                        [`& .${gaugeClasses.valueArc}`]: {
                            fill: color,
                        },
                    })}
                />
            ) : (
                <div className='h-full flex items-center'>
                    <CircularProgress color='primary' size={48} />
                </div>
            )}
            <div className={`flex flex-col ${loading ? 'hidden' : ''}`}>
                <div className='flex'>{description}</div>
            </div>
        </div>
    );
};

export default UsageDonutWidget;
