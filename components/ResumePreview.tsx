import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon, BackIcon } from './icons';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';
import { Template3D } from './templates/Template3D';

declare const html2canvas: any;
declare const jspdf: { jsPDF: any };

interface ResumePreviewProps {
  resumeData: ResumeData;
  template: Template;
  onEdit: () => void;
}

const templates: { [key in Template]: React.ForwardRefExoticComponent<any> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
  compact: TemplateCompact,
  '3d': Template3D,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, onEdit }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
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
      const pageAspectRatio = pdfWidth / pdfHeight;

      let finalWidth, finalHeight;
      if (canvasAspectRatio > pageAspectRatio) {
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
      console.error("Error downloading PDF:", error);
      alert("Sorry, there was an error downloading the PDF. Please check the console for more details.");
    } finally {
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="space-y-6">
      <div className="bg-white/70 backdrop-blur-lg p-4 rounded-lg shadow-md border border-slate-200 flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-800">Final Preview</h2>
          <div className="flex items-center gap-4">
              <Button onClick={onEdit} variant="secondary">
                  <BackIcon /> Edit Details
              </Button>
              <Button 
                onClick={handleDownloadPdf}
                disabled={isDownloading}
              >
                {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
                {isDownloading ? 'Downloading...' : 'Download PDF'}
              </Button>
          </div>
      </div>
      
      <div className="bg-slate-200 border border-slate-300 shadow-lg rounded-lg p-8 A4-aspect-ratio">
        <div className="bg-white text-black shadow-inner rounded-md h-full overflow-auto">
          <SelectedTemplate ref={previewRef} resumeData={resumeData} />
        </div>
        <style>{`
          .A4-aspect-ratio {
            width: 100%;
            max-width: 850px;
            margin-left: auto;
            margin-right: auto;
          }
          @media screen and (min-width: 768px) {
            .A4-aspect-ratio {
              aspect-ratio: 210 / 297;
            }
          }
        `}</style>
      </div>
    </div>
  );
};