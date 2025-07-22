import React, { useState, useEffect } from "react";
import MenusBox from "../components/MenusBox";
import uzFlag from "../assets/uzbekistan.png";
import ruFlag from "../assets/russia.png";
import ukFlag from "../assets/uk.png";
import { Pencil, Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { BASE_API_URL } from "../config"; 


const Menus = () => {
  const [values, setValues] = useState({ uz: "", ru: "", en: "" });
  const [menuList, setMenuList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();

  const handleValueChange = (lang, newValue) => {
    setValues((prev) => ({ ...prev, [lang]: newValue }));
  };
  const handleSave = async () => {
    if (!values.uz && !values.ru && !values.en) {
      alert("❗ Iltimos, kamida bitta tilga ma’lumot kiriting.");
      return;
    }
    if (!selectedCategory) {
      alert("❗ Iltimos, bo‘limni tanlang.");
      return;
    }
  
    const payload = {
      uz: values.uz,
      ru: values.ru,
      en: values.en,
      category: selectedCategory,
    };

    try {
      const response = await fetch(`${BASE_API_URL}/api/menus`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
  
      if (response.ok) {
        setValues({ uz: "", ru: "", en: "" });
        setSelectedCategory("");
        fetchMenus();
      } else {
        alert("❌ Xatolik: saqlab bo‘lmadi");
      }
    } catch (error) {
      console.error("❌ Tarmoq xatosi:", error);
      alert("❌ Serverga ulanishda xato");
    }
  };   

  const fetchMenus = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/menus?q=${encodeURIComponent(searchTerm)}`);
      const data = await res.json();
  
      const lowerSearch = searchTerm.toLowerCase();
      const matching = [];
      const others = [];
  
      data.forEach((item) => {
        const isMatch =
          item.title_uz?.toLowerCase().includes(lowerSearch) ||
          item.title_ru?.toLowerCase().includes(lowerSearch) ||
          item.title_en?.toLowerCase().includes(lowerSearch);
  
        if (isMatch) {
          matching.push({ ...item, _match: true });
        } else {
          others.push({ ...item, _match: false });
        }
      });
  
      setMenuList([...matching, ...others]);
    } catch (err) {
      console.error("❌ Ma'lumotni yuklashda xato:", err);
    }
  };

  const handleDelete = async (id, category) => {
    try {
      const encodedCategory = encodeURIComponent(category);
      const res = await fetch(`${BASE_API_URL}/api/menus/${encodedCategory}/${id}`, {
        method: "DELETE",
      });
  
      if (res.ok) {
        fetchMenus();
      } else {
        alert("❌ O‘chirishda xatolik");
      }
    } catch (err) {
      console.error("❌ Server xatosi:", err);
      alert("❌ Serverga ulanishda xatolik");
    }
  };

  useEffect(() => {
    fetchMenus();
  }, [searchTerm]);

  return (
    <div className="p-4 space-y-6">
      <h2 className="text-2xl font-bold">Yangi menyularni kiriting</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <MenusBox
          title="Oʻzbekcha"
          value={values.uz}
          icon={<img src={uzFlag} alt="Uzbek flag" className="w-6 h-4 rounded-sm" />}
          onChange={(val) => handleValueChange("uz", val)}
        />
        <MenusBox
          title="Русский"
          value={values.ru}
          icon={<img src={ruFlag} alt="Russian flag" className="w-6 h-4 rounded-sm" />}
          onChange={(val) => handleValueChange("ru", val)}
        />
        <MenusBox
          title="English"
          value={values.en}
          icon={<img src={ukFlag} alt="UK flag" className="w-6 h-4 rounded-sm" />}
          onChange={(val) => handleValueChange("en", val)}
        />
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4 text-gray-800">Bo‘limni tanlang:</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {["THE DEPARTMENT", "RESEARCH", "TEACHING", "ACADEMIC INFOSTRUCTURE"].map((item) => (
            <label
              key={item}
              className={`cursor-pointer flex items-center justify-center p-4 border rounded-xl shadow-sm text-sm font-medium transition-all
                ${selectedCategory === item
                  ? "bg-blue-600 text-white border-blue-700 shadow-lg"
                  : "bg-white hover:bg-blue-50 border-gray-300"}`}
            >
              <input
                type="radio"
                name="category"
                value={item}
                checked={selectedCategory === item}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="hidden"
              />
              {item}
            </label>
          ))}
        </div>
      </div>

      <div className="flex justify-end">
        <button
          onClick={handleSave}
          disabled={!selectedCategory}
          className={`py-2 px-6 rounded-xl font-semibold transition-all duration-300 ${
            selectedCategory
              ? "bg-blue-600 hover:bg-blue-700 text-white"
              : "bg-gray-400 text-white cursor-not-allowed"
          }`}
        >
          Saqlash
        </button>
      </div>

      <hr className="border-t-2 border-blue-500 mt-6" />

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">Menu</h3>

        <input
          type="text"
          placeholder="🔍 Qidiruv..."
          className="border px-3 py-2 rounded-md mb-4 w-full sm:w-1/2"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <table className="w-full table-fixed border border-gray-300 text-left">
        <thead className="bg-gray-100">
            <tr>
              <th className="p-2 border w-1/12">ID</th> {/* Qo‘shildi */}
              <th className="p-2 border w-2/12">Uz</th>
              <th className="p-2 border w-2/12">Ru</th>
              <th className="p-2 border w-2/12">En</th>
              <th className="p-2 border w-2/12">Bo‘lim</th>
              <th className="p-2 border w-2/12">Actions</th>
            </tr>
          </thead>

          <tbody>
  {menuList.length === 0 ? (
    <tr>
      <td colSpan={7} className="text-center p-4 text-gray-500">
        🔍 Hech qanday ma'lumot topilmadi.
      </td>
    </tr>
  ) : (
    menuList.map((item, idx) => (
      <tr
        key={`${item.category}-${item.id}`}
        className={`hover:bg-gray-50 ${item._match ? "bg-yellow-50" : ""}`}
      >
        <td className="p-2 border font-mono text-gray-700">{item.id}</td> {/* ID ko‘rinadi */}
        <td className="p-2 border">{item.title_uz}</td>
        <td className="p-2 border">{item.title_ru}</td>
        <td className="p-2 border">{item.title_en}</td>
        <td className="p-2 border">{item.category}</td>
        <td className="p-2 border">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/menus/edit/${item.category}/${item.id}`)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 text-blue-700"
            >
              <Pencil size={16} />
              <span className="text-sm">Edit</span>
            </button>
            <button
              onClick={() => handleDelete(item.id, item.category)}
              className="flex items-center gap-1 px-2 py-1 rounded-lg bg-red-100 hover:bg-red-200 text-red-700"
            >
              <Trash2 size={16} />
              <span className="text-sm">Delete</span>
            </button>
          </div>
        </td>
      </tr>
    ))
  )}
</tbody>

        </table>
      </div>
    </div>
  );
};

export default Menus;
