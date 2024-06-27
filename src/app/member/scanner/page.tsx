'use client';

// Example usage in another component
import React, { useState } from 'react';
import QRScanner from '../../../../components/QRScanner';

const App: React.FC = () => {
  const [qrCodeContent, setQRCodeContent] = useState<string | null>(null);

  const handleScan = (result: string | null) => {
    console.log('scan')
    setQRCodeContent(result);
  };

  return (
    <div className='h-full'>
      <div className="w-[90%] max-w-[500px] aspect-square relative">
        <QRScanner onScan={handleScan} />
      </div>
      {qrCodeContent && (
        <div>
          <h2>Scanned QR Code Content:</h2>
          <p>{qrCodeContent}</p>
        </div>
      )}
    </div>
  );
};

export default App;
