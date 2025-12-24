// ✅ AGAR LOCALDA ISHLASANGIZ:
// export const BASE_URL = "http://localhost:3001"; 

// ✅ AGAR ONLINEDA ISHLASANGIZ:
export const BASE_URL = "https://aes.fstu.uz";  // 🚀 domeningiz
export const BASE_API_URL = `${BASE_URL}/api`;  // faqat bitta API root
export const BASE_FRONT_URL = "https://aes.fstu.uz"; // frontend ham shu domen

// ✅ Image (or file) upload URL
export const IMAGE_UPLOAD_URL = `${BASE_API_URL}/upload/image`;

// ✅ Menu API endpoints (TO‘G‘RI variant)
export const MENU_ENDPOINTS = {
  department: `${BASE_API_URL}/menus?category=THE%20DEPARTMENT`,
  research: `${BASE_API_URL}/menus?category=RESEARCH`,
  teaching: `${BASE_API_URL}/menus?category=TEACHING`,
  academic: `${BASE_API_URL}/menus?category=ACADEMIC%20INFRASTRUCTURE`,
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
