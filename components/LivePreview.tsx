import React, { useRef, useState, useEffect, useCallback } from 'react';
import { ResumeData } from '../types';
import { Button } from './ui/Button';
import { DownloadIcon, SpinnerIcon, BackIcon } from './icons';
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
}

const templates: { [key in Template]: React.ForwardRefExoticComponent<any> } = {
  classic: TemplateClassic,
  modern: TemplateModern,
  compact: TemplateCompact,
  'ats': TemplateATS,
  'ats-pro': TemplateATSPro,
};

// Zoom icons
const ZoomInIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v6m3-3H7" />
  </svg>
);

const ZoomOutIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
  </svg>
);

const ResetZoomIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
  </svg>
);

const FullscreenIcon = () => (
  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5v-4m0 4h-4m4 0l-5-5" />
  </svg>
);

export const LivePreview: React.FC<LivePreviewProps> = ({
  resumeData,
  template,
  onEdit,
  onSave
}) => {
  const previewRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDownloading, setIsDownloading] = useState(false);
  const [scale, setScale] = useState(1);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [touchStartDistance, setTouchStartDistance] = useState<number | null>(null);
  const [initialScale, setInitialScale] = useState(1);

  const { showToast } = useToast();

  const minScale = 0.5;
  const maxScale = 2;

  // Zoom controls
  const zoomIn = () => {
    setScale((prev) => Math.min(prev + 0.25, maxScale));
  };

  const zoomOut = () => {
    setScale((prev) => Math.max(prev - 0.25, minScale));
  };

  const resetZoom = () => {
    setScale(1);
  };

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  // Handle pinch-to-zoom on touch devices
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

  // Attach touch event listeners
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
      const delta = e.deltaY > 0 ? -0.1 : 0.1;
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

    if (typeof html2canvas === 'undefined') {
      showToast("PDF library not loaded. Please refresh the page.", 'error');
      return;
    }
    if (typeof jspdf === 'undefined' || !jspdf.jsPDF) {
      showToast("PDF library not loaded. Please refresh the page.", 'error');
      return;
    }

    setIsDownloading(true);
    try {
      // Temporarily reset scale for proper capture
      const originalScale = scale;
      setScale(1);

      // Wait for scale change to apply
      await new Promise(resolve => setTimeout(resolve, 100));

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

      // Restore original scale
      setScale(originalScale);

      showToast('Resume downloaded successfully!', 'success');
      onSave?.();

    } catch (error: any) {
      console.error("Error downloading PDF:", error);
      showToast(`Error generating PDF: ${error.message || 'Unknown error'}`, 'error');
    } finally {
      setIsDownloading(false);
    }
  };

  const SelectedTemplate = templates[template];

  return (
    <div className={`${isFullscreen ? 'fixed inset-0 z-50 bg-gray-900' : 'space-y-4 pb-24 md:pb-6'}`}>
      {/* Header with controls */}
      <div className={`bg-white p-4 rounded-xl border border-gray-200 ${isFullscreen ? 'absolute top-4 left-4 right-4 z-10' : ''}`}>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold text-gray-900">Live Preview</h2>

            {/* Zoom controls - Mobile */}
            <div className="flex items-center gap-1 md:hidden">
              <button
                onClick={zoomOut}
                disabled={scale <= minScale}
                className="p-2 min-w-[40px] min-h-[40px] rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 touch-action-manipulation"
                aria-label="Zoom out"
              >
                <ZoomOutIcon />
              </button>
              <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= maxScale}
                className="p-2 min-w-[40px] min-h-[40px] rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30 touch-action-manipulation"
                aria-label="Zoom in"
              >
                <ZoomInIcon />
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2 justify-between md:justify-end">
            {/* Zoom controls - Desktop */}
            <div className="hidden md:flex items-center gap-1 mr-2">
              <button
                onClick={zoomOut}
                disabled={scale <= minScale}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                aria-label="Zoom out"
              >
                <ZoomOutIcon />
              </button>
              <span className="text-sm font-medium text-gray-600 min-w-[3rem] text-center">
                {Math.round(scale * 100)}%
              </span>
              <button
                onClick={zoomIn}
                disabled={scale >= maxScale}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-30"
                aria-label="Zoom in"
              >
                <ZoomInIcon />
              </button>
              <button
                onClick={resetZoom}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                aria-label="Reset zoom"
              >
                <ResetZoomIcon />
              </button>
              <button
                onClick={toggleFullscreen}
                className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                aria-label="Toggle fullscreen"
              >
                <FullscreenIcon />
              </button>
            </div>

            <Button onClick={onEdit} variant="secondary" className="flex-1 md:flex-none">
              <BackIcon /> Edit
            </Button>
            <Button
              onClick={handleDownloadPdf}
              disabled={isDownloading}
              className="hidden md:flex"
            >
              {isDownloading ? <SpinnerIcon /> : <DownloadIcon />}
              {isDownloading ? 'Downloading...' : 'Download PDF'}
            </Button>
          </div>
        </div>

        {/* Mobile zoom hint */}
        <p className="text-xs text-gray-500 mt-2 md:hidden">
          Pinch to zoom • Ctrl+Scroll on desktop
        </p>
      </div>

      {/* Resume Preview Container */}
      <div
        ref={containerRef}
        className={`
          bg-gray-200 border border-gray-300 rounded-xl overflow-auto
          ${isFullscreen ? 'absolute inset-0 top-28 m-4 mt-0' : 'p-3 md:p-6 lg:p-8'}
        `}
        style={{
          touchAction: 'pan-x pan-y',
        }}
      >
        <div
          className="flex items-start justify-center min-h-full"
          style={{
            transform: `scale(${scale})`,
            transformOrigin: 'top center',
            transition: 'transform 0.2s ease-out',
          }}
        >
          <div
            className="bg-white text-black shadow-lg rounded-lg overflow-hidden"
            style={{
              width: '210mm',
              minHeight: '297mm',
            }}
          >
            <SelectedTemplate ref={previewRef} resumeData={resumeData} />
          </div>
        </div>
      </div>

      {/* Mobile floating download button */}
      <div className={`fixed bottom-0 left-0 right-0 md:hidden z-50 bg-white/95 backdrop-blur-sm border-t border-gray-200 safe-area-bottom ${isFullscreen ? 'hidden' : ''}`}>
        <div className="container mx-auto px-4 py-3 flex gap-3">
          <button
            onClick={toggleFullscreen}
            className="p-3 min-h-[48px] rounded-lg text-gray-600 bg-gray-100 hover:bg-gray-200 touch-action-manipulation"
            aria-label="Fullscreen"
          >
            <FullscreenIcon />
          </button>
          <button
            onClick={handleDownloadPdf}
            disabled={isDownloading}
            className="flex-1 py-3.5 px-6 min-h-[48px] rounded-lg text-base font-medium text-white bg-blue-600 hover:bg-blue-700 active:bg-blue-800 flex items-center justify-center gap-2 disabled:opacity-50 transition-colors touch-action-manipulation"
          >
            {isDownloading ? <><SpinnerIcon />Downloading...</> : <><DownloadIcon />Download PDF</>}
          </button>
        </div>
      </div>

      {/* Fullscreen close button */}
      {isFullscreen && (
        <button
          onClick={toggleFullscreen}
          className="fixed top-4 right-4 z-50 p-3 bg-white rounded-full shadow-lg text-gray-600 hover:text-gray-900"
          aria-label="Exit fullscreen"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default LivePreview;
