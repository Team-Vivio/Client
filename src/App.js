import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CoordiFinder from "./views/page/CoordiFinderView";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/CoordiFinder" element={<CoordiFinder />}></Route>
            </Routes>
        </BrowserRouter>
    );
}

export default App;
