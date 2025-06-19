import React from 'react';

interface ItemProps {
    children: React.ReactNode;
    className: string;
}

const ItemWrapper: React.FC<ItemProps> = ({ children, className }) => {
    return (
        <div className={`p-2 ${className}`}>
            <div className='border-1 border-gray-300 rounded-lg w-full flex justify-center items-center '>
                {children}
            </div>
        </div>
    );
};

export default ItemWrapper;
