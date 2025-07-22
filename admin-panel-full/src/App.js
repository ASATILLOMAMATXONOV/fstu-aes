import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "./layout/AdminLayout";
import Dashboard from "./pages/Dashboard";
import CarouselPage from "./pages/CarouselPage";
import Menus from "./pages/Menus";
import Submenu from "./pages/Submenu";
import NewsEvent from "./pages/NewsEvent";
import Page from "./pages/Pages";
import Statistics from "./pages/Statistics";
import EditPanel from "./pages/EditPanel";
import ImageInsertModal from "./components/ImageInsertModal";  
import Newbut from "./pages/Newbut";
import Side from "./pages/Side";
import Fanlar from "./pages/Fanlar";
import Department from "./pages/Department";
import Topmenu from "./pages/Topmenu";
import Login from "./Login";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    setLoggedIn(!!token);
  }, []);

  if (!loggedIn) {
    return <Login onLogin={() => setLoggedIn(true)} />;
  }

  return (
    <Routes>
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Dashboard />} />
        <Route path="carousel" element={<CarouselPage />} />
        <Route path="menus" element={<Menus />} />
        <Route path="submenu" element={<Submenu />} />
        <Route path="NewsEvent" element={<NewsEvent />} />
        <Route path="Page" element={<Page />} />
        <Route path="Statistics" element={<Statistics />} />
        <Route path="menus/edit/:category/:id" element={<EditPanel />} />
        <Route path="image-insert" element={<ImageInsertModal />} />
        <Route path="Newbut" element={<Newbut />} />
        <Route path="Side" element={<Side />} />
        <Route path="Fanlar" element={<Fanlar />} />
        <Route path="Department" element={<Department />} />
        <Route path="Topmenu" element={<Topmenu />} />
      </Route>

      {/* Logoutdan keyin yo‘naltirish */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default App;
