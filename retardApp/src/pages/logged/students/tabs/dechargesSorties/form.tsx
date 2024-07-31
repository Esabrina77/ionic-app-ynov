import React, { useState, useRef } from "react";
import { Header } from "../../../../../components/ui/Header";
import Signature from "../../../../../tools/Signature/Signature";
import Pdf from "../../../../../tools/Pdf/Pdf";
import JsonLecteur from "../../../../../tools/JsonLecteur/JsonLecteur";
import "./form.scss";

export const DechargeSortieForm: React.FC = () => {
  const [motif, setMotif] = useState("");
  const [signatureData, setSignatureData] = useState<string | null>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [etudiant, setEtudiant] = useState<{ nom: string, prenom: string, promotion: string } | null>(null);
  const signatureRef = useRef<any>(null);

  const handleDataLoaded = (data: { nom: string[], prenom: string[], PromotionEtudiant: string[] }) => {
    setEtudiant({
      nom: data.nom[0],
      prenom: data.prenom[0],
      promotion: data.PromotionEtudiant[0],
    });
  };

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
        <JsonLecteur onDataLoaded={handleDataLoaded} />
        {showPreview && etudiant && (
          <Pdf 
            text={motif} 
            imageBase64={signatureData} 
            showPreview={showPreview}
            prenom={etudiant.prenom} 
            nom={etudiant.nom} 
            promotion={etudiant.promotion}
          />
        )}
      </div>
    </>
  );
};

export default React.memo(DechargeSortieForm);
