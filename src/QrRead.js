import React, { useEffect, useState } from "react";
import { QrScanner } from "@yudiel/react-qr-scanner";

export default function QrRead() {
    const [allowedIds] = useState(["qr-111233433-444"]);
    const [status, setStatus] = useState("");
    const [qrValue, setQrValue] = useState("");
  
    // const validateQr = (value: string) => (): Promise<void> =>
    //   new Promise((res, rej) => {
    //     let qrStatus = "success";
    //     if (!allowedIds.find((v) => v === value)) {
    //       qrStatus = "error";
    //     }
  
    //     setTimeout(() => {
    //       if (qrStatus === "success") res();
    //       else rej();
    //       setQrValue("");
    //       setStatus("idle");
    //     }, 3000);
    //   });
  
    const handleScan = (value) => {
      setQrValue(value);
     
    };
  
    useEffect(() => {
      console.log("Qr value " + qrValue);
    }, [qrValue]);
  
    return (
     <>
     const [stop, setStop] = useState(false);

return (
  <Container component="main">
    <Box sx={{ margin: "auto", textAlign: "center", width: 400 }}>
      <Button
        sx={{ marginLeft: 1 }}
        variant="contained"
        onClick={() => setStop((val) => !val)}
      >
        {stop ? "Start" : "Stop"}
      </Button>

      <QrScanner
        containerStyle={{ marginTop: 5 }}
        stopDecoding={stop}
        onDecode={(value) => console.log(value)}
        onError={(error) => console.error(error.message)}
      />
    </Box>
     </>
    );
}
