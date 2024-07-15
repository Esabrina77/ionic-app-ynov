import React, { useEffect } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, useIonViewDidEnter, useIonViewWillLeave } from '@ionic/react';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

const ScanQR: React.FC = () => {
  useIonViewDidEnter(() => {
    startScan();
  });

  useIonViewWillLeave(() => {
    stopScan();
  });

  const startScan = async () => {
    await BarcodeScanner.checkPermission({ force: true });
    BarcodeScanner.hideBackground();
    const result = await BarcodeScanner.startScan();
    if (result.hasContent) {
      console.log(result.content);
      // Traitez le résultat du scan ici
    }
  };

  const stopScan = () => {
    BarcodeScanner.showBackground();
    BarcodeScanner.stopScan();
  };

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="scan-qr-container">
          <h2>Scannez le code QR</h2>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ScanQR;