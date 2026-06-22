import { useState, useMemo, useRef, useEffect } from 'react';
import { usePDF, PDFDownloadLink } from '@react-pdf/renderer';
import { FiZoomIn, FiZoomOut, FiDownload } from 'react-icons/fi';
import ResumePDFDocument from './pdf/ResumePDFDocument';

const A4Page = ({ data, theme, template }) => {
  // ─── Guard: only run on client ────────────────────────────────────
  if (typeof document === 'undefined') {
    return null;
  }

  const [zoom, setZoom] = useState(100);
  const canvasRef = useRef(null);
  const iframeRef = useRef(null);
  const [pdfjsLoaded, setPdfjsLoaded] = useState(false);
  const [pdfjsError, setPdfjsError] = useState(false);

  const pdfDocument = useMemo(
    () => <ResumePDFDocument data={data} theme={theme} template={template} />,
    [data, theme, template]
  );

  const [instance, updateInstance] = usePDF({ document: pdfDocument });
  const { url, loading, error } = instance;

  useEffect(() => {
    updateInstance(pdfDocument);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pdfDocument]);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 25, 200));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 25, 50));

  // ─── Load PDF.js dynamically from CDN ─────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (window.pdfjsLib) {
      setPdfjsLoaded(true);
      return;
    }
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js';
    script.async = true;
    script.onload = () => {
      if (window.pdfjsLib) {
        window.pdfjsLib.GlobalWorkerOptions.workerSrc =
          'https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js';
        setPdfjsLoaded(true);
      } else {
        setPdfjsError(true);
      }
    };
    script.onerror = () => setPdfjsError(true);
    document.head.appendChild(script);
  }, []);

  // ─── Render PDF onto HTML5 Canvas ─────────────────────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!pdfjsLoaded || !url || !canvasRef.current) return;

    let active = true;
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d');

    const renderPdf = async () => {
      try {
        // Fetch the PDF blob URL in the main thread (same-origin) to get an ArrayBuffer
        const response = await fetch(url);
        const arrayBuffer = await response.arrayBuffer();
        if (!active) return;

        // Pass the raw binary data to PDF.js to avoid worker-thread network fetch constraints
        const loadingTask = window.pdfjsLib.getDocument({ data: new Uint8Array(arrayBuffer) });
        const pdf = await loadingTask.promise;
        if (!active) return;

        const page = await pdf.getPage(1);
        if (!active) return;

        const viewport = page.getViewport({ scale: 2 });
        canvas.width = viewport.width;
        canvas.height = viewport.height;

        const renderContext = {
          canvasContext: context,
          viewport: viewport,
        };
        await page.render(renderContext).promise;
      } catch (err) {
        console.error('Error rendering PDF with PDF.js:', err);
      }
    };

    renderPdf();

    return () => {
      active = false;
    };
  }, [pdfjsLoaded, url]);

  // ─── Inject white background into fallback iframe ────────────────
  useEffect(() => {
    if (typeof window === 'undefined') return;
    if (!iframeRef.current) return;

    const iframe = iframeRef.current;
    const injectWhiteBackground = () => {
      try {
        const doc = iframe.contentDocument;
        if (!doc) return;
        const style = doc.createElement('style');
        style.textContent = `
          html, body {
            background-color: #ffffff !important;
            margin: 0;
            padding: 0;
          }
        `;
        doc.head.appendChild(style);
      } catch (e) {
        // Iframe not accessible (shouldn't happen with blob URLs)
      }
    };

    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') {
      injectWhiteBackground();
    } else {
      iframe.addEventListener('load', injectWhiteBackground);
      return () => iframe.removeEventListener('load', injectWhiteBackground);
    }
  }, [url]);

  const useFallback = error || pdfjsError;

  // ─── Fallback iframe view ──────────────────────────────────────────
  if (useFallback) {
    return (
      <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
        <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
          <div className="flex items-center gap-2">
            <button onClick={handleZoomOut} disabled={zoom <= 50} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50"><FiZoomOut /></button>
            <span className="text-sm font-medium text-gray-600 w-12 text-center">{zoom}%</span>
            <button onClick={handleZoomIn} disabled={zoom >= 200} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50"><FiZoomIn /></button>
          </div>
          <PDFDownloadLink
            document={pdfDocument}
            fileName={`${data.personal?.firstName || 'resume'}_${data.personal?.lastName || ''}_ATS.pdf`}
            className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
          >
            {({ loading }) => <><FiDownload /> {loading ? 'Preparing...' : 'Download PDF'}</>}
          </PDFDownloadLink>
        </div>

        <div className="flex-1 overflow-auto bg-gray-200 flex items-start justify-center p-8" style={{ backgroundColor: '#f3f4f6' }}>
          <div
            className="bg-white shadow-2xl transition-transform duration-200 ease-in-out overflow-hidden relative"
            style={{
              width: '210mm',
              height: '297mm',
              transform: `scale(${zoom/100})`,
              transformOrigin: 'top center',
              marginBottom: zoom > 100 ? `${((zoom-100)/100)*297}mm` : 0,
              backgroundColor: '#ffffff',
            }}
          >
            <iframe
              ref={iframeRef}
              src={`${url}#toolbar=0&navpanes=0&scrollbar=0&view=Fit`}
              width="100%"
              height="100%"
              className="border-0"
              title="PDF Preview"
            />
          </div>
        </div>
      </div>
    );
  }

  // ─── Loading state ────────────────────────────────────────────────
  if (loading || (!pdfjsLoaded && !pdfjsError)) {
    return (
      <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200 items-center justify-center">
        <div className="text-gray-500">Generating preview...</div>
      </div>
    );
  }

  // ─── Normal View: HTML5 Canvas rendering ──────────────────────────
  return (
    <div className="flex flex-col h-full bg-gray-100 rounded-lg overflow-hidden border border-gray-200">
      <div className="flex items-center justify-between p-3 bg-white border-b border-gray-200">
        <div className="flex items-center gap-2">
          <button onClick={handleZoomOut} disabled={zoom <= 50} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50"><FiZoomOut /></button>
          <span className="text-sm font-medium text-gray-600 w-12 text-center">{zoom}%</span>
          <button onClick={handleZoomIn} disabled={zoom >= 200} className="p-1.5 rounded hover:bg-gray-100 text-gray-600 disabled:opacity-50"><FiZoomIn /></button>
        </div>
        <PDFDownloadLink
          document={pdfDocument}
          fileName={`${data.personal?.firstName || 'resume'}_${data.personal?.lastName || ''}_ATS.pdf`}
          className="flex items-center gap-2 px-3 py-1.5 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 transition-colors"
        >
          {({ loading }) => <><FiDownload /> {loading ? 'Preparing...' : 'Download PDF'}</>}
        </PDFDownloadLink>
      </div>

      <div className="flex-1 overflow-auto bg-gray-200 flex items-start justify-center p-8" style={{ backgroundColor: '#f3f4f6' }}>
        <div
          className="bg-white shadow-2xl transition-transform duration-200 ease-in-out overflow-hidden relative"
          style={{
            width: '210mm',
            height: '297mm',
            transform: `scale(${zoom/100})`,
            transformOrigin: 'top center',
            marginBottom: zoom > 100 ? `${((zoom-100)/100)*297}mm` : 0,
            backgroundColor: '#ffffff',
          }}
        >
          <canvas
            ref={canvasRef}
            className="w-full h-full object-contain"
            style={{ backgroundColor: '#ffffff', display: 'block' }}
          />
        </div>
      </div>
    </div>
  );
};

export default A4Page;