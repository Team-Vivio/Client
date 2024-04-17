import './App.css';
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Main1 from "./views/page/Slider";


function App() {
  return (
      <Routes>
        <Route exact path="/" element={<Main1 />}/>
      </Routes>
  );
}

export default App;
