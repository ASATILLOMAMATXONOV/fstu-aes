import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Container,
  Typography,
  CircularProgress,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import parse from "html-react-parser";
import { useNavigate } from "react-router-dom";

import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavbar";
<<<<<<< HEAD

import { BASE_API_URL, getCurrentLanguage } from "../config"; 
=======
import Footer from "../components/Footer";

import { BASE_API_URL, getCurrentLanguage } from "../config"; // ✅ global import
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
import "../assets/style/PageDetail.css";
import "../assets/style/programs.css";

// Matnlar
const TEXT = {
<<<<<<< HEAD
=======
  back: {
    uz: "Orqaga",
    ru: "Назад",
    en: "Back",
  },
  home: {
    uz: "Bosh sahifa",
    ru: "Главная страница",
    en: "Home",
  },
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
  notFound: {
    uz: "Ma'lumot topilmadi",
    ru: "Информация не найдена",
    en: "Data not found",
  },
  noButtons: {
    uz: "Bu sahifaga biriktirilgan tugmalar topilmadi.",
    ru: "Кнопки для этой страницы не найдены.",
    en: "No buttons attached to this page.",
  },
};

<<<<<<< HEAD
// 🔹 Menu nomlari tilga qarab
const menuNames = {
  uz: "DASTURLAR",
  ru: "ПРОГРАММЫ",
  en: "PROGRAMS",
};

=======
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
const Programs = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [buttons, setButtons] = useState([]);
  const [keyInfo, setKeyInfo] = useState([]);
  const [language, setLanguage] = useState(getCurrentLanguage());
  const navigate = useNavigate();

<<<<<<< HEAD
  // 🔹 Tilni yangilash
=======
  // Tilni yangilash
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
  useEffect(() => {
    setLanguage(getCurrentLanguage());
  }, []);

<<<<<<< HEAD
  // 🔹 Sahifa ma'lumoti
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_API_URL}/pages/menu/${menuNames[language]}`)
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]);
        } else {
          setData(null);
=======
  // Sahifa ma'lumoti
  useEffect(() => {
    setLoading(true);
    axios
      .get(`${BASE_API_URL}/pages/menu/PROGRAMS`) // ✅ global API
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setData(res.data[0]);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
        }
      })
      .catch((err) => console.error("❌ Sahifa olishda xato:", err))
      .finally(() => setLoading(false));
  }, [language]);

<<<<<<< HEAD
  // 🔹 Tugmalar
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/buttons/by-url/PROGRAMS?lang=${language}`)
=======
  // Tugmalar
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/buttons/by-url/PROGRAMS?lang=${language}`) // ✅ global API
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
      .then((btnRes) => setButtons(btnRes.data))
      .catch((err) => console.error("❌ Tugmalar xatosi:", err));
  }, [language]);

<<<<<<< HEAD
  // 🔹 Asosiy ma'lumotlar
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/keyinfo`)
=======
  // Asosiy ma'lumotlar
  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/keyinfo`) // ✅ global API
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
      .then((res) => setKeyInfo(res.data))
      .catch((err) => console.error("❌ Keyinfo olishda xato:", err));
  }, [language]);

  const getTitle = () => data?.[`title_${language}`] || data?.title_uz || "";
  const getContent = () =>
    data?.[`content_${language}`] || data?.content_uz || "";

  const transformContent = (html) =>
    html.replace(
      /<img([^>]+)>/g,
      `<img style="width: 100%; height: auto; border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.2); object-fit: contain; display: block;" $1 />`
    );

  return (
    <>
      <Navbar />
      <TopNavbar />
      <Container maxWidth="lg" sx={{ mt: 15 }}>
        {loading ? (
          <Box display="flex" justifyContent="center" mt={10}>
            <CircularProgress />
          </Box>
        ) : data ? (
          <Box>
<<<<<<< HEAD
            {/* Title */}
=======
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
            <Typography
              variant="h4"
              align="center"
              fontWeight="bold"
              mb={4}
              sx={{ fontSize: { xs: "20px", sm: "26px", md: "32px" } }}
            >
              {getTitle()}
            </Typography>

<<<<<<< HEAD
            {/* Content + Sidebar */}
            <Grid container spacing={2}>
              <Grid item xs={12} md={8}>
=======
            <Grid container spacing={2}>
              <Grid item xs={12} md={8} sx={{ width: "70%" }}>
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
                <Paper sx={{ p: 2 }}>
                  <div className="ql-editor">
                    {parse(transformContent(getContent()))}
                  </div>
                </Paper>
              </Grid>

<<<<<<< HEAD
              <Grid item xs={12} md={4}>
=======
              <Grid item xs={12} md={4} sx={{ width: "25%" }}>
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
                <Paper sx={{ p: 3, backgroundColor: "#f5faff" }} elevation={3}>
                  <List dense>
                    {keyInfo.length > 0 ? (
                      keyInfo.map((info) => (
                        <ListItem key={info.id} sx={{ wordBreak: "break-word" }}>
                          <ListItemText
<<<<<<< HEAD
                            primary={parse(
                              info[`content_${language}`] || info.content_uz
                            )}
=======
                            primary={parse(info[`content_${language}`] || info.content_uz)}
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
                            primaryTypographyProps={{
                              fontSize: { xs: 12, sm: 13, md: 14 },
                            }}
                          />
                        </ListItem>
                      ))
                    ) : (
                      <ListItem>
                        <ListItemText primary={TEXT.notFound[language]} />
                      </ListItem>
                    )}
                  </List>
                </Paper>
              </Grid>
            </Grid>

<<<<<<< HEAD
            {/* Buttons */}
=======
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
            <Grid
              container
              spacing={2}
              sx={{
                mt: 4,
                p: 3,
                backgroundColor: "#f5faff",
                borderRadius: "10px",
              }}
            >
              {buttons.length > 0 ? (
                buttons.map((btn) => (
                  <Grid item xs={12} sm={6} md={4} key={btn.id}>
                    <a
                      href={btn.link_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hover-button"
                    >
                      {btn[`label_${language}`] || btn.label_uz}
                      <span className="arrow">➔</span>
                    </a>
                  </Grid>
                ))
              ) : (
                <Grid item xs={12}>
                  <Typography
                    variant="body1"
                    align="center"
                    color="text.secondary"
                    sx={{ fontSize: { xs: "14px", sm: "16px" } }}
                  >
                    {TEXT.noButtons[language]}
                  </Typography>
                </Grid>
              )}
            </Grid>
          </Box>
        ) : (
          <Typography color="error">{TEXT.notFound[language]}</Typography>
        )}
      </Container>
<<<<<<< HEAD
=======

      <Footer />
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    </>
  );
};

export default Programs;
