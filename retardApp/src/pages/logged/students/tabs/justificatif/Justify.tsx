import { Camera, CameraResultType } from '@capacitor/camera';
import { useState } from "react";
import { useLocation } from 'react-router-dom';
import{ apiService } from '../../../../../services/api/api.service';
import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonText,
  IonCard,
  IonItem,
  IonInput,
  useIonRouter,
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
  const [reason, setReason] = useState('');

  // Utiliser useLocation pour extraire les données de l'URL
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);

  const date = searchParams.get('date') || 'N/A';
  const time = searchParams.get('time') || 'N/A';
  const duration = parseFloat(searchParams.get('duration') || '0');
  const absenceId = searchParams.get('absenceId') || '';
  const router = useIonRouter();

 const goToMessageJustif = () => {
    router.push('/tabs/message_justif', 'forward', 'push');
  }
  useIonViewDidEnter(() => {
    setVisible(true);
  });

  useIonViewWillLeave(() => {
    setVisible(false);
  });

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

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!reason) {
      alert("Veuillez fournir une raison pour l'absence.");
      return;
    }

    try {
      const justificationData = {
        absenceId,
        reason,
        files
      };

      await apiService.submitJustification(justificationData);
      console.log("Justification submitted successfully");
      // rediriger le user vers la page messageJustif
   goToMessageJustif();
    } catch (error) {
      console.error("Error submitting justification:", error);
      // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <Header title="Justifs Absence" showLogo />
      <IonContent>
        <form onSubmit={handleSubmit} className='box_container'>
          <AttachedFileSelector>
            <IonText className="date_unjustify">
              Absence le {date} de {time} 
              <span className='danger'> {duration}h</span> manquées
            </IonText>
            <ReasonSelector onChange={(selectedReason) => setReason(selectedReason)} />
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
