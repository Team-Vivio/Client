import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Main from "./views/page/main";
import Header from "./views/component/header";


function App() {
  return (
    <div>
      <Header />
      <Routes>
        <Route exact path="/" element={<Main />}/>
      </Routes>
      </div>
  );
}

export default App;
