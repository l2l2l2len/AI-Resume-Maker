import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ResumeData } from '../types';
import { Template } from '../App';
import { TemplateClassic } from './templates/TemplateClassic';
import { TemplateModern } from './templates/TemplateModern';
import { TemplateCompact } from './templates/TemplateCompact';
import { TemplateATS } from './templates/TemplateATS';
import { TemplateATSPro } from './templates/TemplateATSPro';
import { useToast } from './ui/Toast';

declare const html2canvas: any;
declare const jspdf: { jsPDF: any };

interface LivePreviewProps {
  resumeData: ResumeData;
  template: Template;
  onEdit: () => void;
  onSave?: () => void;
  onChangeTemplate?: () => void;
}

const templates: { [key in Template]: React.ForwardRefExoticComponent<any> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
  compact: TemplateCompact,
  'ats': TemplateATS,
  'ats-pro': TemplateATSPro,
};

// Icons
const ChevronLeftIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
  </svg>
);

const ShareIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
  </svg>
);

const SunIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
  </svg>
);

const GridIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const DownloadIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
  </svg>
);

const MoreIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
  </svg>
);

const DocumentTextIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const SpinnerIcon = () => (
  <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
  </svg>
);

export const LivePreview: React.FC<LivePreviewProps> = ({
  resumeData,
  template,
  onEdit,
  onSave,
  onChangeTemplate
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [scale, setScale] = useState(0.4); // Start smaller on mobile
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(0.4);

  const { showToast } = useToast();

  const minScale = 0.3;
  const maxScale = 1.5;

  // Set initial scale based on screen width
  useEffect(() => {
    const updateScale = () => {
      const width = window.innerWidth;
      if (width < 480) {
        setScale(0.35);
        setInitialScale(0.35);
      } else if (width < 768) {
        setScale(0.45);
        setInitialScale(0.45);
      } else {
        setScale(0.6);
        setInitialScale(0.6);
      }
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, []);

  // Handle pinch-to-zoom
  const getTouchDistance = (touches: TouchList) => {
    if (touches.length < 2) return null;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2) {
      e.preventDefault();
      const distance = getTouchDistance(e.touches);
      setTouchStartDistance(distance);
      setInitialScale(scale);
    }
  }, [scale]);

  const handleTouchMove = useCallback((e: TouchEvent) => {
    if (e.touches.length === 2 && touchStartDistance !== null) {
      e.preventDefault();
      const currentDistance = getTouchDistance(e.touches);
      if (currentDistance) {
        const scaleFactor = currentDistance / touchStartDistance;
        const newScale = Math.min(Math.max(initialScale * scaleFactor, minScale), maxScale);
        setScale(newScale);
      }
    }
  }, [touchStartDistance, initialScale]);

  const handleTouchEnd = useCallback(() => {
    setTouchStartDistance(null);
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('touchstart', handleTouchStart, { passive: false });
      container.addEventListener('touchmove', handleTouchMove, { passive: false });
      container.addEventListener('touchend', handleTouchEnd);
      return () => {
        container.removeEventListener('touchstart', handleTouchStart);
        container.removeEventListener('touchmove', handleTouchMove);
        container.removeEventListener('touchend', handleTouchEnd);
      };
    }
  }, [handleTouchStart, handleTouchMove, handleTouchEnd]);

  // Handle mouse wheel zoom
  const handleWheel = useCallback((e: WheelEvent) => {
    if (e.ctrlKey || e.metaKey) {
      e.preventDefault();
      const delta = e.deltaY > 0 ? -0.05 : 0.05;
      setScale((prev) => Math.min(Math.max(prev + delta, minScale), maxScale));
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
      return () => container.removeEventListener('wheel', handleWheel);
    }
  }, [handleWheel]);

  const handleDownloadPdf = async () => {
    if (!previewRef.current) return;

    if (typeof html2canvas === 'undefined' || typeof jspdf === 'undefined') {
      showToast("PDF library not loaded. Please refresh.", 'error');
      return;
    }

    setIsDownloading(true);
    setShowMoreMenu(false);

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
      pdf.addImage(imgData, 'PNG', x, 0, finalWidth, finalHeight);

      const fileName = `${resumeData.personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.pdf`;
      pdf.save(fileName);

      showToast('Resume downloaded!', 'success');
      onSave?.();
    } catch (error: any) {
      showToast(`Error: ${error.message || 'Download failed'}`, 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const handleExportTxt = () => {
    setShowMoreMenu(false);
    const { personalInfo, education, experience, skills, summary } = resumeData;

    let txt = `${personalInfo.name}\n`;
    txt += `${personalInfo.email} | ${personalInfo.phone}\n`;
    if (personalInfo.linkedin) txt += `LinkedIn: ${personalInfo.linkedin}\n`;
    if (personalInfo.website) txt += `Website: ${personalInfo.website}\n`;
    txt += `\n--- SUMMARY ---\n${summary}\n`;
    txt += `\n--- EXPERIENCE ---\n`;
    experience.forEach(exp => {
      txt += `${exp.role} at ${exp.company} (${exp.date})\n`;
      exp.bulletPoints.forEach(bp => txt += `  • ${bp}\n`);
    });
    txt += `\n--- EDUCATION ---\n`;
    education.forEach(edu => {
      txt += `${edu.degree} - ${edu.institution} (${edu.date})\n`;
    });
    txt += `\n--- SKILLS ---\n${skills.join(', ')}\n`;

    const blob = new Blob([txt], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${personalInfo.name.replace(/\s+/g, '_') || 'Resume'}_Resume.txt`;
    a.click();
    URL.revokeObjectURL(url);

    showToast('Exported as TXT!', 'success');
  };

  const handleShare = async () => {
    setShowMoreMenu(false);
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${resumeData.personalInfo.name}'s Resume`,
          text: 'Check out my resume!',
        });
      } catch (e) {
        // User cancelled
      }
    } else {
      showToast('Sharing not supported on this device', 'info');
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className="min-h-screen bg-gray-900 flex flex-col -mx-4 -mt-4">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 px-4 py-3">
        <div className="flex items-center justify-between">
          <button
            onClick={onEdit}
            className="flex items-center gap-1 text-white text-sm font-medium"
          >
            <ChevronLeftIcon />
            <span>Edit Resume</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={handleShare}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-gray-700 rounded-lg"
            >
              <ShareIcon />
              <span>Share Resume</span>
            </button>
            <button className="p-2 text-gray-400 hover:text-white">
              <SunIcon />
            </button>
          </div>
        </div>
      </div>

      {/* Page count */}
      <div className="text-center py-2 text-xs text-gray-400">
        Total: 1 pages
      </div>

      {/* Preview Container */}
      <div
        ref={containerRef}
        className="flex-1 overflow-auto px-4 pb-24"
        style={{ touchAction: 'pan-x pan-y' }}
      >
        <div className="flex justify-center py-4">
          <div
            style={{
              transform: `scale(${scale})`,
              transformOrigin: 'top center',
              transition: 'transform 0.15s ease-out',
            }}
          >
            <div
              className="bg-white text-black shadow-2xl rounded-lg overflow-hidden"
              style={{
                width: '210mm',
                minHeight: '297mm',
              }}
            >
              <SelectedTemplate ref={previewRef} resumeData={resumeData} />
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700 z-40 safe-area-bottom">
        <div className="grid grid-cols-3 divide-x divide-gray-700">
          {/* Change Templates */}
          <button
            onClick={onChangeTemplate || onEdit}
            className="flex flex-col items-center justify-center py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
          >
            <GridIcon />
            <span className="text-[10px] mt-1">Change Templates</span>
          </button>

          {/* Download PDF */}
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex flex-col items-center justify-center py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors disabled:opacity-50"
          >
            {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
            <span className="text-[10px] mt-1">
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </span>
          </button>

          {/* More */}
          <div className="relative">
            <button
              onClick={() => setShowMoreMenu(!showMoreMenu)}
              className="w-full flex flex-col items-center justify-center py-3 text-gray-300 hover:text-white hover:bg-gray-700 transition-colors"
            >
              <MoreIcon />
              <span className="text-[10px] mt-1">More</span>
            </button>

            {/* More Menu Dropdown */}
            {showMoreMenu && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setShowMoreMenu(false)}
                />
                <div className="absolute bottom-full right-2 mb-2 w-44 bg-white rounded-xl shadow-xl z-50 overflow-hidden">
                  <button
                    onClick={handleExportTxt}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50"
                  >
                    <DocumentTextIcon />
                    Export to TXT
                  </button>
                  <button
                    onClick={handleShare}
                    className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 border-t border-gray-100"
                  >
                    <ShareIcon />
                    Share resume
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LivePreview;
