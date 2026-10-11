import { lazy, Suspense } from "react";
import { Navigate, Route, Routes, useParams } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ScrollManager from "./components/ScrollManager";
import Home from "./pages/Home";
import NotFound from "./pages/NotFound";
import projects from "./data/projects.json";

// Pages secondaires chargées à la demande (bundle initial plus léger)
const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
const ProjectPage = lazy(() => import("./pages/ProjectPage"));

// Anciennes URL (/pixelwar, /rach…) → nouvelles (/projets/pixelwar…)
function LegacyRedirect() {
  const { slug } = useParams();
  return projects.some((p) => p.slug === slug)
    ? <Navigate to={`/projets/${slug}`} replace />
    : <NotFound />;
}

export default function App() {
  return (
    <>
      <ScrollManager />
      <Header />
      <main id="main">
        <Suspense fallback={<div className="page-loading" />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projets" element={<ProjectsPage />} />
            <Route path="/projets/:slug" element={<ProjectPage />} />
            <Route path="/:slug" element={<LegacyRedirect />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
