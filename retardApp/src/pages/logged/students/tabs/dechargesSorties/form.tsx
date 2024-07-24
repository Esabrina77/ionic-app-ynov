import React, { useState, useRef } from "react";
import { Header } from "../../../../../components/ui/Header";
import Signature from "../../../../../components/Signature/Signature"; // Assurez-vous que le chemin est correct
import "./form.scss";

export const DechargeSortieForm: React.FC = () => {
  const [currentTab, setCurrentTab] = useState("decharge");
  const [motif, setMotif] = useState(""); // État pour stocker le texte du textarea
  const [error, setError] = useState<string | null>(null); // État pour stocker les messages d'erreur
  const signatureRef = useRef<any>(null); // Référence pour accéder au composant Signature

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
  };

  const save = () => {
    setError(null); // Réinitialiser l'erreur

    console.log("Texte du motif:", motif);

    // Récupérer les données de la signature
    if (signatureRef.current) {
      const signatureData = signatureRef.current.getSignature();
      if (signatureData) {
        console.log("Signature data:", signatureData);
        // Traitement de la signature valide ici
      } else {
        setError("Aucune signature ajoutée.");
      }
    }
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
        {error && <p className="error">{error}</p>} {/* Affichage du message d'erreur */}
      </div>
    </>
  );
};
