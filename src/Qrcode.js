import React, { useState } from 'react'
import QRCode from 'qrcode.react';
import {QrReader} from 'react-qr-reader';
export default function Qrcode() {


        const handleScan = data => {
          if (data) {
            // Redirect to the scanned URL
            window.location.href = "https://coderapp-eta.vercel.app/";
          }
        }
    
        const handleError = err => {
          console.error(err);
        }

        const [value,setValue]=useState("1")

        const handleOpen=(e)=>{
            setValue(e)
        }
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
      delay={300}
      onError={handleError}
      onScan={handleScan}
      style={{ width: '100%' }}
      key="environment"
      constraints={{
      audio: false,
      video: { facingMode: "environment" }} }
    />

</>
        )}




    </div>
  )
}
