import React, { useState } from "react";
import { addUser } from "../data/UsersData";
import { regiones, comunas } from "../data/RegionsData";
import { useNavigate } from "react-router-dom";
import "../assets/css/style4.css";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    cumpleanos: "",
    region: "",
    comuna: "",
    direccion: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  // --- VALIDACIONES ---
  const validate = () => {
    let newErrors = {};

    if (!/^[0-9]{7,8}-?[0-9kK]{1}$/.test(formData.rut))
      newErrors.rut = "RUT inválido.";
    if (!formData.nombre.trim()) newErrors.nombre = "Ingresa tu nombre.";
    if (!formData.apellido.trim()) newErrors.apellido = "Ingresa tu apellido.";
    if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Correo inválido.";
    if (!/^\d{8,9}$/.test(formData.telefono))
      newErrors.telefono = "Teléfono inválido.";
    if (!formData.cumpleanos) newErrors.cumpleanos = "Selecciona tu fecha.";
    if (!formData.region) newErrors.region = "Selecciona tu región.";
    if (!formData.comuna) newErrors.comuna = "Selecciona tu comuna.";
    if (!formData.direccion.trim()) newErrors.direccion = "Ingresa tu dirección.";
    if (formData.password.length < 6)
      newErrors.password = "Debe tener al menos 6 caracteres.";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Las contraseñas no coinciden.";

    return newErrors;
  };

  // --- ACTUALIZA CAMPOS ---
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  // --- ENVÍO DEL FORMULARIO ---
  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    try {
      addUser(formData);
      setMensaje("✅ ¡Cuenta creada con éxito! Serás redirigido al inicio de sesión 💜");

      // Limpia formulario
      setFormData({
        rut: "",
        nombre: "",
        apellido: "",
        email: "",
        telefono: "",
        cumpleanos: "",
        region: "",
        comuna: "",
        direccion: "",
        password: "",
        confirmPassword: "",
      });
      setErrors({});

      // Redirige al login después de 3 segundos
      setTimeout(() => {
        setMensaje("");
        navigate("/login");
      }, 3000);
    } catch (err) {
      setMensaje(err.message);
      setTimeout(() => setMensaje(""), 4000);
    }
  };

  return (
    <>
        {/* ✅ Toast visible en pantalla */}
        {mensaje && (
            <div
                className={`toast ${
                    mensaje.includes("éxito") ? "toast-success" : "toast-error"
                }`}
            >
                {mensaje}
            </div>
        )}


      <form id="registerForm" onSubmit={handleSubmit} noValidate>
        {[
          { name: "rut", icon: "bi-person-badge-fill", placeholder: "RUT (sin puntos ni guion)" },
          { name: "nombre", icon: "bi-person-fill", placeholder: "Nombre" },
          { name: "apellido", icon: "bi-person-fill", placeholder: "Apellido" },
          { name: "email", icon: "bi-envelope-at-fill", placeholder: "Correo electrónico" },
          { name: "telefono", icon: "bi-telephone-fill", placeholder: "Teléfono" },
          { name: "cumpleanos", icon: "bi-calendar-fill", type: "date", placeholder: "" },
          { name: "direccion", icon: "bi-house-fill", placeholder: "Dirección" },
          { name: "password", icon: "bi-lock-fill", placeholder: "Contraseña", type: "password" },
          { name: "confirmPassword", icon: "bi-lock-fill", placeholder: "Confirmar contraseña", type: "password" },
        ].map(({ name, icon, type = "text", placeholder }) => (
          <div className="input-container" key={name}>
            <i className={`bi ${icon}`}></i>
            <input
              type={type}
              id={name}
              name={name}
              placeholder={placeholder}
              value={formData[name]}
              onChange={handleChange}
            />
            <span className="error-message">{errors[name]}</span>
          </div>
        ))}

        {/* Región */}
        <div className="input-container select-container">
          <i className="bi bi-geo-alt-fill"></i>
          <select name="region" value={formData.region} onChange={handleChange}>
            <option value="">Selecciona tu región</option>
            {regiones.map((r) => (
              <option key={r.name} value={r.name}>
                {r.name}
              </option>
            ))}
          </select>
          <span className="error-message">{errors.region}</span>
        </div>

        {/* Comuna */}
        <div className="input-container select-container">
          <i className="bi bi-geo-fill"></i>
          <select name="comuna" value={formData.comuna} onChange={handleChange}>
            <option value="">Selecciona tu comuna</option>
            {(comunas[formData.region] || []).map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
          <span className="error-message">{errors.comuna}</span>
        </div>

        <button type="submit" className="btn-crear">Crear Cuenta</button>

        <p className="login-text">
          ¿Ya tienes una cuenta?{" "}
          <a href="/login" style={{ color: "#b48ead" }}>Puedes ingresar aquí</a>
        </p>
      </form>
    </>
  );
}
