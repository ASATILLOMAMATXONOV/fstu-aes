import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import img1 from "../assets/images/department.jpg";
import img2 from "../assets/images/research.jpg";
import img3 from "../assets/images/teaching.jpg";
import img4 from "../assets/images/business.jpg";
import "../assets/style/HomePage.css";
import {
  MENU_ENDPOINTS,
  getCurrentLanguage,

} from "../config";



const HomePage = () => {
  const [menus, setMenus] = useState({
    department: [],
    research: [],
    teaching: [],
    academic: [],
  });

  const [language, setLanguage] = useState("uz");

  useEffect(() => {
    const fetchMenus = async () => {
      const [dep, res, tea, aca] = await Promise.all([
        axios.get(MENU_ENDPOINTS.department),
        axios.get(MENU_ENDPOINTS.research),
        axios.get(MENU_ENDPOINTS.teaching),
        axios.get(MENU_ENDPOINTS.academic),
      ]);
      setMenus({
        department: dep.data,
        research: res.data,
        teaching: tea.data,
        academic: aca.data,
      });
    };
  
    setLanguage(getCurrentLanguage());
    fetchMenus();
  }, []);
  
  
  const cards = [
    {
      key: "department",
      title: {
        uz: "BO‘LIM",
        ru: "ОТДЕЛ",
        en: "THE DEPARTMENT"
      },
      image: img1,
      color: "#06b6d4",
    },
    {
      key: "research",
      title: {
        uz: "ILMIY FAOLIYAT",
        ru: "ИССЛЕДОВАНИЯ",
        en: "RESEARCH"
      },
      image: img2,
      color: "#ef4444",
    },
    {
      key: "teaching",
      title: {
        uz: "TA’LIM",
        ru: "ОБУЧЕНИЕ",
        en: "TEACHING"
      },
      image: img3,
      color: "#f97316",
    },
    {
      key: "academic",
      title: {
        uz: "AKADEMIK INFRASTRUKTURA",
        ru: "АКАДЕМИЧЕСКАЯ ИНФРАСТРУКТУРА",
        en: "ACADEMIC INFRASTRUCTURE"
      },
      image: img4,
      color: "#3b82f6",
    },
  ];
  

  const getTitle = (link) => {
    if (language === "en") return link.title_en;
    if (language === "ru") return link.title_ru;
    return link.title_uz;
  };
  
  const handleMenuClick = (menuTitle) => {
    const upperTitle = menuTitle.trim().toUpperCase();
  
    if (upperTitle === "STAFF") {
      navigate("/staff");
    } else if (upperTitle === "PROGRAMS") {
      navigate("/programs");
    } else if (upperTitle === "COURSES") {
      navigate("/fanlar");
    } else {
      navigate(`/pages/${encodeURIComponent(menuTitle)}`);
    }
  };
  
  
  
  const navigate = useNavigate();


const getHomeTitle = () => {
  if (language === "ru") return "Главная страница";
  if (language === "en") return "Home Page";
  return "Bosh sahifa";
};

  return (
    <div className="homepage-container">
     <h3 className="homepage-title" sx={{
            fontWeight: "700",
            fontSize: { md: "1.5rem" },
            mb: 3,
            background: "linear-gradient(to right, #1976d2, #1e40af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent"
          }}>{getHomeTitle()}</h3>


      <div className="card-grid">
        {cards.map((item, index) => (
          <div
            key={index}
            className="card"
            style={{ backgroundImage: `url(${item.image})` }}
          >
            <div className="card-header" style={{ backgroundColor: item.color }}>
            <span>{item.title[language]}</span>
            </div>
            <div className="card-overlay">
            <ul className="card-menu">
            {(menus[item.key] || []).map((link, i) => (
              <li key={i}>
                <span
                  className="clickable-link"
                  onClick={() => handleMenuClick(link.title_en)}
                >
                  {getTitle(link)}
                </span>
              </li>
            ))}
          </ul>




            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
