import React from 'react';

interface ItemProps {
    outline?: boolean;
    children: React.ReactNode;
    className: string;
    link?: string;
}

const ItemWrapper: React.FC<ItemProps> = ({
    outline = true,
    children,
    className,
    link,
}) => {
    return (
        <div className={`${className} ${outline ? 'p-2' : ''}`}>
            <div
                className={`w-full flex justify-center items-center ${
                    outline ? `border-1 border-gray-300 rounded-lg` : ``
                } ${
                    link
                        ? 'hover:bg-red-50 transition-transform duration-200 cursor-pointer'
                        : ''
                }`}
                onClick={() => {
                    if (link)
                        window.open(link, '_blank', 'noopener,noreferrer');
                }}
            >
                {children}
            </div>
        </div>
    );
};

export default ItemWrapper;
