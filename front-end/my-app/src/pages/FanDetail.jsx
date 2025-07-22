import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Box,
  Typography,
  Container,
  CircularProgress,
  Button,
  Paper,
  Fade,
  Slide,
  Grid,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import TopNavbar from "../components/TopNavbar";
import { BASE_API_URL, getCurrentLanguage } from "../config";

const createMarkup = (html) => {
  return { __html: html };
};

const FanDetail = () => {
  const { id } = useParams();
  const [fan, setFan] = useState(null);
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [expandedIndex, setExpandedIndex] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFan = async () => {
      try {
        console.log("🔗 So‘rov yuborilmoqda:", `${BASE_API_URL}/fanlar/${id}`);
        const res = await axios.get(`${BASE_API_URL}/fanlar/${id}`);
        setFan(res.data);
      } catch (error) {
        console.error("❌ Fan ma'lumotlarini olishda xato:", error);
      }
    };
  
    setLanguage(getCurrentLanguage());
    fetchFan();
  }, [id]);
  



  const handleToggle = (index) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  if (!fan) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Navbar />
      <TopNavbar />
      <Container maxWidth="md" sx={{ mt: "30px", pt: 10, pb: 5 }}>
        <Paper elevation={4} sx={{ p: 4, borderRadius: 2 }}>
          <Fade in={true} timeout={500}>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {fan[`nom_${language}`]}
            </Typography>
          </Fade>

          <Grid container spacing={2} mt={4}>
            {fan.kategoriyalar?.map((kat, index) => (
              <Grid item xs={12} sm={6} md={4} key={kat.id}>
                <Box>
                  <Button
                    fullWidth
                    variant="contained"
                    onClick={() => handleToggle(index)}
                    endIcon={
                      expandedIndex === index ? (
                        <ExpandLessIcon />
                      ) : (
                        <ExpandMoreIcon />
                      )
                    }
                    sx={{
                      textTransform: "none",
                      fontWeight: "bold",
                      backgroundColor:
                        expandedIndex === index ? "primary.dark" : "primary.main",
                      color: "#fff",
                      "&:hover": {
                        backgroundColor:
                          expandedIndex === index ? "primary.main" : "primary.dark",
                      },
                      transition: "all 0.3s ease",
                    }}
                  >
                     {kat[`nom_${language}`] || kat.name || "Noma'lum kategoriya"}
                  </Button>

                  <Slide
                    direction="down"
                    in={expandedIndex === index}
                    mountOnEnter
                    unmountOnExit
                  >
                    <Paper
                      elevation={3}
                      sx={{
                        p: 2,
                        mt: 1,
                        backgroundColor: "#f9f9f9",
                        width: "100%",
                      }}
                    >
                      {/* ✅ TITLE chiqadi */}
                      {kat.title && (
                        <Typography
                          variant="body2"
                          fontStyle="italic"
                          color="text.secondary"
                          sx={{ mb: 1 }}
                        >
                          📌 {kat.title}
                        </Typography>
                      )}

                      {/* ✅ Kontent chiqadi */}
                      {kat[`content_${language}`] &&
                      kat[`content_${language}`].trim() ? (
                        <Typography
                          component="div"
                          sx={{ lineHeight: 1.6 }}
                          dangerouslySetInnerHTML={{
                            __html: kat[`content_${language}`],
                          }}
                        />
                      ) : null}

                      {/* ✅ Mavzular */}
                      {Array.isArray(kat.mavzular) && kat.mavzular.length > 0 ? (
                        <Box mt={2}>
                          <Typography
                            variant="subtitle1"
                            fontWeight="bold"
                            color="primary"
                            gutterBottom
                          >
                            Mavzular:
                          </Typography>
                          <ul style={{ paddingLeft: 20, margin: 0 }}>
                            {kat.mavzular.map((mavzu) => {
                              const title =
                                mavzu[`nom_${language}`]?.trim() || mavzu.nom_uz;
                              return (
                                <li key={mavzu.id}>
                                  <a
                                    href={mavzu.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{
                                      textDecoration: "none",
                                      color: "#1976d2",
                                      fontWeight: "bold",
                                    }}
                                  >
                                    {title}
                                  </a>
                                </li>
                              );
                            })}
                          </ul>
                        </Box>
                      ) : (
                        <Typography color="warning.main" mt={2}>
                          🟠 Mavzular mavjud emas
                        </Typography>
                      )}
                    </Paper>
                  </Slide>
                </Box>
              </Grid>
            ))}
          </Grid>

          {/* ✅ Fan sahifasi (pages jadvalidan) */}
          {fan.page && (
            <Fade in={true} timeout={500}>
              <Box mt={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  textAlign="center"
                  fontWeight="bold"
                  color="primary"
                >
                  {fan.page[`title_${language}`]}
                </Typography>

                <Box
                  display="flex"
                  flexDirection={{ xs: "column", md: "row" }}
                  gap={4}
                  mt={3}
                >
                  <Box flex={1}>
                    <Typography
                      component="div"
                      sx={{
                        lineHeight: 1.8,
                        border: "1px solid #e0e0e0",
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: "#fafafa",
                        boxShadow: "0 0 5px rgba(0,0,0,0.05)",
                      }}
                      dangerouslySetInnerHTML={createMarkup(
                        fan.page[`content_${language}`]
                      )}
                    />
                  </Box>
                </Box>
              </Box>
            </Fade>
          )}

          {/* ✅ YANGI SAHIFA (newpages jadvalidan) */}
          {fan.newpage && (
            <Fade in={true} timeout={500}>
              <Box mt={6}>
                <Typography
                  variant="h6"
                  gutterBottom
                  textAlign="center"
                  fontWeight="bold"
                  color="primary"
                >
                  {fan.newpage[`title_${language}`]}
                </Typography>

                {fan.newpage[`content_${language}`] && (
                  <Box mt={2}>
                    <Typography
                      component="div"
                      sx={{
                        lineHeight: 1.8,
                        border: "1px solid #ddd",
                        borderRadius: 2,
                        p: 2,
                        backgroundColor: "#fefefe",
                      }}
                      dangerouslySetInnerHTML={createMarkup(
                        fan.newpage[`content_${language}`]
                      )}
                    />
                  </Box>
                )}
              </Box>
            </Fade>
          )}
        </Paper>
      </Container>
      <Footer />
    </>
  );
};

export default FanDetail;
