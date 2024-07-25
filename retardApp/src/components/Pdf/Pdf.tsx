import React, { useRef, useEffect } from 'react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import Preview from "../preview/preview";
import "./Pdf.scss";

interface PdfProps {
  text: string;
  imageBase64: string | null;
  showPreview: boolean;
}

const Pdf: React.FC<PdfProps> = ({ text, imageBase64, showPreview }) => {
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
            pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);

            // Log PDF as base64 string (for testing, this can be removed)
            const pdfData = pdf.output('datauristring');
            console.log("PDF Data URI:", pdfData);

            // Optionally, you can remove the following line if you want to avoid triggering multiple renders
            // pdf.save('DéchargeSortie.pdf');
          })
          .catch((err) => {
            console.error('Error generating PDF:', err);
          });
      }
    }
  }, [showPreview]); // This effect will only run when showPreview changes

  return (
    <>
      {showPreview && (
        <div className='Pdf'>
          <div ref={previewRef}>
            <Preview text={text} imageBase64={imageBase64} />
          </div>
        </div>
      )}
    </>
  );
};

export default Pdf;