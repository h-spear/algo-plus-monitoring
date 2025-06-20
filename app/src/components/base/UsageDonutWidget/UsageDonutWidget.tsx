import React from 'react';
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge';
import { colorDark } from '@themes';

interface UsageDonutWidgetProps {
    title: string;
    value: number;
    min?: number;
    max?: number;
    color?: string;
    width?: number;
    height?: number;
    valueTextSize?: number;
    description?: React.ReactNode;
    className?: string;
}

const UsageDonutWidget: React.FC<UsageDonutWidgetProps> = ({
    title = '',
    value = 126,
    min = 0,
    max = 100,
    color = colorDark,
    width = 200,
    height = 200,
    valueTextSize = 44,
    description = <></>,
    className,
}) => {
    return (
        <div
            className={`flex flex-col justify-between items-center py-4 ${className}`}
        >
            <h3 className='text-xl font-bold'>{title}</h3>
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
            <div className='flex flex-col'>
                <div className='flex'>{description}</div>
            </div>
        </div>
    );
};

export default UsageDonutWidget;
