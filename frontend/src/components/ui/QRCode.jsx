import { useEffect, useRef } from 'react';
import { FiDownload } from 'react-icons/fi';

// Note: You'll need to install: npm install qrcode.react
import QRCode from 'qrcode.react';

const QRCodeComponent = ({ value, size = 200, download = true }) => {
  const qrRef = useRef(null);

  const downloadQR = () => {
    const canvas = qrRef.current?.querySelector('canvas');
    if (canvas) {
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <div 
        ref={qrRef}
        className="bg-white p-4 rounded-xl shadow-lg"
      >
        <QRCode
          value={value}
          size={size}
          bgColor="#ffffff"
          fgColor="#1a1a2e"
          level="H"
          includeMargin
        />
      </div>
      
      {download && (
        <button
          onClick={downloadQR}
          className="flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors"
        >
          <FiDownload size={16} />
          Download QR Code
        </button>
      )}
    </div>
  );
};

export default QRCodeComponent;