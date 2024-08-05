import React, { useState, useRef, useCallback } from "react";
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
  const [dateHeure, setDateHeure] = useState<string | null>(null); // Nouveau state pour la date et l'heure
  const signatureRef = useRef<any>(null);

  const handleDataLoaded = useCallback((data: { nom: string[], prenom: string[], PromotionEtudiant: string[] }) => {
    setEtudiant({
      nom: data.nom[0],
      prenom: data.prenom[0],
      promotion: data.PromotionEtudiant[0],
    });
  }, []);

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

    // Récupérer la date et l'heure actuelle
    const now = new Date();
    const day = String(now.getDate()).padStart(2, '0');
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const year = now.getFullYear();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const dateHeureString = `${day}/${month}/${year} à ${hours}h${minutes}`;
    setDateHeure(dateHeureString);

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
            dateHeure={dateHeure} // Passer la date et l'heure au composant Pdf
          />
        )}
      </div>
    </>
  );
};

export default React.memo(DechargeSortieForm);
