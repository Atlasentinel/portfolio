import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./index.css";
import App from "./App";
import Error from "./Pages/Error/errorPage";
import reportWebVitals from "./reportWebVitals";
import { LangProvider } from "./contexts/LangContext";

// ── Pages projets (réorganisées dans Pages/Projects/) ─────────────────────────
import ProjectPageRach         from "./Pages/Projects/projectPageRach";
import ProjectPageStreamBattle from "./Pages/Projects/projectPageStreamBattle";
import ProjectNyceV            from "./Pages/Projects/projectNyceV";
import ProjectCoiffeur         from "./Pages/Projects/projectCoiffeur";
import ProjectCreche           from "./Pages/Projects/projectCreche";
import ProjectBastion          from "./Pages/Projects/projectBastion";
import ProjectPixel            from "./Pages/Projects/projectPixel";
import ProjectRoger            from "./Pages/Projects/projectRoger";
import ProjectStattrak         from "./Pages/Projects/projectStattrak";
import ProjectJustYapping      from "./Pages/Projects/projectJustYapping";
import ProjectEkea             from "./Pages/Projects/projectEkea";
import ProjectAnansi           from "./Pages/Projects/ProjectAnansi";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  // LangProvider au niveau racine → tous les composants ont accès aux traductions
  <LangProvider>
    <BrowserRouter>
      <Routes>
        <Route path="/"              element={<App />} />
        <Route path="/rach"          element={<ProjectPageRach />} />
        <Route path="/stream-battle" element={<ProjectPageStreamBattle />} />
        <Route path="/nycev"         element={<ProjectNyceV />} />
        <Route path="/coiffeur"      element={<ProjectCoiffeur />} />
        <Route path="/creche"        element={<ProjectCreche />} />
        <Route path="/bastion"       element={<ProjectBastion />} />
        <Route path="/pixelwar"      element={<ProjectPixel />} />
        <Route path="/roger"         element={<ProjectRoger />} />
        <Route path="/stattrak"      element={<ProjectStattrak />} />
        <Route path="/justyapping"   element={<ProjectJustYapping />} />
        <Route path="/ekea"          element={<ProjectEkea />} />
        <Route path="/anansi"        element={<ProjectAnansi />} />
        <Route path="*"              element={<Error />} />
      </Routes>
    </BrowserRouter>
  </LangProvider>
);

reportWebVitals();
