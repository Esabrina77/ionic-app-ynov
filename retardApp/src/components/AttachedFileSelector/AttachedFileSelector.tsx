import React from 'react';
import './AttachedFileSelector.scss';


interface AttachedFile {
    children?: React.ReactNode;
}

const HeaderRadius: React.FC<AttachedFile> = ({children }) => {
    return (
        <div className="attached-file">
            {children}
            
            <input className='attached-reason' type="text" placeholder="Décrivez votre motif ici au besoin"  ></input>
            <input className='submit' type="submit"></input>
            
           
        </div>
      );
};

export default HeaderRadius;