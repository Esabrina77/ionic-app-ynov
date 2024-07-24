import React, { useImperativeHandle, useRef, forwardRef } from 'react';
import SignatureCanvas from 'react-signature-canvas';
import "./Signature.scss";

// Utiliser forwardRef pour pouvoir accéder à la méthode depuis le parent
const Signature = forwardRef((props, ref) => {
  const sigCanvas = useRef<SignatureCanvas | null>(null);

  useImperativeHandle(ref, () => ({
    getSignature: () => {
      const canvas = sigCanvas.current?.getTrimmedCanvas();
      if (canvas && canvas.toDataURL('image/png') !== 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABAAQAAABc2G3AAAAC0lEQVR42mP8/wcAAGoBf6Bsy5YAAAAASUVORK5CYII=') {
        // Retourne l'URL de l'image de la signature si elle n'est pas vide
        return canvas.toDataURL('image/png');
      } else {
        // Retourne null si la signature est vide
        return null;
      }
    }
  }));

  const clear = () => {
    sigCanvas.current?.clear();
  };

  return (
    <div className='Signature'>
      <p className="h1"> Signature </p>
      <SignatureCanvas
        ref={sigCanvas}
        penColor='black'
        canvasProps={{ className: 'sigCanvas' }}
      />
      <button className="Bouton_Signature" type="button" onClick={clear}>Effacer</button>
    </div>
  );
});

export default Signature;
