import React, { useState, useRef, useEffect } from 'react';
import { IonContent, IonPage, IonButton, IonText } from '@ionic/react';
import { Camera } from '@capacitor/camera';
import { defineCustomElements } from '@ionic/pwa-elements/loader';
import jsQR from 'jsqr';

defineCustomElements(window);

const ExampleTab: React.FC = () => {
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [scanning, setScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (scanning) {
      startCamera();
    } else {
      stopCamera();
    }
  }, [scanning]);

  const startCamera = async () => {
    try {
      const permissionStatus = await Camera.checkPermissions();
      if (permissionStatus.camera !== 'granted') {
        const permission = await Camera.requestPermissions({
          permissions: ['camera'],
        });
        if (permission.camera !== 'granted') {
          console.log('Permission de caméra non accordée');
          return;
        }
      }

      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' },
        audio: false
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.onloadedmetadata = () => {
          videoRef.current?.play();
          requestAnimationFrame(scan);
        };
      }
    } catch (error) {
      console.error('Erreur lors du démarrage de la caméra:', error);
    }
  };

  const stopCamera = () => {
    const stream = videoRef.current?.srcObject as MediaStream;
    const tracks = stream?.getTracks();
    tracks?.forEach(track => track.stop());
  };

  const scan = () => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      if (video.videoWidth === 0 || video.videoHeight === 0) {
        // La vidéo n'est pas encore prête, on réessaie
        requestAnimationFrame(scan);
        return;
      }

      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        
        if (code) {
          setScanResult(code.data);
          console.log("QR code détecté", code.data);
          setScanning(false);
        } else if (scanning) {
          requestAnimationFrame(scan);
        }
      }
    } else if (scanning) {
      requestAnimationFrame(scan);
    }
  };

  const toggleScan = () => {
    setScanning(!scanning);
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <IonButton expand="block" onClick={toggleScan}>
          {scanning ? 'Arrêter le scan' : 'Commencer le scan'}
        </IonButton>
        {scanning && (
          <div style={{ position: 'relative', width: '100%', maxWidth: '500px', margin: '0 auto' }}>
            <video 
              ref={videoRef} 
              style={{ width: '100%', display: 'block' }}
              playsInline
            ></video>
            <canvas 
              ref={canvasRef} 
              style={{ 
                position: 'absolute', 
                top: 0, 
                left: 0, 
                width: '100%', 
                height: '100%' 
              }}
            ></canvas>
          </div>
        )}
        {scanResult && (
          <IonText>
            <p>Résultat du scan : {scanResult}</p>
            <a href={scanResult}>Voir l'étudiant</a>
          </IonText>
        )}
      </IonContent>
    </IonPage>
  );
};

export default ExampleTab;