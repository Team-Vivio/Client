import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClothesFinder from "./views/page/ClothesFinder.js";
import ClothesFinderModel from "./views/page/ClothesFinderModel.js";
import ClothesFinderViewModel from "./views/page/ClothesFinderViewModel.js";

function App() {
    const model = new ClothesFinderModel();
    const viewModel = new ClothesFinderViewModel(model);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/ClothesFinder"
                    element={<ClothesFinder viewModel={viewModel} />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
