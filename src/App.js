import logo from './logo.svg';
import './App.css';
import Qrcode from './Qrcode';
import QrReader from './QrRead2';
import TextEdite from './TextEdite';
import Searchbar from './Searchbar/Searchbar';



function App() {
  return (
    <div className="App">
      <header className="App-header">
  
        {/* <Searchbar/> */}
   
        <Qrcode/>
        {/* <QrReader/> */}
      </header>
    </div>
  );
}

export default App;
