import React, { useEffect, useState } from "react";
import {
  Typography,
  Box,
  Container,
  Button,
  Paper,
  CircularProgress,
} from "@mui/material";
import { motion } from "framer-motion";
import axios from "axios";
import { BASE_API_URL, getCurrentLanguage } from "../config"; // ✅ global config import

const Department = () => {
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [info, setInfo] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/department/${language}`);
        setInfo(res.data);
      } catch (err) {
        console.error("❌ Error loading content:", err);
      }
    };

    setLanguage(getCurrentLanguage());
    fetchData();
  }, [language]);

  if (!info) {
    return (
      <Box mt={10} textAlign="center">
        <CircularProgress />
      </Box>
    );
  }

  const renderContent = () => {
    // agar info.body HTML bo‘lsa, uni xavfsiz chiqaramiz
    return typeof info.body === "string" && info.body.includes("<")
      ? { __html: info.body }
      : null;
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 10 }}>
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <Typography
          align="left"
          gutterBottom
          sx={{
            fontWeight: 700,
            fontSize: { md: "1.5rem" },
            mb: 3,
            background: "linear-gradient(to right, #1976d2, #1e40af)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          {info.title}
        </Typography>

        <Paper
          elevation={4}
          sx={{ p: 4, borderRadius: 3, backgroundColor: "#f9f9f9" }}
        >
          {renderContent() ? (
            <Typography
              variant="body1"
              sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7, textAlign: "justify" }}
              dangerouslySetInnerHTML={renderContent()}
            />
          ) : (
            <Typography
              variant="body1"
              sx={{ mb: 3, fontSize: "1.1rem", lineHeight: 1.7, textAlign: "justify" }}
            >
              {info.body}
            </Typography>
          )}

          {info.link && (
            <Box sx={{ textAlign: "right" }}>
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  variant="contained"
                  color="primary"
                  href={info.link}
                  target="_blank"
                  sx={{
                    px: 3,
                    py: 1,
                    borderRadius: 2,
                    fontWeight: 600,
                    textTransform: "none",
                  }}
                >
                  {language === "uz"
                    ? "Taqdimotni o‘qish"
                    : language === "ru"
                    ? "Читать презентацию"
                    : "Read the presentation"}
                </Button>
              </motion.div>
            </Box>
          )}
        </Paper>
      </motion.div>
    </Container>
  );
};

export default Department;
