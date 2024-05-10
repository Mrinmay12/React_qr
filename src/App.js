import logo from './logo.svg';
import './App.css';
import Qrcode from './Qrcode';
import QrReader from './QrRead';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <Qrcode/> */}
        <QrReader/>
      </header>
    </div>
  );
}

export default App;
