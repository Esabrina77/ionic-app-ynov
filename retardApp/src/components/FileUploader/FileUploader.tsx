import React from 'react';
import AttacheIcon from "../../assets/svg/icons/attach.svg";
import './FileUploader.scss';

interface FileUploaderProps {
  onFileUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const FileUploader: React.FC<FileUploaderProps> = ({ onFileUpload }) => {
  return (
    <div className="file-upload-container">
      <input
        type="file"
        id="uploader"
        accept=".png,.pdf,.jpeg,.jpg"
        multiple
        onChange={onFileUpload}
        style={{ display: 'none' }}
      />
      <label htmlFor="uploader">
        <img
          className="attached__icon"
          alt="Attach files"
          src={AttacheIcon}
          style={{ cursor: 'pointer' }}
        />
      </label>
    </div>
  );
};

export default FileUploader;