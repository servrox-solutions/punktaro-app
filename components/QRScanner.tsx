// components/QRScanner.tsx
'use client';

import React, { useEffect, useRef } from 'react';
import QrScanner from 'qr-scanner';

interface QRScannerProps {
  onScan: (result: string | null) => void;
}

const QRScanner: React.FC<QRScannerProps> = ({ onScan }) => {
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (!videoRef.current) return;

    const scanner = new QrScanner(videoRef.current, result => {
      onScan(result.data); // Call the callback function with the scanned result
      scanner.stop(); // Stop scanning once QR code is detected
    }, {
      highlightScanRegion: true,
      highlightCodeOutline: true,
    });

    scanner.start();

    return () => {
      scanner.stop(); // Cleanup: stop scanning when component unmounts
    };
  }, [onScan]);

  return (
    <div className="relative w-full h-full flex justify-center items-center">
      <video ref={videoRef} className="object-none" />
    </div>
  );
};

export default QRScanner;
