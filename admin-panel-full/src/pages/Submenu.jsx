import React, { useEffect, useState } from "react";
import { Book, Pencil, Trash2 } from "lucide-react";
import { BASE_API_URL } from "../config";



const Button = ({ children, onClick, variant = "default" }) => {
  const style = {
    default: "bg-blue-600 text-white hover:bg-blue-700",
    outline: "border border-gray-300 text-gray-700 hover:bg-gray-100",
    destructive: "bg-red-600 text-white hover:bg-red-700"
  }[variant];

  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center px-3 py-1 rounded text-sm ${style}`}
    >
      {children}
    </button>
  );
};

const Submenu = () => {
  const [pages, setPages] = useState([]);
  const [editPage, setEditPage] = useState(null);

  const fetchPages = async () => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/submenu`);
      const data = await res.json();
      setPages(data);
    } catch (err) {
      console.error("❌ Ma'lumotlarni olishda xato:", err);
    }
  };


  const fetchPageDetails = async (id, source) => {
    try {
      const res = await fetch(`${BASE_API_URL}/api/submenu/detail/${id}?source=${source}`);
      const data = await res.json();
      if (data && typeof data === 'object') {
        setEditPage({ ...data, source });
      } else {
        console.warn("❗️ Kutilmagan ma'lumot formati:", data);
      }
    } catch (err) {
      console.error("❌ Sahifa tafsilotlarini olishda xato:", err);
    }
  };

const handleDelete = async (id, source) => {
  try {
    const res = await fetch(`${BASE_API_URL}/api/submenu/${id}?source=${source}`, {
      method: "DELETE",
    });
    if (res.ok) {
      alert("🗑️ O‘chirildi");
      fetchPages();
    } else {
      alert("❌ O‘chirishda xatolik");
    }
  } catch (err) {
    console.error("❌ O‘chirish xatosi:", err);
  }
};

const handleEditSubmit = async () => {
  try {
    const { id, source, ...updateData } = editPage;
    const res = await fetch(`${BASE_API_URL}/api/submenu/${id}?source=${source}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updateData),
    });
    if (res.ok) {
      alert("✅ Tahrirlandi");
      setEditPage(null);
      fetchPages();
    } else {
      alert("❌ Tahrirlashda xatolik");
    }
  } catch (err) {
    console.error("❌ PUT xatosi:", err);
  }
};
  
  const cleanHTML = (html) => {
    if (!html) return "";
  
    return html
      .replace(/<script[\s\S]*?>[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?>[\s\S]*?<\/style>/gi, "")
      .replace(/<code[\s\S]*?>[\s\S]*?<\/code>/gi, "")
      .replace(/<pre[\s\S]*?>[\s\S]*?<\/pre>/gi, "")
      .trim();
  };
  

  useEffect(() => {
    fetchPages();
  }, []);

  return (
    <div className="space-y-4 p-4">
      <div className="p-4 bg-white shadow rounded-lg flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">Jami sahifalar</p>
          <h2 className="text-2xl font-bold">{pages.length}</h2>
        </div>
        <Book size={32} />
      </div>

      <div className="bg-white p-4 shadow rounded-lg">
        <h3 className="text-lg font-semibold mb-4">📄 Pages ro‘yxati</h3>
        {pages.length === 0 ? (
          <p className="text-gray-500">⚠️ Sahifalar mavjud emas.</p>
        ) : (
          <table className="w-full table-auto border">
            <thead>
              <tr className="bg-gray-100">
                <th className="p-2 border">ID</th>
                <th className="p-2 border">Kategoriya</th>
                <th className="p-2 border">Sarlavha (UZ)</th>
                <th className="p-2 border">Amallar</th>
              </tr>
            </thead>
            <tbody>
              {pages.map((page) => (
                <tr key={page.id}>
                  <td className="p-2 border font-mono text-gray-700">{page.id}</td>
                  <td className="p-2 border">{page.category}</td>
                  <td className="p-2 border">{page.title_uz}</td>
                  <td className="p-2 border space-x-2">
                    <Button variant="outline" onClick={() => fetchPageDetails(page.id, page.source)}>
                      <Pencil className="w-4 h-4 mr-1" /> Tahrirlash
                    </Button>
                    <Button variant="destructive" onClick={() => handleDelete(page.id, page.source)}>
                      <Trash2 className="w-4 h-4 mr-1" /> O‘chirish
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {editPage && (
  <div className="bg-yellow-100 border border-yellow-300 p-4 rounded space-y-3">
    <h3 className="text-lg font-bold">✏️ Sahifani tahrirlash (ID: {editPage.id})</h3>

{editPage && (
  <div className="bg-yellow-100 border border-yellow-300 p-4 rounded space-y-3">

    {[
      "image_url",
      "title_uz", "title_ru", "title_en",
      "content_uz", "content_ru", "content_en",
      "phone", "email", "scholar_link", "position"
    ].map((field) => {
      if (!editPage.hasOwnProperty(field)) return null;

      const isContentField = ["content_uz", "content_ru", "content_en"].includes(field);

      const stripHtml = (html) => {
        if (!html) return "";
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = html;
        return tempDiv.textContent || tempDiv.innerText || "";
      };

      return (
        <div key={field} className="mb-3">
          <label className="block text-sm font-medium capitalize mb-1">
            {field.replace(/_/g, " ")}:
          </label>

          {/* Rasm ko‘rinishi */}
          {field === "image_url" && editPage[field] && (
            <img
              src={`${BASE_API_URL}${editPage[field]}`}
              alt="preview"
              className="w-40 h-40 object-cover mb-2 border rounded"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          )}

          {/* Matn maydonlari */}
          {isContentField ? (
            <textarea
              className="w-full border p-2 rounded min-h-[100px]"
              value={stripHtml(editPage[field])}
              onChange={(e) =>
                setEditPage({ ...editPage, [field]: e.target.value })
              }
            />
          ) : (
            <input
              type="text"
              className="w-full border p-2 rounded"
              value={editPage[field] || ""}
              onChange={(e) =>
                setEditPage({ ...editPage, [field]: e.target.value })
              }
            />
          )}
        </div>
      );
    })}

  </div>
)}




    <div className="space-x-2">
      <Button onClick={handleEditSubmit}>💾 Saqlash</Button>
      <Button variant="outline" onClick={() => setEditPage(null)}>❌ Bekor qilish</Button>
    </div>
  </div>
)}

    </div>
  );
};

export default Submenu;