import React, { useRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';

const SignaturePad = () => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  const clear = () => {
    sigCanvas.current?.clear();
  };

  const save = () => {
    const dataURL = sigCanvas.current?.getTrimmedCanvas().toDataURL('image/png');
    console.log(dataURL); // Tu peux envoyer ce dataURL à ton serveur ou l'utiliser comme tu le souhaites
  };

  return (
    <div>
      <h2>Signature</h2>
      <SignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{ width: 500, height: 200, className: 'sigCanvas' }}
      />
      <button onClick={clear}>Effacer</button>
    </div>
  );
};

export default SignaturePad;
