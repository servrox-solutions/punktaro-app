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
      <div className="w-[100%] max-w-[500px] relative">
        <QRScanner onScan={handleScan} />
        <div className="absolute top-[50%] left-[50%] translate-y-[-50%] translate-x-[-50%] h-[90%] aspect-square border-2 border-red"></div>
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
