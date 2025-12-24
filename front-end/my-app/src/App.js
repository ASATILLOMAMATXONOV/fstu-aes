import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Slider from "./components/Slider";

import HomePage from "./pages/HomePage";
import PageDetail from "./pages/PageDetail";
import Staff from "./pages/Staff";
import NewPageDetail from "./pages/NewPageDetail";
import Programs from "./pages/Programs";
import Fanlar from "./pages/Fanlar";
import FanDetail from "./pages/FanDetail";
import Researchgrid from "./pages/Researchgrid";
import Department from "./pages/Department";
import NewsSection from "./pages/NewsSection";
import TopNavbar from "./components/TopNavbar";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* 🔝 Navbar hamma sahifada */}
        <Navbar />

        {/* 📄 Sahifa kontenti */}
        <main style={{ flex: 1 }}>
          <Routes>
            <Route
              path="/"
              element={
                <>
                  <Slider />
                  <HomePage />
                  <Researchgrid />
                  <Department />
                  <NewsSection />
                </>
              }
            />

            <Route path="/staff" element={<Staff />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/fanlar" element={<Fanlar />} />
            <Route path="/fanlar/:id" element={<FanDetail />} />
            <Route path="/newpages/:id" element={<NewPageDetail />} />
            <Route path="/pages/:id" element={<PageDetail />} />
            <Route path="/top-navbar" element={<TopNavbar />} />
          </Routes>
        </main>

        {/* ⬇ Footer doim ENG PASTDA */}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
