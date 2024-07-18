'use client';

import React, { useState, useRef, useCallback } from 'react';
import Webcam from 'react-webcam';
import { createInvoice } from './server';

const ReceiptUploader: React.FC = () => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);
  const [response, setResponse] = useState<string | null>(null);
  const webcamRef = useRef<Webcam>(null);

  const capture = useCallback(() => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setImageSrc(imageSrc);
    }
  }, [webcamRef]);

  const handleUpload = async () => {
    if (!imageSrc) return;

    const formData = new FormData();
    formData.append('file', dataURLtoFile(imageSrc, 'receipt.jpg'));

    
    createInvoice(formData).then(res => setResponse(JSON.stringify(res))).catch(res => setResponse(JSON.stringify(res)));
  };

  const dataURLtoFile = (dataurl: string, filename: string): File => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)![1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
  };


  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Take a Photo of Receipt</h1>
      {imageSrc ? (
        <div className="flex flex-col items-center">
          <img src={imageSrc} alt="Receipt" className="mb-4 border rounded shadow-md" />
          <div className="flex space-x-2">
            <button 
              onClick={handleUpload} 
              className="bg-secondary text-white px-4 py-2 rounded shadow-md hover:bg-blue-700 transition"
            >
              Upload
            </button>
            <button 
              onClick={() => setImageSrc(null)} 
              className="bg-gray-500 text-white px-4 py-2 rounded shadow-md hover:bg-gray-700 transition"
            >
              Retake Photo
            </button>
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            videoConstraints={{facingMode: 'environment', width: 1920, height: 1080}}
            screenshotQuality={1}
            minScreenshotWidth={1920}
            minScreenshotHeight={1080}
            className="mb-4 border rounded shadow-md"
          />
          <button 
            onClick={capture} 
            className="bg-secondary text-white px-4 py-2 rounded shadow-md hover:bg-green-700 transition"
          >
            Capture Photo
          </button>
        </div>
      )}

      {response && (
        <div className="mt-8 bg-white p-4 rounded shadow-md w-full max-w-2xl">
          <h2 className="text-xl font-bold mb-4">Response</h2>
          <span className="bg-gray-100 flex flex-wrap p-4 rounded">{JSON.stringify(response, null, 2)}</span>
        </div>
      )}
    </div>
  );
};

export default ReceiptUploader;
