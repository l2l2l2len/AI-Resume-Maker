import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon } from './icons';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';

declare const html2canvas: any;
declare const jspdf: { jsPDF: any };

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
}

const templates: { [key in Template]: React.ForwardRefExoticComponent<any> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
  compact: TemplateCompact,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isExporting, setIsExporting] = useState(false);

  const handleExportPdf = async () => {
    if (!previewRef.current) return;
    setIsExporting(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff', // Set a solid background for PDF
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jspdf.jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      const canvasAspectRatio = canvas.width / canvas.height;
      const pdfAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (canvasAspectRatio > pdfAspectRatio) {
          finalWidth = pdfWidth;
          finalHeight = pdfWidth / canvasAspectRatio;
      } else {
          finalHeight = pdfHeight;
          finalWidth = pdfHeight * canvasAspectRatio;
      }
      
      const x = (pdfWidth - finalWidth) / 2;
      const y = 0;

      pdf.addImage(imgData, 'PNG', x, y, finalWidth, finalHeight);
      
      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_')}_Resume.pdf`;
      pdf.save(fileName);

    } catch (error) {
      console.error("Error exporting PDF:", error);
      alert("Sorry, there was an error exporting the PDF. Please check the console for more details.");
    } finally {
      setIsExporting(false);
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="bg-slate-900/50 border border-slate-700/50 shadow-lg rounded-lg p-8 A4-aspect-ratio backdrop-blur-sm relative">
      <Button 
        onClick={handleExportPdf}
        disabled={isExporting}
        variant="secondary"
        className="absolute top-4 right-4 z-10"
      >
        {isExporting ? <SpinnerIcon /> : <DownloadIcon />}
        {isExporting ? 'Exporting...' : 'Export PDF'}
      </Button>

      <div className="bg-white text-black shadow-inner rounded-md h-full overflow-auto">
        <SelectedTemplate ref={previewRef} resumeData={resumeData} />
      </div>
      <style>{`
        @media screen {
          .A4-aspect-ratio {
            aspect-ratio: 210 / 297;
            max-width: 800px;
            margin-left: auto;
            margin-right: auto;
          }
        }
      `}</style>
    </div>
  );
};
