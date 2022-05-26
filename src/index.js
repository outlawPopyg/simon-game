import React from 'react';
import ReactDOM from 'react-dom';
import Menu from "./components/menu/Menu";
import { BrowserRouter as Router,Route, Routes } from "react-router-dom";
import App from "./components/App";
import GameOver from "./components/gameOver/gameOver";
import Rules from "./components/rules/Rules";

ReactDOM.render(
  <React.StrictMode>
    <Router>
        <Routes>
            <Route path={"/"} element={<Menu />} />
            <Route path={"/app"} element={<App />} />
            <Route path={"/go"} element={<GameOver />} />
            <Route path={"/info"} element={<Rules />} />
        </Routes>
    </Router>
  </React.StrictMode>,
  document.getElementById('root')
);

