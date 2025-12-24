import React, { useState, useEffect } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import { BASE_API_URL } from "../config";

if (typeof window !== "undefined") {
  window.hljs = hljs;
}

const defaultCategories = [
  "THE DEPARTMENT",
  "RESEARCH",
  "TEACHING",
  "ACADEMIC INFOSTRUCTURE",
  "➕ FANLARGA MA'LUMOT QO‘SHISH",
  "➕ YANGI SAHIFA",
];

const Pages = () => {
  const [selectedCategory, setSelectedCategory] = useState("");
  const [titles, setTitles] = useState({ uz: "", ru: "", en: "" });
  const [contents, setContents] = useState({ uz: "", ru: "", en: "" });
  const [pageList, setPageList] = useState([]);
  const [menu, setMenu] = useState("");
  const [menuOptions, setMenuOptions] = useState([]);
  const [customCategories, setCustomCategories] = useState([]);

  const [newPageData, setNewPageData] = useState({
    image_url: "",
    phone: "",
    email: "",
    scholar_link: "",
    position: "",
  });

  // 📂 Sahifalarni kategoriya bo‘yicha olish
  const fetchPages = async () => {
    try {
      const res = await fetch(
        `${BASE_API_URL}/api/pages/category/${encodeURIComponent(selectedCategory)}`
      );
      const data = await res.json();
      setPageList(data);
    } catch (err) {
      console.error("❌ Sahifalarni olishda xato:", err);
    }
  };

  // 📂 Menyularni olish
  const fetchMenus = async () => {
    if (!selectedCategory) return;
    try {
      const res = await fetch(
        `${BASE_API_URL}/api/pages/menus/${encodeURIComponent(selectedCategory)}`
      );
      const data = await res.json();
      setMenuOptions(data);
    } catch (err) {
      console.error("❌ Menyu olishda xato:", err);
    }
  };

  // 📂 Fanlarni olish
  const fetchFanlar = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/fanlar`);
      const data = await res.json();

      const normalized = data.map((fan) => ({
        id: fan.id,
        title_uz: fan.nom_uz,
        title_ru: fan.nom_ru,
        title_en: fan.nom_en,
      }));

      setMenuOptions(normalized);
    } catch (err) {
      console.error("❌ Fanlarni olishda xato:", err);
    }
  };

  // 📤 Rasm yuklash
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch(`${BASE_API_URL}/api/pages/upload-image`, {
        method: "POST",
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setNewPageData((prev) => ({
          ...prev,
          image_url: data.image_path,
        }));
        alert("✅ Rasm yuklandi!");
      } else {
        alert("❌ Rasm yuklashda xatolik");
      }
    } catch (err) {
      console.error("❌ Upload xato:", err);
    }
  };

  // 💾 Saqlash
  const handleSave = async () => {
    if (!selectedCategory || (!titles.uz && !titles.ru && !titles.en)) {
      alert("❗ Sarlavha kiritilishi kerak.");
      return;
    }

    const payload = {
      title_uz: titles.uz,
      title_ru: titles.ru,
      title_en: titles.en,
      content_uz: contents.uz,
      content_ru: contents.ru,
      content_en: contents.en,
      image_url: newPageData.image_url,
      phone: newPageData.phone,
      email: newPageData.email,
      scholar_link: newPageData.scholar_link,
      position: newPageData.position,
      category: selectedCategory,
      menu: menu || "",
    };

    const endpoint =
      selectedCategory === "➕ YANGI SAHIFA" ||
      selectedCategory === "➕ FANLARGA MA'LUMOT QO‘SHISH"
        ? `${BASE_API_URL}/api/newpages`
        : `${BASE_API_URL}/api/pages`;

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        alert("✅ Saqlandi!");
        setTitles({ uz: "", ru: "", en: "" });
        setContents({ uz: "", ru: "", en: "" });
        setNewPageData({
          image_url: "",
          phone: "",
          email: "",
          scholar_link: "",
          position: "",
        });
        setMenu("");
        fetchPages();
      } else {
        const errorData = await res.json();
        alert("❌ Saqlashda xatolik: " + errorData.error);
      }
    } catch (err) {
      alert("❌ Server xatoligi: " + err.message);
    }
  };

  // 🔄 Kategoriya o‘zgarganda
  useEffect(() => {
    if (selectedCategory === "➕ FANLARGA MA'LUMOT QO‘SHISH") {
      fetchFanlar();
    } else if (
      ["THE DEPARTMENT", "RESEARCH", "TEACHING", "ACADEMIC INFOSTRUCTURE"].includes(
        selectedCategory
      )
    ) {
      fetchMenus();
    }
  }, [selectedCategory]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold mb-4">➕ Sahifa qo‘shish</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[...defaultCategories, ...customCategories.map((c) => c.name)].map(
          (cat, i) => (
            <button
              key={cat + i}
              className={`px-4 py-2 border rounded-xl font-semibold ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-white hover:bg-blue-50"
              }`}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat}
            </button>
          )
        )}
      </div>

      {selectedCategory && (
        <div className="bg-white p-4 rounded-xl shadow space-y-6">
          {selectedCategory !== "➕ YANGI SAHIFA" && (
            <select
              className="border p-2 rounded w-full"
              value={menu}
              onChange={(e) => setMenu(e.target.value)}
            >
              <option value="">Bo‘limni tanlang</option>
              {menuOptions.map((m, i) => (
                <option
                  key={m.id || i}
                  value={m.title_uz || m.title_en || m.title_ru}
                >
                  {m.title_uz || m.title_en || m.title_ru}
                </option>
              ))}
            </select>
          )}

          {["uz", "ru", "en"].map((lang) => (
            <div key={lang}>
              <input
                type="text"
                className="border p-2 rounded w-full mb-2"
                placeholder={`Title (${lang})`}
                value={titles[lang]}
                onChange={(e) =>
                  setTitles({ ...titles, [lang]: e.target.value })
                }
              />
              <ReactQuill
                theme="snow"
                value={contents[lang]}
                onChange={(val) =>
                  setContents({ ...contents, [lang]: val })
                }
                modules={quillModules}
                formats={quillFormats}
                style={{ height: "250px" }}
              />
            </div>
          ))}

          <div className="flex justify-end">
            <button
              onClick={handleSave}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Saqlash
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const quillModules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, false] }],
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }],
      [{ color: [] }, { background: [] }],
      ["link", "image", "video"],
      ["clean"],
    ],
  },
};

const quillFormats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "color",
  "background",
  "link",
  "image",
  "video",
];

export default Pages;
