import React from 'react';

interface StatusWidgetProps {
    passed?: boolean;
    label: string;
    caption?: string;
    captionLink?: string;
    className?: string;
}

const StatusWidget: React.FC<StatusWidgetProps> = ({
    passed = true,
    label,
    caption,
    captionLink,
    className,
}) => {
    return (
        <div
            className={`w-60 h-40 flex flex-col justify-center items-center ${className}`}
        >
            <div className='flex flex-col items-center h-30 pt-4'>
                <h1
                    className={`text-7xl px-6 py-1 mb-1 ${
                        passed ? 'bg-green-500' : 'bg-red-400'
                    }`}
                >
                    {passed ? 'OK' : 'FAIL'}
                </h1>
                <span className='text-sm text-gray-600'>{label}</span>
                {caption ? (
                    captionLink ? (
                        <a
                            className='text-xs text-algoplus-blue'
                            href={captionLink}
                            target='_blank'
                        >
                            {caption}
                        </a>
                    ) : (
                        <span className='text-xs text-gray-400'>{caption}</span>
                    )
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
};

export default StatusWidget;
