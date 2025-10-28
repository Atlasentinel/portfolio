import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import App from './App';
import Error from './Pages/Error/errorPage';
import reportWebVitals from './reportWebVitals';
import ProjectPageRach from './Pages/Home/projectPageRach';
import ProjectPageStreamBattle from './Pages/Home/projectPageStreamBattle';
import ProjectNyceV from "./Pages/Home/projectNyceV";
import ProjectCoiffeur from './Pages/Home/projectCoiffeur';
import ProjectCreche from './Pages/Home/projectCreche';
import ProjectBastion from './Pages/Home/projectBastion';
import ProjectPixel from './Pages/Home/projectPixel';
import Home from './Pages/Home/homePage';

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/rach" element={<ProjectPageRach />} />
      <Route path="/stream-battle" element={<ProjectPageStreamBattle />} />
      <Route path="/nycev" element={<ProjectNyceV />} />
      <Route path="/coiffeur" element={<ProjectCoiffeur />} />
      <Route path="/creche" element={<ProjectCreche />} />
      <Route path="/bastion" element={<ProjectBastion />} />
      <Route path="/pixelwar" element={<ProjectPixel />} />
      <Route path="*" element={<Error />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
