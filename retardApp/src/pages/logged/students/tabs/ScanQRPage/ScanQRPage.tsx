import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonText } from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const ScanQRPage: React.FC = () => {

  const [scanResult, setScanResult] = useState<string | null>(null);

  const startScan = async () => {
    console.log('ScanQRPage');
    // Vérifier la permission
    const status = await BarcodeScanner.checkPermission({ force: true });
console.log(status);

    if (status.granted || status.neverAsked) {
      // Rendre le fond transparent
      await BarcodeScanner.hideBackground();

      document.querySelector('body')?.classList.add('scanner-active');

      const result = await BarcodeScanner.startScan();

      if (result.hasContent) {
        setScanResult(result.content);
        console.log('Scan result: ', result.content);
      }

      document.querySelector('body')?.classList.remove('scanner-active');
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
    document.querySelector('body')?.classList.remove('scanner-active');
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Scanner QR Code</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={startScan}>
          Commencer le scan
        </IonButton>
        <IonButton expand="block" onClick={stopScan} color="danger">
          Arrêter le scan
        </IonButton>
        {scanResult && (
          <IonText>
            //rediriger l'etudiant vers la page de l'etudiant
            // scanResult contient l'id de l'etudiant
            // exemple: /students/tabs/StudentPage/StudentPage?id=1
          
            <a href={scanResult}>Voir l'étudiant</a>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ScanQRPage;