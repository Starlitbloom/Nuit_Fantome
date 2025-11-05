import React from "react";
import "../assets/css/style.css";
import Header from "../components/Header";
import Footer from "../components/Footer";
import Newsletter from "../components/Newsletter";
import Slider from "../components/Slider";



function HomePage() {
  return (
    <>
      {/* Barra superior */}
      <div className="top-bar">
        <div className="info-envios">
          <span>ENVÍOS GRATIS DESDE $24.990</span>
        </div>
        <div className="derecha-redes-sociales">
          <a href="/cambios">Cambios o Devoluciones</a>
          <a href="https://instagram.com" target="_blank"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank"><i className="fab fa-facebook-f"></i></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope"></i></a>
        </div>
      </div>

      <Header />

      <main>
        {/* Slider */}
        <Slider />
        
        {/* Sección doble imágenes */}
        <section className="doble-imagenes">
          <div className="imagen-container">
            <a href="/productos">
              <img src="/assets/img/libretas.png" alt="Libretas" />
              <div className="overlay"><h3>Libretas</h3></div>
            </a>
          </div>
          <div className="imagen-container">
            <a href="/productos">
              <img src="/assets/img/planners.png" alt="Planners" />
              <div className="overlay"><h3>Planners</h3></div>
            </a>
          </div>
        </section>

        {/* Fondo movimiento */}
        <section className="fondo-movimiento">
          <img src="/assets/img/fondo_papel_alargado.png" alt="Fondo de papel" className="fondo-img" />
          <div className="contenido-fondo">
            <h2>BIENVENIDOS A NUIT FANTOME</h2>
            <p>Nuestra papelería tiene como objetivo no solo ofrecer productos de alta calidad para que la gente pueda plasmar sus ideas y crear proyectos únicos, sino que queremos ser una tienda que fomente la creatividad y la conexión humana a través del arte.</p>
            <a href="/productos" className="btn-comprar">COMPRAR AHORA</a>
          </div>
        </section>

        {/* Productos destacados */}
        <section className="productos-recientes">
          <h2>Productos destacados</h2>
          <div className="grid-productos" id="productos-container"></div>
        </section>

        {/* Newsletter */}
        <Newsletter />

        {/* Sección Tipos de Envío */}
        <section className="envios">
            <h2>Conoce nuestros tipos de envío</h2>
            <p>Estos son los envíos que ofrecemos en nuestra tienda para que tus compras lleguen rápido y seguro.</p>

            <div className="envios-cards">
                <div className="envio-card retiro" style={{ backgroundImage: "url('/assets/img/fondo_envio1.png')" }}>
                    <h3>Retiro en tienda</h3>
                    <p>Retira tus productos directamente en nuestra tienda física.</p>
                </div>

                <div className="envio-card metropolitana" style={{ backgroundImage: "url('/assets/img/fondo_envio2.png')" }}>
                    <h3>Región Metropolitana</h3>
                    <p>Envío express y estándar dentro de Santiago.</p>
                </div>

                <div className="envio-card otras" style={{ backgroundImage: "url('/assets/img/fondo_envio3.png')" }}>
                    <h3>Otras regiones</h3>
                    <p>Envío estándar a todo Chile (Chilexpress y Correos de Chile).</p>
                </div>
            </div>
        </section>

        {/* Footer */}
        <Footer />
      </main>
      
    </>
  );
}

export default HomePage;
