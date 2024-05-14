import React from "react";
import logo from "./logo.svg";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./views/page/LoginPage/LoginPage";
import Signup from "./views/page/SignUpPage/SignUpPage";
import Mypage from "./views/page/MyPage/MyPage";
import Main from "./views/page/main";
import Function1 from "./views/page/bodyAnalyze";
import Function1_ViewModel from "./views/page/boduAnalyzeViewModel";
import Function1_Model from "./views/page/bodyAnalyzeModel";
import Function4 from "./views/page/CoordiFinderView";
import Function4_ViewModel from "./views/page/CoordiFinderViewModel";
import Function4_Model from "./views/page/CoordiFinderModel";
import Header from "./views/component/header";
import Function2 from "./views/page/ToneAnalyze";
import Function2_Model from "./views/page/ToneAnalyzeModel";
import Function2_ViewModel from "./views/page/ToneAnalyzeViewModel";
import Function3 from "./views/page/ClothesFinder.js";
import Function3_Model from "./views/page/ClothesFinderModel.js";
import Function3_ViewModel from "./views/page/ClothesFinderViewModel.js";
import "./App.css";

function App() {
    const model_1 = new Function1_Model();
    const viewModel_1 = new Function1_ViewModel(model_1);
    const model_2 = new Function2_Model();
    const viewModel_2 = new Function2_ViewModel(model_2);
    const model_3 = new Function3_Model();
    const viewModel_3 = new Function3_ViewModel(model_3);
    const model_4 = new Function4_Model();
    const viewModel_4 = new Function4_ViewModel(model_4);

    return (
        <div>
            <Header />
            <Routes>
                <Route exact path="/" element={<Main />} />
                <Route exact path="/Login" element={<Login />} />
                <Route exact path="/Signup" element={<Signup />} />
                <Route exact path="Mypage" element={<Mypage />} />
                <Route
                    path="/FashionRecommend"
                    element={<Function1 viewModel={viewModel_1} />}
                />
                <Route
                    path="/PersonalColor"
                    element={<Function2 viewModel={viewModel_2} />}
                />
                <Route
                    path="/ClothesFinder"
                    element={<Function3 viewModel={viewModel_3} />}
                />
                <Route
                    path="/CoordiFinder"
                    element={<Function4 viewModel={viewModel_4} />}
                />
            </Routes>
        </div>
    );
}

export default App;
