import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Preview from '../preview/preview';
import { getNameFromEmail } from "../emailsUtils/emailsUtils";
import './Pdf.scss';

interface PdfProps {
  text: string;
  imageBase64: string | null;
  showPreview: boolean;
  toEmail: string;
}

const Pdf: React.FC<PdfProps> = ({ text, imageBase64, showPreview, toEmail }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const { prenom, nom } = getNameFromEmail(toEmail);

  useEffect(() => {
    if (showPreview) {
      const input = previewRef.current;
      if (input) {
        html2canvas(input)
          .then((canvas) => {
            const imgData = canvas.toDataURL('image/png');
            const imgElement = document.createElement('img');
            imgElement.src = imgData;
            document.body.appendChild(imgElement);
            const pdf = new jsPDF('p', 'mm', 'a4');
            const imgProps = pdf.getImageProperties(imgData);
            const pdfWidth = pdf.internal.pageSize.getWidth();
            const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight, undefined, 'FAST');

            const pdfData = pdf.output('datauristring').split(',')[1]; // Extraire la partie base64
            sendPdfToServer(pdfData, prenom, nom);
          })
          .catch((err) => {
            console.error('Error generating PDF:', err);
          });
      }
    }
  }, [showPreview]);

  const sendPdfToServer = (pdfData: string, prenom: string, nom: string) => {
    fetch('http://localhost:3000/send-email', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ pdfData, prenom, nom }),
    })
      .then(response => response.json())
      .then(data => {
        console.log('PDF sent successfully:', data);
      })
      .catch((error) => {
        console.error('Error sending PDF:', error);
      });
  };

  return (
    <>
      {showPreview && (
        <div className='Pdf'>
          <div ref={previewRef}>
            <Preview text={text} imageBase64={imageBase64} prenom={prenom} nom={nom} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pdf;
