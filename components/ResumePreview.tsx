import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon, BackIcon } from './icons';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';
import { TemplateATS } from './templates/TemplateATS';
import { TemplateATSPro } from './templates/TemplateATSPro';

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
  'ats': TemplateATS,
  'ats-pro': TemplateATSPro,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, onEdit }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    // Check if libraries are loaded
    if (typeof html2canvas === 'undefined') {
      alert("PDF library (html2canvas) is not loaded. Please refresh the page and try again.");
      return;
    }
    if (typeof jspdf === 'undefined' || !jspdf.jsPDF) {
      alert("PDF library (jsPDF) is not loaded. Please refresh the page and try again.");
      return;
    }

    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: false,
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

      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

    } catch (error: any) {
      console.error("Error downloading PDF:", error);
      alert(`Error generating PDF: ${error.message || 'Unknown error'}. Please try again.`);
    } finally {
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="space-y-6 pb-20 sm:pb-0">
      {/* Header with buttons */}
      <div className="bg-white p-4 rounded-xl border border-gray-200 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3">
        <h2 className="text-xl font-semibold text-gray-900">Final Preview</h2>
        <div className="flex items-center gap-3">
          <Button onClick={onEdit} variant="secondary">
            <BackIcon /> Edit
          </Button>
          <Button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="hidden sm:flex"
          >
            {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className="bg-gray-200 border border-gray-300 rounded-xl p-4 sm:p-8 A4-aspect-ratio">
        <div className="bg-white text-black shadow-lg rounded-lg h-full overflow-auto">
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

      {/* Mobile floating download button */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden z-50">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="w-full py-3 px-6 rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors"
        >
          {isDownloading ? <><SpinnerIcon />Downloading...</> : <><DownloadIcon />Download PDF</>}
        </button>
      </div>
    </div>
  );
};
