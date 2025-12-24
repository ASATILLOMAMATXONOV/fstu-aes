import React, { useEffect, useState } from "react";
import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Typography,
  Button,
  Stack,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField, // ✅ MUHIM
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from "@mui/icons-material/Close";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { BASE_API_URL } from "../config";

/* ---------------- QUILL ---------------- */
const quillModules = {
  toolbar: [
     [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ align: [] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["link", "image", "video"],
      ["clean"],
  ],
};

const quillFormats = [
  "header",
  "font",
  "size",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "script",
  "indent",
  "direction",
  "align",
  "color",
  "background",
  "link",
  "image",
  "video",
];

/* ---------------- MAIN ---------------- */
const Submenu = () => {
  const [pages, setPages] = useState([]);
  const [editPage, setEditPage] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);

  /* FETCH LIST */
  const fetchPages = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/submenu`);
      const data = await res.json();
      setPages(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Pages olishda xato:", err);
    }
  };

  /* FETCH DETAIL */
const fetchPageDetails = async (page) => {
  try {
    const res = await fetch(
      `${BASE_API_URL}/api/submenu/detail/${page.id}?source=${page.source}`
    );

    const data = await res.json();

    // 🔥 FAQAT DETAIL'DAN KELGAN TO‘LIQ DATA
    setEditPage({
      ...data,
      source: page.source,
    });
  } catch (err) {
    console.error("Detail olishda xato:", err);
  }
};


  /* SAVE */
  const handleSave = async () => {
    if (!editPage) return;

    const { id, source, ...body } = editPage;

    try {
      await fetch(`${BASE_API_URL}/api/submenu/${id}?source=${source}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      setEditPage(null);
      fetchPages();
    } catch (err) {
      console.error("Saqlashda xato:", err);
    }
  };

  /* DELETE */
  const handleDelete = async () => {
    if (!deleteTarget) return;

    const { id, source } = deleteTarget;

    try {
      await fetch(`${BASE_API_URL}/api/submenu/${id}?source=${source}`, {
        method: "DELETE",
      });

      setDeleteTarget(null);
      fetchPages();
    } catch (err) {
      console.error("Delete xato:", err);
    }
  };

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <Box p={3}>
      {/* HEADER */}
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6">📄 Sahifalar</Typography>
        <Typography variant="h4">{pages.length}</Typography>
      </Paper>

      {/* TABLE */}
      <Paper>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Kategoriya</TableCell>
              <TableCell>Menu</TableCell>
              <TableCell>Sarlavha (UZ)</TableCell>
              <TableCell>Amallar</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {pages.map((p) => (
              <React.Fragment key={`${p.source}-${p.id}`}>
                <TableRow>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.menu}</TableCell>
                  <TableCell>{p.title_uz}</TableCell>
                  <TableCell>
                    <Stack direction="row" spacing={1}>
                      <Button
                        size="small"
                        variant="outlined"
                        startIcon={<EditIcon />}
                        onClick={() => fetchPageDetails(p)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="small"
                        color="error"
                        variant="outlined"
                        startIcon={<DeleteIcon />}
                        onClick={() => setDeleteTarget(p)}
                      >
                        Delete
                      </Button>
                    </Stack>
                  </TableCell>
                </TableRow>

                {/* EDIT FORM */}
                {editPage &&
                  editPage.id === p.id &&
                  editPage.source === p.source && (
                    <TableRow>
                      <TableCell colSpan={5}>
                        <Paper sx={{ p: 3, backgroundColor: "#FFFDE7" }}>
                          {[
                            { code: "uz", label: "O‘zbekcha" },
                            { code: "ru", label: "Русский" },
                            { code: "en", label: "English" },
                          ].map(({ code, label }) => (
                            <Box key={code} mb={5}>
                              <Typography
                                variant="subtitle1"
                                fontWeight="bold"
                                mb={1}
                              >
                                {label}
                              </Typography>

                             <TextField
  fullWidth
  size="small"
  label={`Title (${label})`}
  value={editPage[`title_${code}`] ?? ""}
  onChange={(e) => {
    const field = `title_${code}`;
    const value = e.target.value;

    setEditPage((prev) => {
      if (prev[field] === value) return prev;

      return {
        ...prev,
        [field]: value,
      };
    });
  }}
/>


<ReactQuill
  theme="snow"
  value={editPage[`content_${code}`] ?? ""}
  onChange={(value) => {
    const field = `content_${code}`;

    setEditPage((prev) => {
      // agar qiymat o‘zgarmagan bo‘lsa, qayta set qilmaymiz
      if (prev[field] === value) return prev;

      return {
        ...prev,
        [field]: value, // 👈 HTML TO‘LIQ SAQLANADI
      };
    });
  }}
  modules={quillModules}
  formats={quillFormats}
/>





                            </Box>
                          ))}

                          <Stack
                            direction="row"
                            spacing={2}
                            justifyContent="flex-end"
                          >
                            <Button
                              variant="contained"
                              startIcon={<SaveIcon />}
                              onClick={handleSave}
                            >
                              Saqlash
                            </Button>
                            <Button
                              variant="outlined"
                              startIcon={<CloseIcon />}
                              onClick={() => setEditPage(null)}
                            >
                              Bekor
                            </Button>
                          </Stack>
                        </Paper>
                      </TableCell>
                    </TableRow>
                  )}
              </React.Fragment>
            ))}
          </TableBody>
        </Table>
      </Paper>

      {/* DELETE CONFIRM */}
      <Dialog open={!!deleteTarget} onClose={() => setDeleteTarget(null)}>
        <DialogTitle>O‘chirish</DialogTitle>
        <DialogContent>
          Rostdan ham ushbu sahifani o‘chirmoqchimisiz?
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setDeleteTarget(null)}>Bekor</Button>
          <Button color="error" onClick={handleDelete}>
            O‘chirish
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Submenu;
