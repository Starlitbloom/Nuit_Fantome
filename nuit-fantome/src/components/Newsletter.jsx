import React, { useState } from "react";
import "../assets/css/style.css";
import { addSubscriber } from "../data/NewsletterData"; // ojo: nombre en minúscula

function Newsletter() {
  const [email, setEmail] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación básica
    if (!email.includes("@")) {
      setMensaje("Por favor ingresa un correo válido.");
      return;
    }

    // Guardamos en el archivo de datos simulado
    const agregado = addSubscriber(email);

    if (!agregado) {
      setMensaje("Este correo ya está registrado 🩷");
    } else {
      setMensaje("¡Gracias por unirte al club! 💌");
      setEmail("");
    }

    // hace que cualquier mensaje desaparezca después de 3 segundos
    setTimeout(() => setMensaje(""), 3000);
  };

  return (
    <section className="newsletter">
      <img src="/assets/img/club.png" alt="Fondo newsletter" className="newsletter-img" />
      <div className="newsletter-contenido">
        <h2>¡Únete a nuestro club!</h2>
        <p>
          Sé parte de nuestra comunidad para que estemos en contacto y podamos
          compartir la mejor información, tips, sorpresas, descuentos, lanzamientos y más!
        </p>

        <form className="newsletter-form" onSubmit={handleSubmit}>
          <div className="input-container">
            <i className="bi bi-envelope-at-fill"></i>
            <input
              type="email"
              placeholder="Ingresa tu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit">Suscribirse</button>
        </form>

        <p className={`newsletter-mensaje ${mensaje ? "visible" : ""}`}>
          {mensaje}
        </p>

      </div>
    </section>
  );
}

export default Newsletter;
