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
    <div>
          <IonHeader>
            <IonToolbar>
              <IonTitle>QRScanner</IonTitle>
              {hideBg && (
                <IonButtons slot="end">
                  <IonButton onClick={stopScan} color="danger">
                    <IonIcon  slot="start" />
                    Stop Scan
                  </IonButton>
                </IonButtons>
              )}
            </IonToolbar>
          </IonHeader>
          <IonContent className={hideBg ? "hideBg" : "ion-padding"}>
            {err && (
              <IonRow>
                <IonText color="danger">{err}</IonText>
              </IonRow>
            )}

            {!!!err && hideBg && <div className="scan-box"></div>}
            {!!!err && !!!hideBg && (
              <IonButton className="center-button" onClick={startScan}>
                <IonIcon slot="start" />
                Start Scan
              </IonButton>
            )}
          </IonContent>
        </div>
  );
};

export default ScanPage;
