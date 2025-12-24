import React from "react";
import { Container, Typography, Box, Paper } from "@mui/material";
import { Link } from "react-router-dom";
import SchoolIcon from '@mui/icons-material/School';
import MenuBookIcon from '@mui/icons-material/MenuBook'; // Fanlar uchun
import HandshakeIcon from '@mui/icons-material/Handshake';

const Researchgrid = () => {
  const language = localStorage.getItem("language") || "uz";

  const localizedText = {
    uz: {
<<<<<<< HEAD
      header: 'Ilg\'or muhandislik maktabi "INDUSTRIAL ENGINEERING"',
=======
      header: 'ILMIY MUHANDISLIK MAKTABI "INDUSTRIAL ENGINEERING"',
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
      cards: [
        {
          title: "O‘qituvchilar",
          description: "Tadqiqot maqolalari, loyihalar va grantlarda ishtirok etuvchi professor-o‘qituvchilar.",
          bgcolor: "#E0F7FA",
          icon: <SchoolIcon sx={{ fontSize: 40, color: "#0288D1" }} />,
          path: "/staff",
        },
        {
          title: "Fanlar",
          description: "Bakalavr va magistr dasturlariga oid asosiy va ixtisoslashtirilgan fanlar.",
          bgcolor: "#FFF3E0",
          icon: <MenuBookIcon sx={{ fontSize: 40, color: "#F57C00" }} />,
          path: "/fanlar",
        },
        {
<<<<<<< HEAD
          title: "Ro'yxatdan o'tish",
          description: "Oliy muandislik maktabiga ro'yhatdan o'tish.",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "https://aes-admission.fstu.uz",
=======
          title: "Hamkorlar",
          description: "Xalqaro va mahalliy hamkor tashkilotlar, institutlar va universitetlar.",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "/",
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
        },
      ],
    },
    ru: {
      header: 'ШКОЛА ПРОДВИНУТОЙ ИНЖЕНЕРИИ "ИНДУСТРИАЛЬНАЯ ИНЖЕНЕРИЯ"',
      cards: [
        {
          title: "Преподаватели",
          description: "Преподаватели, участвующие в исследованиях, проектах и грантах.",
          bgcolor: "#E0F7FA",
          icon: <SchoolIcon sx={{ fontSize: 40, color: "#0288D1" }} />,
          path: "/staff",
        },
        {
          title: "Предметы",
          description: "Основные и специальные предметы для бакалавриата и магистратуры.",
          bgcolor: "#FFF3E0",
          icon: <MenuBookIcon sx={{ fontSize: 40, color: "#F57C00" }} />,
          path: "/fanlar",
        },
        {
<<<<<<< HEAD
          title: "Зарегистрироваться",
          description: "Поступить в высшую инженерную школу",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "https://aes-admission.fstu.uz",
=======
          title: "Партнеры",
          description: "Местные и международные партнерские учреждения и университеты.",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "/",
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
        },
      ],
    },
    en: {
      header: 'ADVANCED ENGINEERING SCHOOL "INDUSTRIAL ENGINEERING"',
      cards: [
        {
          title: "Teachers",
          description: "Faculty members engaged in research articles, projects, and grant programs.",
          bgcolor: "#E0F7FA",
          icon: <SchoolIcon sx={{ fontSize: 40, color: "#0288D1" }} />,
          path: "/staff",
        },
        {
          title: "Subjects",
          description: "Engineering-related core and elective subjects for Bachelor’s and Master’s programs.",
          bgcolor: "#FFF3E0",
          icon: <MenuBookIcon sx={{ fontSize: 40, color: "#F57C00" }} />,
          path: "/fanlar",
        },
        {
<<<<<<< HEAD
          title: "Sign up",
          description: "Enroll in a higher engineering school.",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "https://aes-admission.fstu.uz/",
=======
          title: "Partners",
          description: "International and local academic partners, institutions, and universities.",
          bgcolor: "#E8F5E9",
          icon: <HandshakeIcon sx={{ fontSize: 40, color: "#388E3C" }} />,
          path: "/",
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
        },
      ],
    },
  };

  const { header, cards } = localizedText[language];

  return (
    <Container
      maxWidth={false}
      sx={{ width: "100%", maxWidth: "1200px", mt: 5, mb: 10, px: 2 }}
    >
      <Typography
        
        align="left"
        gutterBottom
        sx={{
          fontWeight: "700",
          fontSize: {  md: "1.5rem" },
          mb: 3,
          background: "linear-gradient(to right, #1976d2, #1e40af)",
          WebkitBackgroundClip: "text",
          WebkitTextFillColor: "transparent"
        }}
      >
        {header}
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "space-between",
          gap: 3,
          mt: 4,
        }}
      >
        {cards.map((card, index) => (
          <Link
            to={card.path}
            key={index}
            style={{ textDecoration: "none", flex: "1 1 calc(33.33% - 20px)", minWidth: "280px", maxWidth: "100%" }}
          >
            <Paper
              elevation={4}
              sx={{
                height: "100%",
                padding: 3,
                backgroundColor: card.bgcolor,
                borderRadius: 2,
                transition: "all 0.3s ease",
                cursor: "pointer",
                "&:hover": {
                  transform: "translateY(-8px)",
                  boxShadow: "0 6px 20px rgba(0,0,0,0.2)",
                },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 1 }}>
                {card.icon}
                <Typography variant="h6" component="div" color="text.primary">
                  {card.title}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.primary">
                {card.description}
              </Typography>
            </Paper>
          </Link>
        ))}
      </Box>
    </Container>
  );
};

export default Researchgrid;
