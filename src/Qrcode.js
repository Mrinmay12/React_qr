import React, { useState } from "react";
import QRCode from "qrcode.react";
import { QrReader } from "react-qr-reader";
import Apkfile from "./App.apk"
import Imagecard from "./imagecard.png"
export default function Qrcode() {
  const [selected, setSelected] = useState("environment");
  const handleScan = async (scanData) => {
    console.log(`loaded data data`, scanData);
  };

  const handleError = (err) => {
    console.error(err);
  };

  const [value, setValue] = useState("1");

  const handleOpen = (e) => {
    setValue(e);
  };

  const handleDownload = () => {
    const fileUrl =Apkfile;
    const anchor = document.createElement('a');
    anchor.href = fileUrl;
    anchor.download = 'mrinmay.apk';
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    // alert('Your download will start shortly. Please open the downloaded APK file to install the application.');
  };
  return (
    <div>
      <div style={{ display:"flex",flexDirection:"row" ,justifyContent:"space-between"}}>
            <p onClick={()=>handleOpen("1")} style={{cursor:"pointer" ,color:value==="1"?"red":"black"}}>
                your qr 
            </p>
            <p style={{ paddingLeft:"49px",cursor:"pointer",color:value==="2"?"red":"black" }} onClick={()=>handleOpen("2")}>
                scanned qr  
            </p>
        </div>
        {value==="1" ?(

<QRCode value="https://coderapp-eta.vercel.app/" />
        ):(
            <>
            <p>scanned</p>
<QrReader
      onError={handleError}
      onScan={handleScan}
      delay={500}
      // style={{ width: '100%' }}
      key="environment"
  constraints={{ facingMode: 'environment' }}
      style={{ width: "200px", heigth: "100px" }}
     
    />

</>
        )}
      <button onClick={handleDownload}>Download</button>
    </div>
  );
}
