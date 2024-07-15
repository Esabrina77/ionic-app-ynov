import React from 'react';
import './HeaderRadius.scss';

interface HeaderRadiusProps {
    children?: React.ReactNode;
}

const HeaderRadius: React.FC<HeaderRadiusProps> = ({children }) => {
    return (
        <div className="stat-slider">
            {children}
        </div>
      );
};

export default HeaderRadius;