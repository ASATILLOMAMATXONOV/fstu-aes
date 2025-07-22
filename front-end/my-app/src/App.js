import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Slider from "./components/Slider";
import HomePage from "./pages/HomePage";
import PageDetail from "./pages/PageDetail";
import Staff from "./pages/Staff";
import NewPageDetail from "./pages/NewPageDetail";
import Programs from "./pages/Programs";
import Footer from "./components/Footer"; 
import TopNavbar from "./components/TopNavbar"; 
import Fanlar from "./pages/Fanlar";
import FanDetail from "./pages/FanDetail";
import Researchgrid from './pages/Researchgrid';
import Department from './pages/Department';
import NewsSection from './pages/NewsSection';


function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* 📄 Dinamik sahifa (eng yuqorida tursin) */}
        <Route path="/pages/:id" element={<PageDetail />} />

        {/* 🏠 Asosiy sahifa */}
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Slider />
              <HomePage />
              <Researchgrid />
              <Department />
              <NewsSection />
              <Footer />
            </>
          }
        />

        <Route path="/staff" element={<Staff />} />
        <Route path="/newpages/:id" element={<NewPageDetail />} />
        <Route path="/programs" element={<Programs />} />
        <Route path="fanlar" element={<Fanlar />} />
        <Route path="/fanlar/:id" element={<FanDetail />} />
        <Route path="/top-navbar" element={<TopNavbar />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;
