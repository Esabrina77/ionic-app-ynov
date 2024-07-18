import React, { useState, useEffect, useRef, useCallback } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonRange, IonFab, IonFabButton, IonIcon, useIonModal } from '@ionic/react';
import { Barcode, BarcodeScanner, BarcodeFormat, LensFacing, StartScanOptions } from '@capacitor-mlkit/barcode-scanning';
import { close, flashlight } from 'ionicons/icons';
import { useHistory } from 'react-router-dom';
import './ScanQRPage.scss';

const BarcodeScanningPage: React.FC = () => {
  const [barcodes, setBarcodes] = useState<Barcode[]>([]);
  const [formats] = useState<BarcodeFormat[]>([BarcodeFormat.QrCode]); // Set default format to QR Code
  const [lensFacing] = useState<LensFacing>(LensFacing.Back);

  const [present, dismiss] = useIonModal(BarcodeScanningModal, {
    onDismiss: (data: { barcode?: Barcode }, role: string) => dismiss(data, role),
    formats,
    lensFacing,
  });

  const openModal = () => {
    present({
      cssClass: 'barcode-scanning-modal',
      onWillDismiss: (ev: CustomEvent<any>) => {
        if (ev.detail.data?.barcode) {
          setBarcodes([ev.detail.data.barcode]);
        }
      },
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Barcode Scanning</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <IonButton expand="block" onClick={openModal}>Start Scan</IonButton>
        {barcodes.map((barcode, index) => (
          <div key={index}>
            <p>Format: {barcode.format}</p>
            <p>Value: {barcode.rawValue}</p>
          </div>
        ))}
      </IonContent>
    </IonPage>
  );
};

const BarcodeScanningModal: React.FC<{
  onDismiss: (data?: any, role?: string) => void;
  formats: BarcodeFormat[];
  lensFacing: LensFacing;
}> = ({ onDismiss, formats, lensFacing }) => {
  const [isTorchAvailable, setIsTorchAvailable] = useState(false);
  const [minZoomRatio, setMinZoomRatio] = useState<number | undefined>(undefined);
  const [maxZoomRatio, setMaxZoomRatio] = useState<number | undefined>(undefined);
  const squareRef = useRef<HTMLDivElement>(null);

  const startScan = useCallback(async () => {
    document.querySelector('body')?.classList.add('barcode-scanning-active');

    const options: StartScanOptions = {
      formats: formats,
      lensFacing: lensFacing,
    };

    const squareElement = squareRef.current;
    const squareElementBoundingClientRect = squareElement?.getBoundingClientRect();
    const scaledRect = squareElementBoundingClientRect
      ? {
          left: squareElementBoundingClientRect.left * window.devicePixelRatio,
          right: squareElementBoundingClientRect.right * window.devicePixelRatio,
          top: squareElementBoundingClientRect.top * window.devicePixelRatio,
          bottom: squareElementBoundingClientRect.bottom * window.devicePixelRatio,
          width: squareElementBoundingClientRect.width * window.devicePixelRatio,
          height: squareElementBoundingClientRect.height * window.devicePixelRatio,
        }
      : undefined;
    const detectionCornerPoints = scaledRect
      ? [
          [scaledRect.left, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top],
          [scaledRect.left + scaledRect.width, scaledRect.top + scaledRect.height],
          [scaledRect.left, scaledRect.top + scaledRect.height],
        ]
      : undefined;

    const listener = await BarcodeScanner.addListener(
      'barcodeScanned',
      async (event) => {
        const cornerPoints = event.barcode.cornerPoints;
        if (detectionCornerPoints && cornerPoints) {
          if (
            detectionCornerPoints[0][0] > cornerPoints[0][0] ||
            detectionCornerPoints[0][1] > cornerPoints[0][1] ||
            detectionCornerPoints[1][0] < cornerPoints[1][0] ||
            detectionCornerPoints[1][1] > cornerPoints[1][1] ||
            detectionCornerPoints[2][0] < cornerPoints[2][0] ||
            detectionCornerPoints[2][1] < cornerPoints[2][1] ||
            detectionCornerPoints[3][0] > cornerPoints[3][0] ||
            detectionCornerPoints[3][1] < cornerPoints[3][1]
          ) {
            return;
          }
        }
        await listener.remove();
        onDismiss({ barcode: event.barcode }, 'confirm');
      }
    );

    await BarcodeScanner.startScan(options);

    const minZoomResult = await BarcodeScanner.getMinZoomRatio();
    setMinZoomRatio(minZoomResult.zoomRatio);

    const maxZoomResult = await BarcodeScanner.getMaxZoomRatio();
    setMaxZoomRatio(maxZoomResult.zoomRatio);
  }, [formats, lensFacing, onDismiss]);

  const stopScan = useCallback(async () => {
    document.querySelector('body')?.classList.remove('barcode-scanning-active');
    await BarcodeScanner.stopScan();
  }, []);

  useEffect(() => {
    BarcodeScanner.isTorchAvailable().then((result) => {
      setIsTorchAvailable(result.available);
    });

    startScan();

    return () => {
      stopScan();
    };
  }, [startScan, stopScan]);

  const setZoomRatio = (event: CustomEvent) => {
    if (!event.detail.value) {
      return;
    }
    BarcodeScanner.setZoomRatio({
      zoomRatio: parseInt(event.detail.value as any, 10),
    });
  };

  const toggleTorch = async () => {
    await BarcodeScanner.toggleTorch();
  };

  return (
    <IonContent className="ion-padding">
      <div ref={squareRef} className="square"></div>
      <div className="zoom-ratio-wrapper">
        <IonRange
          min={minZoomRatio}
          max={maxZoomRatio}
          step={0.1}
          onIonChange={setZoomRatio}
          disabled={minZoomRatio === undefined || maxZoomRatio === undefined}
        />
      </div>
      {isTorchAvailable && (
        <IonFab vertical="bottom" horizontal="end" slot="fixed">
          <IonFabButton onClick={toggleTorch}>
            <IonIcon icon={flashlight} />
          </IonFabButton>
        </IonFab>
      )}
      <IonButton expand="block" onClick={() => onDismiss(null, 'cancel')}>Close</IonButton>
    </IonContent>
  );
};

export default BarcodeScanningPage;