import React from "react";
import {
  Box,
  Typography,
  Link,
  IconButton,
} from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import YouTubeIcon from "@mui/icons-material/YouTube";
import TelegramIcon from "@mui/icons-material/Telegram";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import logo1 from "../assets/images/logo1.png";

const Footer = () => {
  const language = localStorage.getItem("language") || "uz";

  const TEXT = {
    uz: {
      university: "Farg‘ona Davlat Texnika Universiteti",
      desc: "FDTU – innovatsion, raqamli va texnologik taraqqiyotga tayanch bo‘lgan yetakchi oliy ta’lim muassasasi.",
      quickLinks: "Tezkor havolalar",
      home: "Bosh sahifa",
      staff: "Hodimlar",
      programs: "Dasturlar",
      contact: "Bog‘lanish",
      contactTitle: "Aloqa",
      address: "Farg‘ona shahri, F. Xo‘jayev ko‘chasi, 86-uy",
      email: "info@fstu.uz",
      phone: "+998 73 244 56 78",
      copyright: "Barcha huquqlar himoyalangan.",
    },
    ru: {
      university: "Ферганский Государственный Технический Университет",
      desc: "ФГТУ – ведущий ВУЗ, опирающийся на инновации, цифровые технологии и технологический прогресс.",
      quickLinks: "Быстрые ссылки",
      home: "Главная",
      staff: "Сотрудники",
      programs: "Программы",
      contact: "Контакты",
      contactTitle: "Контактная информация",
      address: "г. Фергана, ул. Ф. Ходжаева, 86",
      email: "info@fstu.uz",
      phone: "+998 73 244 56 78",
      copyright: "Все права защищены.",
    },
    en: {
      university: "Fergana State Technical University",
      desc: "FSTU – a leading higher education institution based on innovation, digitalization, and technological progress.",
      quickLinks: "Quick Links",
      home: "Home",
      staff: "Staff",
      programs: "Programs",
      contact: "Contact",
      contactTitle: "Contact Info",
      address: "86 F. Khojayev Street, Fergana City",
      email: "info@fstu.uz",
      phone: "+998 73 244 56 78",
      copyright: "All rights reserved.",
    }
  };

  const t = TEXT[language];

  return (
    <Box
      sx={{
        backgroundColor: "#001f3f",
        color: "#fff",
        pt: 6,
        pb: 4,
        mt: 10,
      }}
    >
      <Box
        maxWidth="lg"
        mx="auto"
        px={2}
        sx={{
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "flex-start" },
          gap: 4,
        }}
      >
        {/* Logo and Description */}
        <Box flex={1} display="flex" flexDirection="column" alignItems="flex-start">
          <Box display="flex" alignItems="center" mb={1} sx={{ backgroundColor: '#fff', padding: '10px' }}>
            <img src={logo1} alt="FSTU Logo" style={{ height: 50, marginRight: 10 }} />
            <Typography fontWeight="bold" color="black">
              {t.university}
            </Typography>
          </Box>
          <Typography variant="body2">{t.desc}</Typography>
        </Box>

        {/* Quick Links */}
        <Box flex={1}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t.quickLinks}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
            <Link href="/" color="inherit" underline="hover">{t.home}</Link>
            <Link href="/Staff" color="inherit" underline="hover">{t.staff}</Link>
            <Link href="/programs" color="inherit" underline="hover">{t.programs}</Link>
            <Link href="/" color="inherit" underline="hover">{t.contact}</Link>
          </Box>
        </Box>

        {/* Contact Info */}
        <Box flex={1}>
          <Typography variant="h6" fontWeight="bold" gutterBottom>
            {t.contactTitle}
          </Typography>

          <Box display="flex" alignItems="start" mb={1}>
            <LocationOnIcon fontSize="small" sx={{ mr: 1, mt: "3px" }} />
            <Typography variant="body2">{t.address}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <EmailIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{t.email}</Typography>
          </Box>
          <Box display="flex" alignItems="center" mb={1}>
            <PhoneIcon fontSize="small" sx={{ mr: 1 }} />
            <Typography variant="body2">{t.phone}</Typography>
          </Box>

          <Box mt={2} display="flex" gap={1}>
            <IconButton href="https://facebook.com" target="_blank" sx={{ color: "#fff" }}>
              <FacebookIcon />
            </IconButton>
            <IconButton href="https://t.me/fstu_uz" target="_blank" sx={{ color: "#fff" }}>
              <TelegramIcon />
            </IconButton>
            <IconButton href="https://youtube.com" target="_blank" sx={{ color: "#fff" }}>
              <YouTubeIcon />
            </IconButton>
          </Box>
        </Box>
      </Box>

      {/* Footer bottom */}
      <Box mt={4} textAlign="center" fontSize="14px">
        © {new Date().getFullYear()} {t.university}. {t.copyright}
      </Box>
    </Box>
  );
};

export default Footer;
