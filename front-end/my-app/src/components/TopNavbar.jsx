import React, { useEffect, useState } from "react";
import {
  AppBar,
  Toolbar,
  Box,
  Menu,
  MenuItem,
  Button,
  Fade,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { BASE_API_URL, BASE_FRONT_URL } from "../config"; // ✅ TO‘G‘RI IMPORT

const menuMap = {
  uz: {
    "BO'LIM": "menus_department",
    "TADQIQOT": "menus_research",
    "TA'LIM": "menus_teaching",
    "ILMIY INFRASTRUKTURA": "menus_academic",
  },
  ru: {
    "ОТДЕЛ": "menus_department",
    "ИССЛЕДОВАНИЕ": "menus_research",
    "ОБРАЗОВАНИЕ": "menus_teaching",
    "НАУЧНАЯ ИНФРАСТРУКТУРА": "menus_academic",
  },
  en: {
    "THE DEPARTMENT": "menus_department",
    "RESEARCH": "menus_research",
    "TEACHING": "menus_teaching",
    "ACADEMIC INFOSTRUCTURE": "menus_academic",
  }
};

const TopNavbar = () => {
  const [menus, setMenus] = useState({});
  const [anchorEls, setAnchorEls] = useState({});
  const [openMenu, setOpenMenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  useEffect(() => {
    const fetchMenus = async () => {
      const fetched = {};
      const rawLang = localStorage.getItem("language") || "uz";
      const language = rawLang.toLowerCase().slice(0, 2); // uz, ru, en

      for (const label in menuMap[language]) {
        const tableName = menuMap[language][label];
        try {
          const res = await fetch(`${BASE_API_URL}/topmenu/${tableName}`);
          const data = await res.json();
          if (Array.isArray(data) && data.length > 0) {
            fetched[label] = data.map((item) => ({ ...item, tableName }));
          } else {
            console.warn(`⚠️ ${label} menyusi bo‘sh.`);
          }
        } catch (err) {
          console.error(`❌ ${label} menyusini olishda xato:`, err);
        }
      }
      setMenus(fetched);
    };

    fetchMenus();
  }, []);

  const handleOpen = (event, label) => {
    setAnchorEls((prev) => ({ ...prev, [label]: event.currentTarget }));
    setOpenMenu(label);
  };

  const handleClose = () => {
    setOpenMenu(null);
  };

  const handleItemClick = (item) => {
    const destination = item.link?.startsWith("http")
      ? item.link // 🔁 agar to‘liq link bo‘lsa — aynan o‘sha link
      : `${BASE_FRONT_URL}${item.link || `/page/${item.tableName}/${item.id}`}`; // aks holda front URLga qo‘shamiz
  
    console.log(`🔗 Navigating to: ${destination}`);
    window.location.href = destination;
    handleClose();
  };
  

  const rawLang = localStorage.getItem("language") || "uz";
  const language = rawLang.toLowerCase().slice(0, 2); // uz, ru, en

  return (
    <>
      <AppBar
        position="fixed"
        sx={{ backgroundColor: "#001f3f", marginTop: "100px", zIndex: 1300 }}
      >
        <Toolbar sx={{ justifyContent: "end", flexWrap: "wrap" }}>
          <Box
            sx={{
              display: "flex",
              gap: 2,
              flexWrap: "wrap",
              justifyContent: isMobile ? "center" : "flex-end",
              width: isMobile ? "100%" : "auto",
            }}
            onMouseLeave={() => openMenu && handleClose()}
          >
            {Object.entries(menus).length === 0 ? (
              <p style={{ color: "white" }}>⚠️ Menyular mavjud emas.</p>
            ) : (
              Object.entries(menus).map(([label, items]) => (
                <Box key={label}>
                  <Button
                    sx={{ color: "white" }}
                    onClick={(e) => handleOpen(e, label)}
                  >
                    {label}
                  </Button>
                  <Menu
                    anchorEl={anchorEls[label]}
                    open={openMenu === label}
                    onClose={() => handleClose(label)}
                    TransitionComponent={Fade}
                    anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
                    transformOrigin={{ vertical: "top", horizontal: "left" }}
                    MenuListProps={{
                      onMouseLeave: () => handleClose(label),
                      sx: { width: 220 },
                    }}
                  >
                    {items.map((item) => (
                      <MenuItem
                        key={item.id}
                        onClick={() => handleItemClick(item)}
                      >
                        {item[`title_${language}`] || item.title_uz}
                      </MenuItem>
                    ))}
                  </Menu>
                </Box>
              ))
            )}
          </Box>
        </Toolbar>
      </AppBar>

      {/* Navbar pastidagi bo‘sh joy */}
      <Toolbar sx={{ minHeight: 70 }} />
    </>
  );
};

export default TopNavbar;
