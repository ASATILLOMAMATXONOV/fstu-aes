import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import parse from "html-react-parser";
import {
  Container,
  Typography,
  Box,
  Avatar,
  Grid,
  Card,
  CardContent,
  Link,
  Fade,
} from "@mui/material";
import Navbar from "../components/Navbar";
import TopNavbar from "../components/TopNavbar";
import Footer from "../components/Footer";
import { BASE_API_URL, BASE_URL } from "../config"; // Import BASE_API_URL and BASE_URL

const NewPageDetail = () => {
  const { id } = useParams();
  const [page, setPage] = useState(null);
  const [language] = useState(localStorage.getItem("language") || "uz");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    axios
      .get(`${BASE_API_URL}/newpages/id/${id}`) // Use BASE_API_URL
      .then((res) => {
        setPage(res.data);
        setVisible(true);
      })
      .catch((err) => {
        console.error("❌ Sahifa topilmadi:", err);
        setPage(null);
      });
  }, [id]);

  const getTitle = () => {
    if (!page) return "";
    return (
      page[`title_${language}`] || page.title_uz || page.title_en || page.title_ru
    );
  };

  const getContent = () => {
    if (!page) return "";
    return (
      page[`content_${language}`] ||
      page.content_uz ||
      page.content_en ||
      page.content_ru
    );
  };

  const getImageSrc = () => {
    if (!page?.image_url) return "/images/default-profile.png";

    if (page.image_url.includes("drive.google.com")) {
      const match = page.image_url.match(/\/d\/([^/]+)\//);
      if (match && match[1]) {
        return `https://drive.google.com/uc?id=${match[1]}`;
      }
      return page.image_url;
    }

    if (page.image_url.startsWith("uploads/")) {
      return `${BASE_URL}/${page.image_url}`; // Use BASE_URL
    }

    return page.image_url;
  };

  const transformContent = (html) => {
    return html.replace(
      /<img([^>]+)>/g,
      '<img style="max-width:100%; height:auto; border-radius:10px; margin: 15px 0;" $1 />'
    );
  };

  return (
    <>
      <Navbar />
      <TopNavbar />
      <Box />
      <Container sx={{ mt: 15, mb: 8 }}>
        <Fade in={visible} timeout={700}>
          <Box>
            {page ? (
              <>
                <Card sx={{ p: 3, mb: 4, boxShadow: 4 }}>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={3}>
                      <Avatar
                        src={getImageSrc()}
                        sx={{ width: 180, height: 220 }}
                        variant="rounded"
                      />
                    </Grid>
                    <Grid item xs={12} md={9}>
                      <Typography variant="h4" fontWeight="bold" gutterBottom>
                        {getTitle()}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ mb: 1 }}>
                        <strong>Lavozim:</strong> {page.position || "Associate Professor"}
                      </Typography>
                      {page.phone && (
                        <Typography>
                          <strong>Telefon:</strong> {page.phone}
                        </Typography>
                      )}
                      {page.email && (
                        <Typography>
                          <strong>Email:</strong>{" "}
                          <Link href={`mailto:${page.email}`}>{page.email}</Link>
                        </Typography>
                      )}
                      {page.scholar_link && (
                        <Typography>
                          <strong>Scholar:</strong>{" "}
                          <Link href={page.scholar_link} target="_blank" rel="noopener">
                            Google Scholar
                          </Link>
                        </Typography>
                      )}
                    </Grid>
                  </Grid>
                </Card>

                <Card sx={{ p: 4, boxShadow: 3 }}>
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom color="primary">
                      Portfolio Ma’lumotlari
                    </Typography>

                    <Box
                      sx={{
                        mt: 3,
                        "& img": {
                          maxWidth: "100%",
                          height: "auto",
                          borderRadius: "10px",
                          margin: "15px 0",
                        },
                        "& h1,h2,h3": {
                          color: "#2e3b55",
                        },
                        "& p": {
                          textAlign: "justify",
                          fontSize: "17px",
                          lineHeight: "1.7",
                        },
                      }}
                    >
                      {parse(transformContent(getContent()))}
                    </Box>
                  </CardContent>
                </Card>
              </>
            ) : (
              <Typography variant="h6" color="error">
                ❌ Sahifa topilmadi
              </Typography>
            )}
          </Box>
        </Fade>
      </Container>
      <Footer />
    </>
  );
};

export default NewPageDetail;