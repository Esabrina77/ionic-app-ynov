import React from 'react';
import './AttachedFileSelector.scss';


interface AttachedFile {
    children?: React.ReactNode;
}

const AttachedFileSelector: React.FC<AttachedFile> = ({children }) => {
    return (
        <div className="border_justify">
            {children}  
        </div>
      );
};

export default AttachedFileSelector;