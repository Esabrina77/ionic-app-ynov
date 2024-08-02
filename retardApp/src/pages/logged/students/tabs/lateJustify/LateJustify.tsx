 import { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import {
  IonContent,
  useIonViewDidEnter,
  useIonViewWillLeave,
  IonText,
  IonCard,
  useIonRouter,
  IonItem,
  IonInput,
  IonButton
} from "@ionic/react";

//components
import { Header } from "../../../../../components/ui/Header";
import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";
import ReasonSelector from '../../../../../components/ReasonSelector/ReasonSelector';
import AttachedFileSelector from "../../../../../components/AttachedFileSelector/AttachedFileSelector";
import './LateJustify.scss';

export const LateJustify: React.FC<TabWrappedComponent> = ({ isTab }) => {
  useIonViewDidEnter(() => {
    setVisible(true);
  });

  
  useIonViewWillLeave(() => {
    setVisible(false);
  });
const [visible, setVisible] = useState(false);
  const [reason, setReason] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const encryptedData = searchParams.get('data') || '';
  const course = searchParams.get('course') || '';
  const duration = searchParams.get('duration') || '';

  const [decryptedData, setDecryptedData] = useState<any>(null);

  useEffect(() => {
    if (encryptedData) {
      try {
        const parsedData = JSON.parse(encryptedData);
        setDecryptedData(parsedData);
      } catch (error) {
        console.error("Erreur lors du déchiffrement des données:", error);
      }
    }
  }, [encryptedData]);


  const router = useIonRouter();
  const goToMessageJustif = () => {
    router.push('/tabs/message_scan', 'forward', 'push');
  }

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    if (!reason) {
      alert("Veuillez fournir une raison pour l'absence.");
      return;
    }

    try {
      const justificationData = {
        reason,
      };

      // await apiService.submitJustification(justificationData);
      console.log("Justification submitted successfully");
      // Rediriger l'utilisateur vers la page messageJustif
      goToMessageJustif();
    } catch (error) {
      console.error("Error submitting justification:", error);
      // Ajoutez ici la logique pour afficher un message d'erreur à l'utilisateur
    }
  };

  return (
    <>
      <Header title="Justifs Retard" showLogo />
      <IonContent>
        <form onSubmit={handleSubmit} className='box_container'>
          <AttachedFileSelector>
            <IonText className="date_unjustify">
           
              <p>Justification de retard</p>
            </IonText>
            <ReasonSelector onChange={(selectedReason) => setReason(selectedReason)} />
          </AttachedFileSelector>

          <IonButton type="submit" className='submit'>Envoyer</IonButton>
        </form>
      </IonContent>
    </>
  );
};

export default LateJustify;