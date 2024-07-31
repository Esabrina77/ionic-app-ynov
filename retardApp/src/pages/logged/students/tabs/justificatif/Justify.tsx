import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from "react";
import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonText,
  IonCard,
  IonItem,
  IonInput,
  IonButton
} from "@ionic/react";

//components
import { Header } from "../../../../../components/ui/Header";
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import ReasonSelector from '../../../../../components/ReasonSelector/ReasonSelector';
import FileUploader from '../../../../../components/FileUploader/FileUploader';
import PhotoCapture from '../../../../../components/PhotoCapture/PhotoCapture';
import FileList from '../../../../../components/FileList/FileList';
import AttachedFileSelector from "../../../../../components/AttachedFileSelector/AttachedFileSelector";
import './justify.scss';

export const JustifyTab: React.FC<TabWrappedComponent> = ({ isTab }) => {
  const [visible, setVisible] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [currentTab, setCurrentTab] = useState('unjustified');

  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || []);
    if (files.length + uploadedFiles.length <= 3) {
      setFiles([...files, ...uploadedFiles]);
    } else {
      alert("You can only upload up to 3 files in total.");
    }
  };

  const handlePhotoCapture = async () => {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Uri
      });

      if (image.webPath) {
        const response = await fetch(image.webPath);
        const blob = await response.blob();
        const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

        if (files.length < 3) {
          setFiles([...files, file]);
        } else {
          alert("You can only upload up to 3 files in total.");
        }
      }
    } catch (error) {
      console.error("Error capturing photo:", error);
    }
  };

  const openFile = (file: File) => {
    const fileURL = URL.createObjectURL(file);
    window.open(fileURL, '_blank');
  };

  const handleDeleteFile = (index: number) => {
    const newFiles = [...files];
    newFiles.splice(index, 1);
    setFiles(newFiles);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    console.log("Files:", files);
    // Handle form submission logic here
  };

    // recuperer les datas du liens
    const date = '30/05/2024';
    const time ='13h30 à 17h30';
    const duration=4
  return (
    <>
      <Header title="Justifs Absence" showLogo />
      <IonContent>
        <form onSubmit={handleSubmit} className='box_container'>
          <AttachedFileSelector>
          <IonText className="date_unjustify">
        Absence le {date} de {time} <span className='danger'> {duration}h</span>  manqués
      </IonText>
            <ReasonSelector />
          </AttachedFileSelector>
          <AttachedFileSelector>
            <IonText className="p" id="attached-legend">
              Joindre des fichiers d'appui.
            </IonText>
            <FileUploader onFileUpload={handleFileUpload} />
            <PhotoCapture onPhotoCapture={handlePhotoCapture} />
            {files.length > 0 && (
              <FileList
                files={files}
                onFileOpen={openFile}
                onFileDelete={handleDeleteFile}
              />
            )}
          </AttachedFileSelector>

          <IonButton type="submit" className='submit'>Envoyer</IonButton>
        </form>
      </IonContent>
    </>
  );
};