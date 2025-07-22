import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Slide,
  Grow,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
import { BASE_API_URL, getCurrentLanguage } from "../config"; // ✅ Yangi global konfiguratsiya

const TEXT = {
  staff: {
    uz: "Fanlar ro‘yxati",
    ru: "Список предметов",
    en: "List of Subjects",
  },
  code: {
    uz: "Kod",
    ru: "Код",
    en: "Code",
  },
  name: {
    uz: "Fan nomi",
    ru: "Название предмета",
    en: "Subject Name",
  },
  language: {
    uz: "Til",
    ru: "Язык",
    en: "Language",
  },
  semester: {
    uz: "Semestr",
    ru: "Семестр",
    en: "Semester",
  },
  credits: {
    uz: "Kredit",
    ru: "Кредит",
    en: "Credits",
  },
  teachers: {
    uz: "O‘qituvchilar",
    ru: "Преподаватели",
    en: "Teachers",
  },
};

const Fanlar = () => {
  const [fanlar, setFanlar] = useState([]);
  const [language, setLanguage] = useState(getCurrentLanguage()); // ✅ Til sozlamasi
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFanlar = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/fanlar`); // ✅ API manzili
        setFanlar(res.data);
      } catch (err) {
        console.error("❌ Fanlar olishda xato:", err);
      }
    };

    setLanguage(getCurrentLanguage());
    fetchFanlar();
  }, []);

  return (
    <>
      <Navbar />
      <TopNavbar />

      <Box display="flex" flexDirection="column" minHeight="100vh" pt={10}>
        <Container maxWidth="lg" sx={{ flexGrow: 1 }}>
          <Box py={4}>
      

            <Slide in direction="up" timeout={700}>
              <TableContainer component={Paper} elevation={4} sx={{ borderRadius: 2 }}>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: "#f0f0f0" }}>
                      <TableCell><b>{TEXT.code[language]}</b></TableCell>
                      <TableCell><b>{TEXT.name[language]}</b></TableCell>
                      <TableCell><b>{TEXT.language[language]}</b></TableCell>
                      <TableCell><b>{TEXT.semester[language]}</b></TableCell>
                      <TableCell><b>{TEXT.credits[language]}</b></TableCell>
                      <TableCell><b>{TEXT.teachers[language]}</b></TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {fanlar.map((fan) => (
                      <TableRow
                        key={fan.id}
                        hover
                        onClick={() => navigate(`/fanlar/${fan.id}`)}
                        sx={{
                          cursor: "pointer",
                          transition: "all 0.3s",
                          "&:hover": { backgroundColor: "#e3f2fd" },
                        }}
                      >
                        <TableCell><strong>{fan.code}</strong></TableCell>
                        <TableCell>{fan[`nom_${language}`]}</TableCell>
                        <TableCell>{fan.language}</TableCell>
                        <TableCell>{fan.semester}</TableCell>
                        <TableCell>{fan.credits}</TableCell>
                        <TableCell>{fan.teachers}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </Slide>
          </Box>
        </Container>

        <Footer />
      </Box>
    </>
  );
};

export default Fanlar;
