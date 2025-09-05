import { CircularProgress } from '@mui/material';
import React from 'react';

interface TextWidgetContentProps {
    icon?: React.ReactNode;
    text: number | string;
    subText?: number | string;
    unit?: string;
    iconClass?: string;
    textClass?: string;
}

const TextWidgetContent: React.FC<TextWidgetContentProps> = ({
    icon,
    text,
    subText,
    unit,
    iconClass,
    textClass,
}) => {
    return (
        <div className='w-60 h-20 flex justify-center items-center pt-1'>
            <div className={`text-3xl mr-0.5 ${iconClass}`}>{icon}</div>
            <div className='flex items-end'>
                <h3 className={`text-dark ${textClass}`}>
                    {text ? (
                        <>
                            {text}
                            <span className='text-2xl'>{subText}</span>
                        </>
                    ) : (
                        <CircularProgress color='primary' size={36} />
                    )}
                </h3>
                <span className='text-sm ml-1 h-full text-gray-400 pb-0.5'>
                    {unit}
                </span>
            </div>
        </div>
    );
};

export default TextWidgetContent;
