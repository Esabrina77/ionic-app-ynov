import React from 'react';
import CameraIcon from "../../assets/svg/icons/Camera.svg";
import './PhotoCapture.scss';

interface PhotoCaptureProps {
  onPhotoCapture: () => void;
}

const PhotoCapture: React.FC<PhotoCaptureProps> = ({ onPhotoCapture }) => {
  return (
    <button className='camera_button' onClick={onPhotoCapture}>
      <img src={CameraIcon} alt="Take Photo" />
    </button>
  );
};

export default PhotoCapture;