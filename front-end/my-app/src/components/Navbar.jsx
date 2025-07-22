import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  Container,
  useMediaQuery,
  useTheme,
  Link,
} from '@mui/material';
import logo from '../assets/images/logo.png';

const DIGEPNavbar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const changeLanguage = (lang) => {
    localStorage.setItem("language", lang.toLowerCase());
    window.location.reload();
  };

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: '#001f3f',
        height: '100px',
        zIndex: 1300,
      }}
    >
      <Container maxWidth="lg" sx={{ height: '100%' }}>
        <Toolbar
          disableGutters
          sx={{
            height: '100%',
            px: isMobile ? 2 : 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'stretch',
            justifyContent: 'space-between',
            py: 0.5,
          }}
        >
          {/* Tillar qismi – yuqorida */}
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              gap: 1,
              width: '100%',
            }}
          >
            {['uz', 'ru', 'en'].map((lang) => (
              <button
                key={lang}
                onClick={() => changeLanguage(lang)}
                style={{
                  background: 'transparent',
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '4px',
                  padding: '4px 10px',
                  cursor: 'pointer',
                  fontSize: '0.75rem',
                }}
              >
                {lang.toUpperCase()}
              </button>
            ))}
          </Box>

          {/* Logo + Matn – pastda */}
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', width: '100%', margin:'7px' }}>
            {/* Logo */}
            <Link href="/" underline="none">
              <img
                src={logo}
                alt="FSTU Logo"
                style={{
                  height: isMobile ? 50 : 60,
                  objectFit: 'contain',
                }}
              />
            </Link>

          {/* Matn */}
          <Box sx={{ textAlign: 'center' }}>
            <Typography
              variant={isMobile ? 'h6' : 'h5'}
              sx={{ fontWeight: 'bold', color: 'white', lineHeight: 1 }}
            >
              FSTU
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: 'white',
                fontSize: isMobile ? '0.75rem' : '1rem',
                lineHeight: 1.2,
              }}
            >
              Advanced Engineering School
            </Typography>
          </Box>
        </Box>


        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default DIGEPNavbar;
