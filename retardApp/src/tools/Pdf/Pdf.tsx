import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Preview from '../Preview/preview';
import './Pdf.scss';

interface PdfProps {
  text: string;
  imageBase64: string | null;
  showPreview: boolean;
  prenom: string;
  nom: string;
  promotion: string;
  dateHeure: string | null; // Ajouter dateHeure dans les props
}

const Pdf: React.FC<PdfProps> = ({ text, imageBase64, showPreview, prenom, nom, promotion, dateHeure }) => {
  const previewRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (showPreview) {
      const input = previewRef.current;
      if (input) {
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

            // Ajouter l'image de la signature manuellement
            if (imageBase64) {
              // Ajouter l'image de la signature à une position spécifique dans le PDF
              // Vous pouvez ajuster les coordonnées x et y ainsi que la largeur et la hauteur de l'image selon vos besoins
              const signatureX = 10; // Position X
              const signatureY = pdfHeight + 10; // Position Y après l'image du canvas
              const signatureWidth = 50; // Largeur de l'image de la signature
              const signatureHeight = 20; // Hauteur de l'image de la signature
              pdf.addImage(imageBase64, 'PNG', signatureX, signatureY, signatureWidth, signatureHeight);
            }

            // Nom du fichier PDF à télécharger
            const fileName = `Decharge_Sortie_${prenom}_${nom}_${new Date().toISOString().split('T')[0]}.pdf`;

            // Télécharger le PDF
            pdf.save(fileName);
          })
          .catch((err) => {
            console.error('Error generating PDF:', err);
          });
      }
    }
  }, [showPreview, prenom, nom, text, imageBase64, promotion, dateHeure]);

  return (
    <>
      {showPreview && (
        <div className='Pdf'>
          <div ref={previewRef}>
            <Preview 
              text={text} 
              imageBase64={imageBase64} 
              prenom={prenom} 
              nom={nom} 
              promotion={promotion} 
              dateHeure={dateHeure}
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pdf;
