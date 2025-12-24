import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Stack,
  CircularProgress,
} from "@mui/material";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import { BASE_API_URL } from "../config";

const MenusEdit = () => {
  const { category, id } = useParams();
  const navigate = useNavigate();

  const [values, setValues] = useState({ uz: "", ru: "", en: "" });
  const [loading, setLoading] = useState(true);

  // 🔽 Input change
  const handleChange = (field) => (e) => {
    setValues((prev) => ({ ...prev, [field]: e.target.value }));
  };

  // 📥 Fetch menu
  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch(
          `${BASE_API_URL}/api/menus/${category}/${id}`
        );
        const data = await res.json();

        setValues({
          uz: data.title_uz || "",
          ru: data.title_ru || "",
          en: data.title_en || "",
        });
      } catch (err) {
        alert("❌ Ma'lumotni yuklashda xato");
      } finally {
        setLoading(false);
      }
    };

    fetchMenu();
  }, [category, id]);

  // 💾 Save
  const handleSave = async () => {
    try {
      const res = await fetch(
        `${BASE_API_URL}/api/menus/${category}/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        }
      );

      if (res.ok) {
        alert("✅ Muvaffaqiyatli yangilandi");
        navigate("/menus");
      } else {
        alert("❌ Saqlashda xato");
      }
    } catch {
      alert("❌ Server bilan aloqa yo‘q");
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth={700} mx="auto" mt={4}>
      <Paper elevation={4} sx={{ p: 4, borderRadius: 3 }}>
        <Typography variant="h5" fontWeight="bold" mb={3}>
          Menyuni tahrirlash (ID: {id})
        </Typography>

        <Stack spacing={3}>
          <TextField
            label="O‘zbekcha"
            value={values.uz}
            onChange={handleChange("uz")}
            fullWidth
          />

          <TextField
            label="Русский"
            value={values.ru}
            onChange={handleChange("ru")}
            fullWidth
          />

          <TextField
            label="English"
            value={values.en}
            onChange={handleChange("en")}
            fullWidth
          />
        </Stack>

        <Stack direction="row" spacing={2} justifyContent="flex-end" mt={4}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<SaveIcon />}
            onClick={handleSave}
          >
            Saqlash
          </Button>

          <Button
            variant="outlined"
            color="inherit"
            startIcon={<CloseIcon />}
            onClick={() => navigate(-1)}
          >
            Bekor qilish
          </Button>
        </Stack>
      </Paper>
    </Box>
  );
};

export default MenusEdit;
