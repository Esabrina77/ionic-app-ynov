// import React, { useState } from 'react';
// import { 
//   IonContent, 
//   IonPage, 
//   IonButton, 
//   useIonViewDidEnter, 
//   useIonViewWillLeave, 
//   IonText 
// } from '@ionic/react';
// import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

// import { Header } from "../../../../../components/ui/Header";
// import { TabWrappedComponent } from "../../../../../components/utils/TabWrapper";

// import './ScanQRPage.scss'

// export const ScanQRPage: React.FC<TabWrappedComponent> = ({ isTab }) => {
//   const [visible, setVisible] = useState(false);
//   const [scanResult, setScanResult] = useState<string | null>(null);

//   useIonViewDidEnter(() => {
//     setVisible(true);
//   });

//   useIonViewWillLeave(() => {
//     setVisible(false);
//     stopScan();
//   });

//   const startScan = async () => {
//     console.log('Starting scan');
//     const status = await BarcodeScanner.checkPermission({ force: true });
//     console.log('Permission status:', status);
//     if (status.granted || status.neverAsked) {
//       await BarcodeScanner.hideBackground();
//       document.querySelector('body')?.classList.add('scanner-active');
//       const result = await BarcodeScanner.startScan();
//       console.log('Scan result:', result);
//       if (result.hasContent) {
//         setScanResult(result.content);
//       }
//       document.querySelector('body')?.classList.remove('scanner-active');
//     } else {
//       console.log('Permission not granted');
//     }
//   };
  

//   const stopScan = () => {
//     BarcodeScanner.showBackground();
//     BarcodeScanner.stopScan();
//     document.querySelector('body')?.classList.remove('scanner-active');
//   };

//   return (
//     <IonPage>
//       <Header title="Scan QR code" showLogo />
//       <IonContent className="ion-padding">
//         <IonButton expand="block" onClick={startScan}>
//           Commencer le scan
//         </IonButton>
//         <IonButton expand="block" onClick={stopScan} color="danger">
//           Arrêter le scan
//         </IonButton>
//         {scanResult && (
//           <IonText>
//             <a href={`/students/tabs/StudentPage/StudentPage?id=${scanResult}`}>Voir l'étudiant</a>
//           </IonText>
//         )}
//       </IonContent>
//     </IonPage>
//   );
// };

// export default ScanQRPage;
