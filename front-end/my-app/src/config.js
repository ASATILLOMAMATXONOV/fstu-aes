// ✅ AGAR LOCALDA ISHLASANGIZ:
export const BASE_URL = "https://aes.fstu.uz"; // LOCAL backend
// export const BASE_URL = "http://localhost:3001"; // LOCAL backend
export const BASE_API_URL = `${BASE_URL}/api`;
export const BASE_FRONT_URL = "http://localhost:3000";


// ✅ Image (or file) upload URL
export const IMAGE_UPLOAD_URL = `${BASE_API_URL}/upload/image`;

// ✅ Menu API endpoints
export const MENU_ENDPOINTS = {
  department: `${BASE_API_URL}/menus/menus_department`,
  research: `${BASE_API_URL}/menus/menus_research`,
  teaching: `${BASE_API_URL}/menus/menus_teaching`,
  academic: `${BASE_API_URL}/menus/menus_academic`,
};

// ✅ Function to get the current language
export const getCurrentLanguage = () =>
  localStorage.getItem("language") || "uz";

// ✅ News section titles based on language
export const NEWS_TEXT = {
  uz: { focus: "Asosiy", aes: "AES Yangiliklari", fstu: "FSTU Yangiliklari" },
  ru: { focus: "Фокус", aes: "Новости AES", fstu: "Новости FSTU" },
  en: { focus: "Focus", aes: "AES News", fstu: "FSTU News" },
};
