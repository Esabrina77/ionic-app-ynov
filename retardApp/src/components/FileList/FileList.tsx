import React from 'react';
import './FileList.scss';
import CroixIcon from "../../assets/svg/icons/signe-de-la-croix 1croix.png";

interface FileListProps {
  files: File[];
  onFileOpen: (file: File) => void;
  onFileDelete: (index: number) => void;
}

const FileList: React.FC<FileListProps> = ({ files, onFileOpen, onFileDelete }) => {
  return (
    <div className='list_justif'>
      <ul>
        {files.map((file, index) => (
          <li key={index}>- 
            <span onClick={() => onFileOpen(file)}>{file.name}</span>
            <img src={CroixIcon} alt="Supprimer" onClick={() => onFileDelete(index)} />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileList;