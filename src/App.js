import React from "react";
import { Route, Routes } from "react-router-dom";

import Login from "./views/page/LoginPage/LoginPage";
import Signup from "./views/page/SignUpPage/SignUpPage";
import Mypage from "./views/page/MyPage/MyPage";

function App() {
	return (
		<div>
			<Routes>
				<Route exact path="/Login" element={<Login />} />
				<Route exact path="/Signup" element={<Signup />} />
				<Route exact path="Mypage" element={<Mypage />} />
			</Routes>
		</div>
	);
}

export default App;
