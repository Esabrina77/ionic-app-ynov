import React from 'react';
import './SelectReason.scss';


interface SelectReason {
    children?: React.ReactNode;
}

const HeaderRadius: React.FC<SelectReason> = ({children }) => {
    return (
        <div className="reason-slider">
            {children}
        </div>
      );
};

export default HeaderRadius;