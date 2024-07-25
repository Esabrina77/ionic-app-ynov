import React, { useState, useRef, useEffect } from "react";
import { Header } from "../../../../../components/ui/Header";
import Signature from "../../../../../components/Signature/Signature";
import Pdf from "../../../../../components/Pdf/Pdf";
import { getNameFromEmail } from "../../../../../components/emailsUtils/emailsUtils";
import "./form.scss";

export const DechargeSortieForm: React.FC = () => {
  console.log('DechargeSortieForm opened');
  const [motif, setMotif] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const signatureRef = useRef<any>(null);

  const toEmail = 'noa.gambey@ynov.com';
  const { prenom, nom } = getNameFromEmail(toEmail);
  console.log('DechargeSortieForm prenom:', prenom);

  const save = () => {
    if (motif.trim() === "") {
      return;
    }

    if (signatureRef.current) {
      const signatureData = signatureRef.current.getSignature();
      if (signatureData) {
        setSignatureData(signatureData);
      } else {
        return;
      }
    }

    setShowPreview(true);
  };

  return (
    <>
      <Header title="Décharge de Sortie" showLogo />
      <div className="PageDechargeSortie">
        <div className="Motif">
          <p className="h1">Description du Motif</p>
          <textarea
            className="texte"
            placeholder="Décrivez votre motif ici"
            value={motif}
            onChange={(e) => setMotif(e.target.value)}
          ></textarea>
        </div>
        <Signature ref={signatureRef} />
        <button className="Bouton_Validation" type="button" onClick={save}>Valider</button>
        {showPreview && (
          <Pdf 
            text={motif} 
            imageBase64={signatureData} 
            showPreview={showPreview} 
            toEmail={toEmail}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(DechargeSortieForm);
