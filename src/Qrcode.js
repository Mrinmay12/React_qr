
import { useState } from "react";
import {QrReader} from "react-qr-reader";
import { useEffect } from "react";

const Qrcode = () => {
  const [code, setCode] = useState(null);
  const [showDialog, setDiaglog] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [precScan, setPrecScan] = useState("");
  const [selected, setSelected] = useState("environment");
  const [errorMessage, setErrorMessage] = useState(null);

  
  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
    if (scanData && scanData !== "" && !showDialog && !processing) {
      console.log(`loaded >>>`, scanData);
     
    }
  };
  const handleError = (err) => {
    console.error(err);
  };
  return (
    <div className="App">
     
      <h2>
        Last Scan:{precScan}
        {selected}
      </h2>
   
      {!showDialog && !processing && (
        <QrReader
          facingMode={selected}
          delay={500}
          onError={handleError}
          onScan={handleScan}
          // chooseDeviceId={()=>selected}
          style={{ width: "200px", heigth: "100px" }}
        />
      )}
    </div>
  );
};

export default Qrcode;
