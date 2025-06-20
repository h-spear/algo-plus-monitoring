import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';

interface TimeDisplayProps {
    text: string;
    className?: string;
    icon?: 'calendar' | 'time';
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({
    text,
    className,
    icon = 'time',
}) => {
    return (
        <p className={`text-gray-400 ${className} font-thin flex items-start`}>
            {icon === 'time' ? (
                <AccessTimeIcon fontSize='inherit' />
            ) : (
                <CalendarMonthIcon fontSize='inherit' />
            )}
            <span className='ml-1 text-xs'>{text}</span>
        </p>
    );
};

export default TimeDisplay;
