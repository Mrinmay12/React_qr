import React, { useEffect, useRef, useState } from "react";

// Styles
// import "./QrStyles.css";

// Qr Scanner
import QrScanner from "qr-scanner";
import QrFrame from "./logo.svg";

const QrReader: React.FC = () => {
    // QR States
    const scanner = useRef(null);
    const videoEl = useRef(null);
    const qrBoxEl = useRef(null);
    const [qrOn, setQrOn] = useState(true);
  
    useEffect(() => {
      if (videoEl.current && !scanner.current) {
        scanner.current = new QrScanner(videoEl.current, onScanSuccess, {
          onDecodeError: onScanFail,
          preferredCamera: "environment",
          highlightScanRegion: true,
          highlightCodeOutline: true,
          overlay: qrBoxEl.current || undefined,
        });
  
        scanner.current
          .start()
          .then(() => setQrOn(true))
          .catch((err) => {
            console.error("Error starting scanner:", err);
            setQrOn(false);
          });
      }
  
      return () => {
        if (scanner.current) {
          scanner.current.stop();
        }
      };
    }, []);
  
    const onScanSuccess = (result: string) => {
      // Handle successful scan
      console.log("Scanned QR code:", result);
    };
  
    const onScanFail = (error: any) => {
      // Handle scan failure
      console.error("Scan failed:", error);
    };
  
    return (
      <div className="qr-reader">
        <video ref={videoEl} autoPlay={true} muted={true}></video>
        <div ref={qrBoxEl} className="qr-box">
          <img
            src={QrFrame}
            alt="Qr Frame"
            width={256}
            height={256}
            className="qr-frame"
          />
        </div>
      </div>
    );
  };

export default QrReader;
