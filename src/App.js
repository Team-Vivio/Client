import { Routes, Route } from 'react-router-dom'
import Tone from './views/page/ToneAnalyze'
import './App.css';

function App() {
  return (
    <div>
      <Routes>
        <Route path="/Tone" element={<Tone/>}/>
      </Routes>
    </div>
  );
}

export default App;
