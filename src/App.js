import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoordiFinder from "./views/page/CoordiFinderView";
import CoordiFinderModel from "./views/page/CoordiFinderModel";
import CoordiFinderViewModel from "./views/page/CoordiFinderViewModel";

function App() {
    const model = new CoordiFinderModel();
    const viewModel = new CoordiFinderViewModel(model);
    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/CoordiFinder"
                    element={<CoordiFinder viewModel={viewModel} />}
                ></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
