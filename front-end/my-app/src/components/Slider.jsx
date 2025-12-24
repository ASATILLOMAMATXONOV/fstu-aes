import React, { useState, useEffect } from "react";
import axios from "axios";
<<<<<<< HEAD
import { BASE_API_URL, BASE_URL } from "../config";
=======
import { BASE_URL } from "../config";
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b

const Slider = () => {
  const [images, setImages] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
<<<<<<< HEAD
    axios
      .get(`${BASE_API_URL}/banner/banners`)   // ✅ TO‘G‘RI
      .then((res) => setImages(res.data))
      .catch((err) => console.error("❌ Banner yuklanmadi:", err));
=======
    axios.get(`${BASE_URL}/api/banner/banners`) // ✅ TO‘G‘RI ROUTE
      .then(res => setImages(res.data))
      .catch(err => console.error("❌ Banner yuklanmadi:", err));
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
  }, []);

  useEffect(() => {
    if (images.length === 0) return;
    const timer = setInterval(() => {
<<<<<<< HEAD
      setIndex((prev) => (prev + 1) % images.length);
=======
      setIndex(prev => (prev + 1) % images.length);
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
    }, 5000);
    return () => clearInterval(timer);
  }, [images]);

  const goNext = () => setIndex((prev) => (prev + 1) % images.length);
  const goPrev = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

  if (images.length === 0) return <div style={{ minHeight: "400px" }}>Loading...</div>;

  return (
<<<<<<< HEAD
    <div
      style={{
        width: "100%",
        overflow: "hidden",
        marginTop: "100px",
        position: "relative",
        textAlign: "center",
      }}
    >
      {images.map((item, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none" }}>
          <img
            src={`${BASE_URL}/uploads/${item.image_url}`}
            alt="banner"
            style={{
              width: "100%",
              height: "auto",
              objectFit: "cover",
              background: "gray",
            }}
=======
    <div style={{ width: "100%", overflow: "hidden", marginTop: "100px", position: "relative", textAlign: "center" }}>
      {images.map((item, i) => (
        <div key={i} style={{ display: i === index ? "block" : "none" }}>
          <img
            src={`${BASE_URL}${item.image_url}`} // ✅ rasmlar backend URL bilan boshlansin
            alt="banner"
            style={{ width: "100%", height: "auto", display: "block" }}
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
          />
        </div>
      ))}

      <div style={navStyle}>
<<<<<<< HEAD
        <button onClick={goPrev} style={buttonStyle}>
          ‹
        </button>
        <button onClick={goNext} style={buttonStyle}>
          ›
        </button>
=======
        <button onClick={goPrev} style={buttonStyle}>‹</button>
        <button onClick={goNext} style={buttonStyle}>›</button>
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
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
<<<<<<< HEAD
  boxSizing: "border-box",
=======
  boxSizing: "border-box"
>>>>>>> 0ab9d172d6e8b505adef20f2d54f0663f9d0e58b
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
