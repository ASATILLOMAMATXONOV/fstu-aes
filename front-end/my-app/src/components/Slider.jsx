import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../config";

const Slider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get(`${BASE_URL}/api/banner/banners`) // ✅ TO‘G‘RI ROUTE
      .then(res => setImages(res.data))
      .catch(err => console.error("❌ Banner yuklanmadi:", err));
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % images.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) return <div style={{ minHeight: "400px" }}>Loading...</div>;

  return (
    <div style={{ width: "100%", overflow: "hidden", marginTop: "100px", position: "relative", textAlign: "center" }}>
      {images.map((item, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none" }}>
          <img
            src={`${BASE_URL}${item.image_url}`} // ✅ rasmlar backend URL bilan boshlansin
            alt="banner"
            style={{ width: "100%", height: "auto", display: "block" }}
          />
        </div>
      ))}

      <div style={navStyle}>
        <button onClick={goPrev} style={buttonStyle}>‹</button>
        <button onClick={goNext} style={buttonStyle}>›</button>
      </div>
    </div>
  );
};

const navStyle = {
  position: "absolute",
  top: "50%",
  left: 0,
  width: "100%",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transform: "translateY(-50%)",
  padding: "0 10px",
  boxSizing: "border-box"
};

const buttonStyle = {
  fontSize: "28px",
  background: "rgba(0,0,0,0.4)",
  color: "#fff",
  border: "none",
  borderRadius: "50%",
  width: "40px",
  height: "40px",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export default Slider;
