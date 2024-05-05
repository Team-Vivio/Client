import { Routes, Route } from 'react-router-dom'
// import Tone from './views/page/ToneAnalyze'
import NewTone from './views/page/newToneAnalyze'
import ToneAnalyzeModel from './views/page/ToneAnalyzeModel';
import ToneAnalyzeViewModel from './views/page/ToneAnalyzeViewModel';
import './App.css';

function App() {
  const model = new ToneAnalyzeModel();
  const viewModel = new ToneAnalyzeViewModel(model);
  return (
    <div>
      <Routes>
        {/* <Route
          path="/Tone"
          element={<Tone />}
        /> */}
        <Route
          path=''
          element={<NewTone viewModel={viewModel}/>}
        />
      </Routes>
    </div>
  );
}

export default App;
