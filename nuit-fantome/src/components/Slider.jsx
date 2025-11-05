import React, { useState, useEffect } from "react";
import "../assets/css/style.css";

function Slider() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const slides = [
    "/assets/img/agendas_p.png",
    "/assets/img/digital_p.png",
    "/assets/img/coleccion_p.png",
  ];

  // --- Cambiar slide automáticamente ---
  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // cada 3 segundos cambia
    return () => clearInterval(interval);
  }, [currentIndex]);

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === slides.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? slides.length - 1 : prevIndex - 1
    );
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
  };

  return (
    <div className="slider">
      <div
        className="slides"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {slides.map((src, index) => (
          <div className="slide" key={index}>
            <img src={src} alt={`Imagen ${index + 1}`} />
          </div>
        ))}
      </div>

      <a className="prev" onClick={prevSlide}>
        &#10094;
      </a>
      <a className="next" onClick={nextSlide}>
        &#10095;
      </a>

      <div className="dots">
        {slides.map((_, index) => (
          <span
            key={index}
            className={`dot ${currentIndex === index ? "active" : ""}`}
            onClick={() => goToSlide(index)}
          ></span>
        ))}
      </div>
    </div>
  );
}

export default Slider;
