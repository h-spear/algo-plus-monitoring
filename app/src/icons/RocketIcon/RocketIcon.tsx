import React from 'react';

interface RocketIconIconProps {
    fontSize?: number;
}

const RocketIcon: React.FC<RocketIconIconProps> = ({ fontSize = 32 }) => {
    return <span style={{ fontSize: fontSize }}>🚀</span>;
};

export default RocketIcon;
