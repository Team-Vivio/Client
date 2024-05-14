
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
import { Routes, Route } from "react-router-dom";
import Tone from "./views/page/ToneAnalyze";
import ToneAnalyzeModel from "./views/page/ToneAnalyzeModel";
import ToneAnalyzeViewModel from "./views/page/ToneAnalyzeViewModel";
import ClothesFinder from "./views/page/ClothesFinder.js";
import ClothesFinderModel from "./views/page/ClothesFinderModel.js";
import ClothesFinderViewModel from "./views/page/ClothesFinderViewModel.js";
import "./App.css";

function App() {
    const model_1 = new Function1_Model();
    const viewModel_1 = new Function1_ViewModel(model_1);
    const model = new ToneAnalyzeModel();
    const viewModel = new ToneAnalyzeViewModel(model);
    const model_4 = new Function4_Model();
    const viewModel_4 = new Function4_ViewModel(model_4);
    const model_3 = new ClothesFinderModel();
    const viewModel = new ClothesFinderViewModel(model_3);
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
                <Route exact path="/Login" element={<Login />} />
				<Route exact path="/Signup" element={<Signup />} />
				<Route exact path="Mypage" element={<Mypage />} />
                <Route
                    exact
                    path="/FashionRecommend"
                    element={<Function1 viewModel={viewModel_1} />}
                />
                <Route
                    path="/PersonalColor"
                    element={<Tone viewModel={viewModel} />}
                />
                <Route
                    path="/ClothesFinder"
                    element={<ClothesFinder viewModel={viewModel} />}
                ></Route>
            </Routes>
        </div>
    );
    
    

}

export default App;
