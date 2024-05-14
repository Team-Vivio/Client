import React from "react";
import { Route, Routes } from "react-router-dom";

import Main from "./views/page/main";
import Function1 from "./views/page/bodyAnalyze";
import Function1_ViewModel from "./views/page/boduAnalyzeViewModel";
import Function1_Model from "./views/page/bodyAnalyzeModel";
import Function4 from "./views/page/CoordiFinderView";
import Function4_ViewModel from "./views/page/CoordiFinderViewModel";
import Function4_Model from "./views/page/CoordiFinderModel";
import Header from "./views/component/header";

function App() {
    const model_1 = new Function1_Model();
    const viewModel_1 = new Function1_ViewModel(model_1);

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
                <Route
                    exact
                    path="/FashionRecommend"
                    element={<Function1 viewModel={viewModel_1} />}
                />
            </Routes>
        </div>
    );
}

export default App;
