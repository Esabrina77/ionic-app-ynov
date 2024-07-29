import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonPage,
  IonRow,
  IonText,
  IonTitle,
  IonToolbar,
  useIonAlert,
} from "@ionic/react";
import { useIonRouter } from '@ionic/react';
import { useEffect, useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
import "./ScanPage.css";
import forge from 'node-forge';

const ScanPage: React.FC = () => {
  const [err, setErr] = useState<string>();
  const [hideBg, setHideBg] = useState(false);
  const [present] = useIonAlert();
  const router = useIonRouter();

  const private_key = `-----BEGIN RSA PRIVATE KEY-----
MIIBPAIBAAJBAN5xF1qi7bOd25l25apCJCvTFCz3buOlEsiCc/vwrr1EacpWtT/P
xMWdSYUwyotSyAbCAIFz7rrnweB6Mvpd9jECAwEAAQJAFG3oii96i0uNNpv/3dIz
Rj8dlD+pVIj9n6KzikkBk2pAMekDdofAqMsHRz7a0E3tVJ377kyISYJDBebV8vIG
0QIhAPx8AHHa0VTZ7JS1MvkOslZvyKiQkc3V7GRCI/yLais9AiEA4YoAHsBX6por
c1gWkcRjo3TkesM6D0jS2kXVbqChdgUCIQD6Bcli9a8JeWv/rpe1bkpHshZgZhkc
XdTjS2PbeCtAeQIhAJfNudz423Plht9g5/f+9o2bbPmQE7Eb9AfEPy7x4Rs9AiEA
9nXhX926prDeq0e9r8rR2cvpUaqhLMGz+zFIyJcsRHo=
-----END RSA PRIVATE KEY-----
`;

  function decryptRSA(data: string, private_key: any): string {
    var key = forge.pki.privateKeyFromPem(private_key);
    var result = key.decrypt(data);
    console.log("Decrypted: ", result);
    return result;
  }

  const startScan = async () => {
    console.log("Starting scan...");
    BarcodeScanner.hideBackground();
    setHideBg(true);

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      stopScan();
      try {
        const scannedData = JSON.parse(result.content);
        if ('SalutASamy' in scannedData && 'idStatusScan' in scannedData) { 
      
          const encryptedData = scannedData.SalutASamy.toString();
          const decryptedData = decryptRSA(encryptedData, private_key);
          console.log(decryptedData);
          router.push(`tabs/justify-late?`, 'forward', 'push');
        } else {
          present({
            message: "Ce QR code n'est pas valide pour le check de retard.",
            buttons: ["OK"],
          });
        }
      } catch (error) {
        present({
          message: "QR code invalide ou mal formaté.",
          buttons: ["OK"],
        });
      }
    } else {
      console.log("No content found.");
    }
  };

  const stopScan = () => {
    console.log("Stopping scan...");
    BarcodeScanner.showBackground();
    setHideBg(false);
    BarcodeScanner.stopScan();
  };

  useEffect(() => {
    const checkPermission = async () => {
      setErr(undefined);
      try {
        const status = await BarcodeScanner.checkPermission({ force: true });

        if (status.granted) {
          console.log("Permission granted.");
          return true;
        } else {
          console.log("Permission not granted.");
          return false;
        }
      } catch (error) {
        console.error("Error checking permission: ", error);
        setErr(error as any);
      }
    };

    checkPermission();

    return () => {};
  }, []);

  return (
    <div className="body_page">
    <header style={{ backgroundColor: '#f8f8f8', padding: '10px', textAlign: 'center' }}>
        <h1>QRScanner</h1>
        {hideBg && (
            <button onClick={stopScan} style={{ backgroundColor: 'red', color: 'white', padding: '10px', border: 'none', borderRadius: '5px' }}>
                Stop Scan
            </button>
        )}
    </header>
    <main style={{ padding: '20px' }}>
        {err && (
            <div style={{ color: 'red', textAlign: 'center' }}>{err}</div>
        )}
        {hideBg && <div className="scan-box"></div>}
        {!hideBg && (
            <button className="center-button" onClick={startScan}>
                Start Scan
            </button>
        )}
    </main>
</div>
  );
};

export default ScanPage;
