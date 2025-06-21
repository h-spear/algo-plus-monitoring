import React from 'react';

interface UsageInfoProps {
    text: string;
    caption1?: string;
    caption2?: string;
}

const UsageInfo: React.FC<UsageInfoProps> = ({ text, caption1, caption2 }) => (
    <div className='flex flex-col'>
        <div className='flex'>
            <span className='text-4xl font-bold'>{text ? text : ''}</span>
            <p className='pl-1 text-sm flex flex-col justify-center'>
                <span className=''>{caption1}</span>
                <span className='text-gray-400 text-xs tracking-tighter'>
                    {caption2}
                </span>
            </p>
        </div>
    </div>
);

export default UsageInfo;
