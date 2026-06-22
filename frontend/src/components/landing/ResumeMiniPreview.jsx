import { useEffect, useRef, useState, useMemo, memo } from 'react';
import * as pdfjsLib from 'pdfjs-dist';
import { usePDF } from '@react-pdf/renderer';
import ResumePDFDocument from '../builder/pdf/ResumePDFDocument';

// Resolve local pdfjs worker URL natively using Vite's static asset URL asset loader
import pdfjsWorkerUrl from 'pdfjs-dist/build/pdf.worker.js?url';

// Configure pdfjs worker source path
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;

const ResumeMiniPreview = ({ templateId, data }) => {
  const canvasRef = useRef(null);
  const [renderError, setRenderError] = useState(false);

  // Setup static theme settings for the preview
  const themeSettings = useMemo(() => ({
    accentColor: 'indigo',
    fontFamily: 'inter',
    spacing: 'normal',
    showPhoto: false,
    sectionOrder: [
      'personal',
      'summary',
      'experience',
      'education',
      'skills',
      'projects',
      'certifications',
    ],
    hiddenSections: [],
  }), []);

  // Memoize document element to compile once per template details change
  const pdfDocument = useMemo(
    () => <ResumePDFDocument data={data} theme={themeSettings} template={templateId} />,
    [data, themeSettings, templateId]
  );

  // Compile PDF document to blob URL via @react-pdf/renderer
  const [instance, updateInstance] = usePDF({ document: pdfDocument });
  const { url, loading, error } = instance;

  // Re-trigger instance compilation if document changes
  useEffect(() => {
    updateInstance(pdfDocument);
  }, [pdfDocument, updateInstance]);

  // Render first PDF page onto HTML5 Canvas
  useEffect(() => {
    if (!url || !canvasRef.current) return;

    let active = true;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const renderPdf = async () => {
      try {
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        if (!active) return;

        const loadingTask = pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        if (!active) return;

        const page = await pdf.getPage(1);
        if (!active) return;

        const viewport = page.getViewport({ scale: 1.5 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering mini PDF preview:', err);
        if (active) setRenderError(true);
      }
    };

    renderPdf();

    return () => {
      active = false;
    };
  }, [url]);

  if (error || renderError) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50 dark:bg-gray-800 text-[10px] text-red-500/80 p-4 text-center">
        Preview Unavailable
      </div>
    );
  }

  if (loading || !url) {
    return (
      <div className="flex items-center justify-center h-full w-full bg-gray-50 dark:bg-gray-800">
        <div className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <canvas
      ref={canvasRef}
      className="w-full h-full object-cover object-top select-none pointer-events-none"
      style={{ display: 'block' }}
    />
  );
};

export default memo(ResumeMiniPreview);
