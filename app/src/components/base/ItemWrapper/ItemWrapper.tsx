import React from 'react';

interface ItemProps {
    outline?: boolean;
    children: React.ReactNode;
    className: string;
}

const ItemWrapper: React.FC<ItemProps> = ({
    outline = true,
    children,
    className,
}) => {
    return (
        <div className={`${className} ${outline ? 'p-2' : ''}`}>
            <div
                className={`w-full flex justify-center items-center ${
                    outline ? `border-1 border-gray-300 rounded-lg` : ``
                }`}
            >
                {children}
            </div>
        </div>
    );
};

export default ItemWrapper;
