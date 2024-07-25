import React from 'react';
import "./preview.scss";

interface PreviewProps {
  text: string;
  imageBase64: string | null;
  prenom: string;
  nom: string;
}

const Preview: React.FC<PreviewProps> = ({ text, imageBase64, prenom, nom }) => {
  return (
    <div className="Preview">
      <div className="PreviewContent">
        <p>AIX YNOV CAMPUS</p>
        <p>Décharge pour sortie anticipée</p>
        <p>Je soussigné(e) {prenom} {nom}, en classe de ............................................</p>
        <p>
          décharge AIX YNOV CAMPUS, ainsi que le professeur/intervenant responsable, de toutes responsabilités en cas d’incident éventuel pouvant survenir hors établissement, suite à la sortie prématurée du cours à ce jour le
          ................../............./.................. à ...............h.................
        </p>
        <p>Avec pour motif :</p>
        <p>{text}</p>
        <p>Signature « lu et approuvé » de l’étudiant :</p>
        <p>Lu et Approuvé</p>
        <div className="PreviewSignature">
          {imageBase64 ? (
            <img src={imageBase64} alt="Signature" style={{ maxWidth: '100%', height: 'auto' }} />
          ) : (
            <p>Aucune signature disponible</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Preview;