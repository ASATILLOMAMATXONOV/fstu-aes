import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Box,
  Typography,
  Fade,
} from "@mui/material";

import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import parse from "html-react-parser";

import "../assets/style/PageDetail.css";
import { BASE_API_URL, getCurrentLanguage } from "../config"; // ✅ global imports

const PageDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [page, setPage] = useState(null);
  const [visible, setVisible] = useState(false);
  const [language, setLanguage] = useState(getCurrentLanguage());

  useEffect(() => {
    setLanguage(getCurrentLanguage());

    if (id) {
      axios
        .get(`${BASE_API_URL}/pages/menu/${id}`) // ✅ global API
        .then((res) => {
          if (Array.isArray(res.data) && res.data.length > 0) {
            setPage(res.data[0]);
            setVisible(true);
          } else {
            navigate("/");
          }
        })
        .catch((err) => {
          console.error("❌ Sahifa topilmadi:", err);
          navigate("/");
        });
    }
  }, [id, navigate]);

  const getTitle = () => {
    if (!page) return "";
    return (
      page[`title_${language}`] ||
      page.title_uz ||
      page.title_en ||
      page.title_ru ||
      "Sarlavha yo‘q"
    );
  };

  const getContent = () => {
    if (!page) return "";
    return (
      page[`content_${language}`] ||
      page.content_uz ||
      page.content_en ||
      page.content_ru ||
      ""
    );
  };

  const transformContent = (html) => {
    let transformed = html;

    transformed = transformed.replace(
      /<img([^>]+)>/g,
      `<div class="image-container fade-in" style="float: left; margin: 0 20px 20px 0;">
         <img $1 style="max-width:100%; height:auto; width:400px;" />
       </div>`
    );

    transformed += `<div style="clear: both;"></div>`;
    return transformed;
  };

  return (
    <>
      <Navbar />
      <TopNavbar />

      <Container>
        <Fade in={visible} timeout={600}>
          <Container sx={{ py: 5, marginTop: '100px' }}>
            {page && (
              <Box>
                <Typography
                  variant="h4"
                  gutterBottom
                  align="center"
                  sx={{ fontWeight: "bold" }}
                >
                  {getTitle()}
                </Typography>

                <Box className="page-content-wrapper">
                  {parse(transformContent(getContent()))}
                </Box>
              </Box>
            )}
          </Container>
        </Fade>
      </Container>

      <Footer />
    </>
  );
};

export default PageDetail;
