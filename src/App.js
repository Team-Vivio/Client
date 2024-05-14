import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./views/page/main";
import Function4 from "./views/page/CoordiFinderView";
import Function4_ViewModel from "./views/page/CoordiFinderViewModel";
import Function4_Model from "./views/page/CoordiFinderModel";
import Header from "./views/component/header";

function App() {
    const model_4 = new Function4_Model();
    const viewModel_4 = new Function4_ViewModel(model_4);

    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route
                    exact
                    path="/CoordiFinder"
                    element={<Function4 viewModel={viewModel_4} />}
                />
            </Routes>
        </div>
    );
}

export default App;
