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
import { useEffect, useState } from "react";
import { BarcodeScanner } from "@capacitor-community/barcode-scanner";
//import { scanOutline, stopCircleOutline } from "ionicons/icons";
 import "./ScanPage.css";

const ScanPage: React.FC = () => {
  const [err, setErr] = useState<string>();
  const [hideBg, setHideBg] = useState(false);
  const [present] = useIonAlert();

  const startScan = async () => {
    console.log("Starting scan...");
    BarcodeScanner.hideBackground();
    setHideBg(true);

    const result = await BarcodeScanner.startScan();

    if (result.hasContent) {
      stopScan();
      present({
        message: result.content,
        buttons: [
          "Cancel",
          { text: "Ok", handler: (d) => console.log("ok pressed") },
        ],
        onDidDismiss: (e) => console.log("did dismiss"),
      });
      console.log(result.content);
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
