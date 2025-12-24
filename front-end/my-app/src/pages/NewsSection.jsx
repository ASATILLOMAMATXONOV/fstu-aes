import React, { useEffect, useState } from 'react';
import {
  Box, Typography, List, ListItem, ListItemText, Divider,
  Container, ListItemButton, useMediaQuery, useTheme
} from '@mui/material';
import Slider from "react-slick";
import logo from '../assets/images/logo1.png';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import {
  BASE_API_URL,
  BASE_URL,
  getCurrentLanguage,
  NEWS_TEXT
} from '../config';

const NewsSection = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [language, setLanguage] = useState(getCurrentLanguage());
  const [focusData, setFocusData] = useState([]);
  const [aesData, setAesData] = useState([]);
  const [fstuData, setFstuData] = useState([]);

  const getContent = (item) => item[`content_${language}`]?.trim() || '';

  const filterValid = (arr) => {
    const seen = new Set();
    return arr.filter(item => {
      const content = getContent(item);
      if (content && !seen.has(content)) {
        seen.add(content);
        return true;
      }
      return false;
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [focusRes, aesRes, fstuRes] = await Promise.all([
          axios.get(`${BASE_API_URL}/news/focus_news`),
          axios.get(`${BASE_API_URL}/news/aes_news`),
          axios.get(`${BASE_API_URL}/news/fstu_news`)
        ]);
        setFocusData(filterValid(focusRes.data));
        setAesData(filterValid(aesRes.data));
        setFstuData(filterValid(fstuRes.data));
      } catch (err) {
        console.error("❌ Ma’lumotlarni olishda xatolik:", err);
      }
    };
    fetchData();
  }, [language]);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box display="flex" flexDirection={isMobile ? "column" : "row"} width="100%">
        <Box sx={{ backgroundColor: '#4d4d4d', color: 'white', px: 2, py: 1, width: isMobile ? '100%' : '20%', textAlign: isMobile ? 'center' : 'left' }}>
          <Typography variant="subtitle1" fontWeight="bold">{NEWS_TEXT[language].focus}</Typography>
        </Box>
        <Box sx={{ backgroundColor: '#003366', color: 'white', px: 2, py: 1, width: isMobile ? '100%' : '60%', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography variant="subtitle1" fontWeight="bold">{NEWS_TEXT[language].aes}</Typography>
          <img src="https://cdn-icons-png.flaticon.com/512/25/25425.png" alt="RSS" width="16" />
        </Box>
        <Box sx={{ backgroundColor: '#4d4d4d', color: 'white', px: 2, py: 1, width: isMobile ? '100%' : '20%', textAlign: isMobile ? 'center' : 'right' }}>
          <Typography variant="subtitle1" fontWeight="bold">{NEWS_TEXT[language].fstu}</Typography>
        </Box>
      </Box>

      <Box display="flex" flexDirection={isMobile ? "column" : "row"} width="100%" mt={1} gap={2}>
        {/* FOCUS NEWS */}
        <Box width={isMobile ? "100%" : "20%"} pr={isMobile ? 0 : 2} borderRight={isMobile ? 0 : "1px solid #ccc"}>
          <Box textAlign="center" mt={1} mb={2}>
            <img src={logo} alt="Mind4Lab" style={{ maxWidth: '100px' }} />
          </Box>
          <List dense>
            {focusData.map((item, idx) => (
              <React.Fragment key={idx}>
                <ListItem disablePadding>
                  <ListItemButton component="a" href="#" target="_blank">
                    <ListItemText primary={(getContent(item)).slice(0, 100) + '...'} />
                  </ListItemButton>
                </ListItem>
                <Divider />
              </React.Fragment>
            ))}
          </List>
        </Box>

        {/* AES SLIDER */}
        <Box width={isMobile ? "100%" : "60%"} px={isMobile ? 0 : 2} borderRight={isMobile ? 0 : "1px solid #ccc"}>
          <Slider {...settings}>
            {aesData.map((item, idx) => (
              <Box key={idx}>
                <Typography variant="body2" textAlign="justify" mb={2}>
                  {getContent(item).replace(/<[^>]+>/g, '')}
                </Typography>
                {item.image_url && (
                  <img
                    src={`${BASE_URL}${item.image_url}`}
                    alt="img"
                    style={{ width: '100%', maxHeight: '300px', objectFit: 'cover' }}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                )}
              </Box>
            ))}
          </Slider>
        </Box>

        {/* FSTU RIGHT SIDE */}
        <Box width={isMobile ? "100%" : "20%"} pl={isMobile ? 0 : 2}>
          {fstuData.map((item, idx) => (
            <Typography key={idx} variant="body2" fontStyle="italic" mt={1}>
              {(getContent(item) || '').slice(0, 200)}...
            </Typography>
          ))}
        </Box>
      </Box>
    </Container>
  );
};

export default NewsSection;