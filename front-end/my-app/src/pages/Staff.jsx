import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Typography,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  Box,
  Container,
  Fade,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { BASE_API_URL, getCurrentLanguage } from "../config"; // ✅ CONFIG import

// TEXT va CATEGORIES - o‘zgartirilmagan
const TEXT = {
  staff: {
    uz: "Xodimlar",
    ru: "Сотрудники",
    en: "Staff",
  },
  headOfDepartment: {
    uz: "Kafedra mudiri",
    ru: "Заведующий кафедрой",
    en: "Head of Department",
  },
  fullName: {
    uz: "To‘liq ism",
    ru: "ФИО",
    en: "Full Name",
  },
  position: {
    uz: "Lavozimi",
    ru: "Должность",
    en: "Position",
  },
  noData: {
    uz: "Ma'lumot mavjud emas",
    ru: "Нет данных",
    en: "No data available",
  },
  categories: {
    professors: {
      uz: "Professor-o‘qituvchilar",
      ru: "Профессорско-преподавательский состав",
      en: "Professors",
    },
    research: {
      uz: "Tadqiqotchilar va PhD talabalar",
      ru: "Исследователи и аспиранты",
      en: "Research assistants and PhD students",
    },
    technical: {
      uz: "Texnik va ma'muriy xodimlar",
      ru: "Технический и административный персонал",
      en: "Technical and administrative staff",
    },
    visiting: {
      uz: "Tashrif buyurgan xodimlar",
      ru: "Приглашенные сотрудники",
      en: "Visiting staff",
    },
  },
};

const STAFF_CATEGORIES = [
  { key: "professors" },
  { key: "research" },
  { key: "technical" },
  { key: "visiting" },
];

const Staff = () => {
  const [staffData, setStaffData] = useState({});
  const [language, setLanguage] = useState("uz");
  const navigate = useNavigate();

  useEffect(() => {
    setLanguage(getCurrentLanguage()); // ✅ global til
    const fetchStaff = async () => {
      try {
        const res = await fetch(`${BASE_API_URL}/front/staff`); // ✅ global URL
        const data = await res.json();
        setStaffData(data);
      } catch (err) {
        console.error("❌ Xodimlarni olishda xato:", err);
      }
    };

    fetchStaff();
  }, []);

  return (
    <>
      <Navbar />
      <TopNavbar />
      <Box />
      <Container maxWidth="lg" sx={{ mt: 20, mb: 8 }}>
        <Fade in timeout={500}>
          <Box p={4}>
            {/* Kafedra mudiri */}
            {staffData.head && staffData.head.length > 0 && (
           <Paper
           elevation={1}
           sx={{
             p: 3,
             mb: 4,
             display: "flex",
             justifyContent: "space-between",
             alignItems: "center",
             flexWrap: "wrap",
             cursor: staffData.head[0].link ? "pointer" : "default",
           }}
           onClick={() => {
             if (staffData.head[0].link) {
               window.location.href = staffData.head[0].link; // ✅ Shu oynada ochiladi
             }
           }}
         >
         
                <Typography variant="subtitle2">
                  {TEXT.headOfDepartment[language]}
                </Typography>
                <Typography
                  variant="body1"
                  fontWeight="bold"
                  color="primary"
                  sx={{
                    textDecoration: staffData.head[0].link
                      ? "underline"
                      : "none",
                  }}
                >
                  {staffData.head[0][`name_${language}`]}
                </Typography>
              </Paper>
            )}

            {/* Qolgan toifalar */}
            {STAFF_CATEGORIES.map(({ key }) => (
              <Accordion key={key} TransitionProps={{ unmountOnExit: true }}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography fontWeight="bold">
                    + {TEXT.categories[key][language]}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  {Array.isArray(staffData[key]) && staffData[key].length > 0 ? (
                    <Table size="small">
                      <TableHead>
                        <TableRow>
                          <TableCell>#</TableCell>
                          <TableCell>{TEXT.fullName[language]}</TableCell>
                          <TableCell>{TEXT.position[language]}</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                {staffData[key].map((item, idx) => (
                  <TableRow
                    key={item.id}
                    hover
                    style={{ cursor: item.link ? "pointer" : "default" }}
                    onClick={() => {
                      if (item.link) {
                        if (item.link.startsWith("http")) {
                          window.location.href = item.link;
                        } else {
                          navigate(item.link); // ichki yo'nalish bo'lsa
                        }
                      }
                    }}
                    
                    
                  >
      <TableCell>{idx + 1}</TableCell>
      <TableCell>{item[`name_${language}`]}</TableCell>
      <TableCell>{item[`title_${language}`]}</TableCell>
    </TableRow>
  ))}
</TableBody>
                    </Table>
                  ) : (
                    <Typography color="textSecondary">
                      {TEXT.noData[language]}
                    </Typography>
                  )}
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
        </Fade>
      </Container>
      <Footer />
    </>
  );
};

export default Staff;
