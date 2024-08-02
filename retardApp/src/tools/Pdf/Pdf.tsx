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
              dateHeure={dateHeure} // Passer dateHeure au composant Preview
            />
          </div>
        </div>
      )}
    </>
  );
};

export default Pdf;
