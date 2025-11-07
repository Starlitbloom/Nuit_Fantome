import React, { useState } from "react";
import { getUsers } from "../data/UsersData";
import { useNavigate } from "react-router-dom";
import "../assets/css/style3.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    // Limpiar errores anteriores
    setEmailError("");
    setPasswordError("");
    setMensaje("");

    const emailTrim = email.trim();
    const passwordTrim = password.trim();

    let valid = true;

    // Validar correo
    const allowedDomains = ["gmail.com", "duocuc.cl", "profesor.duocuc.cl"];
    const emailParts = emailTrim.split("@");
    const domain = emailParts[1] || "";

    if (!emailTrim) {
      setEmailError("Por favor ingresa tu correo.");
      valid = false;
    } else if (emailTrim.length > 100) {
      setEmailError("El correo no puede superar 100 caracteres.");
      valid = false;
    } else if (emailParts.length !== 2 || !allowedDomains.includes(domain)) {
      setEmailError("Correo no válido.");
      valid = false;
    }

    // Validar contraseña
    if (!passwordTrim) {
      setPasswordError("Por favor ingresa tu contraseña.");
      valid = false;
    } else if (passwordTrim.length < 4 || passwordTrim.length > 10) {
      setPasswordError("La contraseña debe tener entre 4 y 10 caracteres.");
      valid = false;
    }

    if (!valid) return; // Detener si hay errores

    const users = getUsers();
    const usuario = users.find((u) => u.email === emailTrim);

    if (!usuario) {
      setEmailError("Correo no registrado.");
      return;
    }

    if (usuario.password !== passwordTrim) {
      setPasswordError("Contraseña incorrecta.");
      return;
    }

    // Guardar usuario actual en localStorage
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    // Mensaje de éxito
    setMensaje("✅ ¡Inicio de sesión exitoso! Serás redirigido 💫");

    // Redirigir según el rol del usuario
    setTimeout(() => {
      if (usuario.rol === "admin") {
        navigate("/admin/dashboard"); // 🔹 Vista administrador
      } else {
        navigate("/"); // 🔹 Vista tienda
      }
    }, 1500);
  };

  return (
    <>
      {/* ✅ Toast centrado */}
      {mensaje && (
        <div
          className={`toast ${
            mensaje.includes("exitoso") ? "toast-success" : "toast-error"
          }`}
        >
          {mensaje}
        </div>
      )}

      <form id="login-form" noValidate onSubmit={handleSubmit}>
        <div className="input-container">
          <i className="bi bi-envelope-at-fill"></i>
          <input
            type="text"
            id="email"
            placeholder="Correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {emailError && <p className="error-message">{emailError}</p>}
        </div>

        <div className="input-container">
          <i className="bi bi-lock-fill"></i>
          <input
            type="password"
            id="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          {passwordError && <p className="error-message">{passwordError}</p>}
        </div>

        <div className="remember">
          <input type="checkbox" id="recuerdame" />
          <label htmlFor="recuerdame">Recuérdame</label>
        </div>

        <button id="btn-login" type="submit" className="btn-login">
          Iniciar Sesión
        </button>
        <p className="forgot-password">¿Olvidaste la contraseña?</p>
      </form>
    </>
  );
}
