import React from 'react';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

interface TimeDisplayProps {
    text: string;
    className?: string;
}

const TimeDisplay: React.FC<TimeDisplayProps> = ({ text, className }) => {
    return (
        <p className={`text-gray-400 ${className} font-thin`}>
            <AccessTimeIcon fontSize='inherit' />
            <span className='ml-1 text-xs'>{text}</span>
        </p>
    );
};

export default TimeDisplay;
