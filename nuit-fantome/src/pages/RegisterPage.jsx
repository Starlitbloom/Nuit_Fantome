import React from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import RegisterForm from "../components/RegisterForm";
import "../assets/css/style4.css"; // tu CSS del registro

export default function RegisterPage() {
  return (
    <>
      <Header />

      <main className="form-container">
        {/* Sección de registro */}
        <section className="register-section">
          <div className="register-box">
            <h2>Crear Cuenta</h2>
            <p>¡Regístrate para disfrutar de nuestros productos y promociones!</p>
            <RegisterForm />
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
