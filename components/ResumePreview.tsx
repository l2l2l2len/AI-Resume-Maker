import React, { useRef, useState } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon, BackIcon } from './icons';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';
import { Template3D } from './templates/Template3D';
import { TemplateATS } from './templates/TemplateATS';
import { TemplateATSPro } from './templates/TemplateATSPro';
import { useTheme } from '../contexts/ThemeContext';

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
  'ats': TemplateATS,
  'ats-pro': TemplateATSPro,
};

export const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, template, onEdit }) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const { theme } = useTheme();
  const isLight = theme === 'light';

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;
    setIsDownloading(true);
    try {
      const canvas = await html2canvas(previewRef.current, {
        scale: 3,
        useCORS: true,
        backgroundColor: '#ffffff',
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
    <div className="space-y-4 sm:space-y-6">
      {/* Header with buttons - Mobile optimized */}
      <div
        className={`p-3 sm:p-4 rounded-lg shadow-md border flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 ${
          isLight
            ? 'bg-white/70 backdrop-blur-lg border-slate-200'
            : 'bg-slate-800/70 backdrop-blur-lg border-slate-700'
        }`}
      >
        <h2 className={`text-lg sm:text-xl font-semibold ${isLight ? 'text-slate-800' : 'text-white'}`}>
          Final Preview
        </h2>
        <div className="flex items-center gap-2 sm:gap-4">
          <Button onClick={onEdit} variant="secondary" className="flex-1 sm:flex-none text-sm sm:text-base py-2 sm:py-2.5">
            <BackIcon /> <span className="hidden xs:inline">Edit</span>
          </Button>
          <Button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex-1 sm:flex-none text-sm sm:text-base py-2 sm:py-2.5"
          >
            {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
            {isDownloading ? 'Downloading...' : 'Download PDF'}
          </Button>
        </div>
      </div>

      {/* Resume Preview */}
      <div className={`border shadow-lg rounded-lg p-2 sm:p-8 A4-aspect-ratio ${
        isLight ? 'bg-slate-200 border-slate-300' : 'bg-slate-700 border-slate-600'
      }`}>
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

      {/* Mobile floating download button */}
      <div className="fixed bottom-4 left-4 right-4 sm:hidden z-50">
        <button
          onClick={handleDownloadPdf}
          disabled={isDownloading}
          className="w-full py-3 px-6 rounded-xl text-base font-semibold text-white flex items-center justify-center gap-2 disabled:opacity-50"
          style={{
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            boxShadow: '0 10px 25px rgba(102, 126, 234, 0.4)',
          }}
        >
          {isDownloading ? (
            <>
              <SpinnerIcon />
              Downloading...
            </>
          ) : (
            <>
              <DownloadIcon />
              Download PDF
            </>
          )}
        </button>
      </div>
    </div>
  );
};
