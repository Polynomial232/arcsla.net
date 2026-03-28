import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";

const Home = lazy(() => import("./pages/Home"));
const Gallery = lazy(() => import("./pages/Gallery"));
const Talents = lazy(() => import("./pages/Talents"));
const TalentDetail = lazy(() => import("./pages/TalentDetail"));

function App() {
  return (
    <Router>
      <Suspense fallback={<div className="min-h-screen bg-black" />}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/talents" element={<Talents />} />
          <Route path="/talents/:id" element={<TalentDetail />} />
        </Routes>
      </Suspense>
      <SpeedInsights />
      <Analytics />
    </Router>
  );
}

export default App;
