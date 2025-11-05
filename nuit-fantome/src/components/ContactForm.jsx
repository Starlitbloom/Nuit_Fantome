import { useState, useEffect } from "react";
import "../assets/css/style2.css";

const ContactForm = () => {
  const [asunto, setAsunto] = useState("");
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [showToast, setShowToast] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validate = () => {
    let newErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!asunto) newErrors.asunto = "Por favor selecciona un asunto";
    if (formData.pedido !== undefined && !formData.pedido?.trim())
      newErrors.pedido = "Por favor ingresa un número de pedido";
    if (formData.ticket !== undefined && !formData.ticket?.trim())
      newErrors.ticket = "Por favor ingresa un número de ticket";
    if (formData.producto !== undefined && !formData.producto?.trim())
      newErrors.producto = "Por favor ingresa el producto";
    if (formData.comentario !== undefined && !formData.comentario?.trim())
      newErrors.comentario = "Por favor ingresa tu comentario";
    if (!formData.correo || !emailRegex.test(formData.correo))
      newErrors.correo = "Por favor ingresa un correo válido";
    if (!formData.mensaje?.trim())
      newErrors.mensaje = "Por favor ingresa un mensaje";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setFormData({});
      setAsunto("");
      setErrors({});
      setShowToast(true); // 🔸 Muestra el toast
    }
  };

  // 🔸 Oculta el toast automáticamente después de 3 segundos
  useEffect(() => {
    if (showToast) {
      const timer = setTimeout(() => setShowToast(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [showToast]);

  const renderDynamicFields = () => {
    switch (asunto) {
      case "estado":
        return (
          <Campo
            id="pedido"
            label="N° de pedido (950000XXXXX)"
            value={formData.pedido || ""}
            onChange={handleChange}
            error={errors.pedido}
            placeholder="Ingrese su número de pedido"
          />
        );
      case "cambio":
        return (
          <>
            <Campo
              id="ticket"
              label="Ticket de compra"
              value={formData.ticket || ""}
              onChange={handleChange}
              error={errors.ticket}
              placeholder="Ingrese su número de ticket"
            />
            <Campo
              id="producto"
              label="Producto a cambiar"
              value={formData.producto || ""}
              onChange={handleChange}
              error={errors.producto}
              placeholder="Ingrese el nombre del producto"
            />
          </>
        );
      case "devolucion":
      case "cancelar":
        return (
          <Campo
            id="ticket"
            label="Ticket de compra"
            value={formData.ticket || ""}
            onChange={handleChange}
            error={errors.ticket}
            placeholder="Ingrese su número de ticket"
          />
        );
      case "experiencia":
        return (
          <Campo
            id="comentario"
            label="Cuéntanos tu experiencia"
            value={formData.comentario || ""}
            onChange={handleChange}
            error={errors.comentario}
            placeholder="Escribe tu comentario"
          />
        );
      default:
        return null;
    }
  };

  return (
    <>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label htmlFor="asunto">Asunto</label>
        <select
          id="asunto"
          name="asunto"
          value={asunto}
          onChange={(e) => {
            setAsunto(e.target.value);
            setErrors({});
          }}
        >
          <option value="">Seleccione una opción</option>
          <option value="estado">Estado de mi pedido</option>
          <option value="cambio">Cambio de producto</option>
          <option value="devolucion">Devolución</option>
          <option value="cancelar">Cancelar pedido</option>
          <option value="experiencia">Experiencia de compra</option>
        </select>
        {errors.asunto && <div className="error-msg">{errors.asunto}</div>}

        {renderDynamicFields()}

        {asunto && (
          <>
            <Campo
              id="correo"
              label="Correo electrónico"
              type="email"
              value={formData.correo || ""}
              onChange={handleChange}
              error={errors.correo}
              placeholder="ejemplo@correo.com"
            />
            <Campo
              id="mensaje"
              label="Mensaje"
              value={formData.mensaje || ""}
              onChange={handleChange}
              error={errors.mensaje}
              placeholder="Escribe tu mensaje"
            />
          </>
        )}

        <div className="form-actions">
          <button type="submit" className="btn-enviar">
            Enviar
          </button>
        </div>
      </form>

      {/* 🔸 Toast flotante */}
      {showToast && (
        <div className="toast toast-success">
          Formulario enviado correctamente ✅
        </div>
      )}
    </>
  );
};

// Subcomponente de campo reutilizable
const Campo = ({ id, label, type = "text", value, onChange, placeholder, error }) => (
  <div className="field">
    <label htmlFor={id}>{label}</label>
    <input
      id={id}
      name={id}
      type={type}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
    {error && <div className="error-msg">{error}</div>}
  </div>
);

export default ContactForm;
