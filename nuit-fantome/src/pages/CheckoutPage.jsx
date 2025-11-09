// src/pages/CheckoutPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { formatRut, validateRut } from "../utils/rut";

// === claves ===
const CART_KEY = "nf_cart";
const ORDER_DRAFT_KEY = "nf_order_draft";

// Región + comunas (ejemplo RM; agrega más si quieres)
const REGIONES = [
  "Región Metropolitana de Santiago",
  "Valparaíso",
  "Biobío",
  "Maule",
];
const COMUNAS_RM = [
  "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba",
  "Independencia","La Cisterna","La Florida","La Granja","La Pintana","La Reina",
  "Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú","Ñuñoa",
  "Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal",
  "Recoleta","Renca","San Joaquín","San Miguel","San Ramón","Santiago","Vitacura"
];

const toCLP = (n) => (n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

function loadCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY) || "[]"); } catch { return []; }
}

export default function CheckoutPage() {
  const navigate = useNavigate();
  const cart = useMemo(() => loadCart(), []);
  const subtotal = useMemo(
    () => cart.reduce((a, b) => a + (b.precio || 0) * (b.qty || 1), 0),
    [cart]
  );

  // datos del comprador
  const [form, setForm] = useState({
    nombre: "",
    apellido: "",
    email: "",
    telefono: "",
    rut: "",
    region: "Región Metropolitana de Santiago",
    comuna: "",
    calle: "",
    numero: "",
    depto: "",
    indicaciones: ""
  });

  // poblar si venimos de back
  useEffect(() => {
    try {
      const prev = JSON.parse(sessionStorage.getItem(ORDER_DRAFT_KEY) || "{}");
      if (prev?.buyer) setForm((f) => ({ ...f, ...prev.buyer }));
    } catch {}
  }, []);

  function setField(k, v) {
    setForm((s) => ({ ...s, [k]: k === "rut" ? formatRut(v) : v }));
  }

  function validar() {
    if (!form.nombre.trim()) return "Ingresa tu nombre.";
    if (!form.apellido.trim()) return "Ingresa tu apellido.";
    if (!form.email.trim() || !/\S+@\S+\.\S+/.test(form.email)) return "Correo inválido.";
    if (!validateRut(form.rut)) return "RUT inválido.";
    if (!form.calle.trim()) return "Ingresa tu calle.";
    if (form.region === "Región Metropolitana de Santiago" && !form.comuna) return "Selecciona comuna.";
    return "";
  }

  function confirmar() {
    const err = validar();
    if (err) { alert(err); return; }
    // Guardar borrador de orden
    const draft = {
      fecha: Date.now(),
      buyer: form,
      items: cart,            // guardo items para boleta
      resumen: { subtotal }   // el envío/total se fijan en /pago
    };
    try { sessionStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(draft)); } catch {}
    navigate("/pago");
  }

  return (
    <main style={{ width: "min(1100px,95%)", margin: "28px auto" }}>
      <h1 style={{ color: "#fff", marginBottom: 12 }}>Datos del comprador y entrega</h1>

      <section style={card}>
        {/* fila 1 */}
        <div style={grid2}>
          <Field label="Nombre" value={form.nombre} onChange={(v) => setField("nombre", v)} />
          <Field label="Apellido" value={form.apellido} onChange={(v) => setField("apellido", v)} />
        </div>

        {/* fila 2 */}
        <div style={grid2}>
          <Field label="Correo electrónico" value={form.email} onChange={(v) => setField("email", v)} placeholder="tucorreo@dominio.cl" />
          <Field label="Teléfono (opcional)" value={form.telefono} onChange={(v) => setField("telefono", v)} placeholder="+56 9 1234 5678" />
        </div>

        {/* fila 3 */}
        <div style={grid2}>
          <Field label="RUT" value={form.rut} onChange={(v) => setField("rut", v)} placeholder="12.345.678-9" />
          <Select
            label="Comuna"
            value={form.comuna}
            onChange={(v) => setField("comuna", v)}
            disabled={form.region !== "Región Metropolitana de Santiago"}
            options={["", ...COMUNAS_RM]}
            placeholder="Selecciona comuna…"
          />
        </div>

        {/* fila 4 */}
        <div style={grid2}>
          <Field label="Calle" value={form.calle} onChange={(v) => setField("calle", v)} />
          <Field label="Número" value={form.numero} onChange={(v) => setField("numero", v)} />
        </div>

        {/* fila 5 */}
        <div style={grid2}>
          <Select label="Región" value={form.region} onChange={(v) => setField("region", v)} options={REGIONES} />
          <Field label="Depto / Casa (opcional)" value={form.depto} onChange={(v) => setField("depto", v)} />
        </div>

        {/* fila 6 */}
        <Field
          label="Indicaciones para el reparto (opcional)"
          value={form.indicaciones}
          onChange={(v) => setField("indicaciones", v)}
          placeholder="Ej: dejar en conserjería si no estoy"
        />

        <div style={{ marginTop: 14, color: "#6b5aa6", fontWeight: 700 }}>
          En RM el envío es GRATIS desde {toCLP(24990)} (se calcula en la siguiente pantalla).
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={confirmar} style={btnPrimary}>Confirmar pedido</button>
          <Link to="/carrito" style={btnGhost}>Volver</Link>
        </div>
      </section>
    </main>
  );
}

/* ---------- Inputs simples ---------- */
function Field({ label, value, onChange, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div style={lab}>{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder || ""}
        style={input}
      />
    </label>
  );
}
function Select({ label, value, onChange, options = [], disabled, placeholder }) {
  return (
    <label style={{ display: "block" }}>
      <div style={lab}>{label}</div>
      <select value={value} onChange={(e) => onChange(e.target.value)} disabled={disabled} style={input}>
        {placeholder !== undefined && <option value="">{placeholder}</option>}
        {options.map((o, i) => <option key={i} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

/* ---------- estilos ---------- */
const card = { background: "#fff", border: "1px solid #eee9ff", borderRadius: 14, padding: 16 };
const grid2 = { display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 };
const lab = { marginBottom: 6, color: "#6b5aa6", fontWeight: 700 };
const input = { width: "100%", padding: "10px 12px", border: "1px solid #eee9ff", borderRadius: 10, outline: "none" };
const btnPrimary = {
  background: "linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
  color: "#fff", border: 0, borderRadius: 12, padding: "10px 14px", fontWeight: 900,
  boxShadow: "0 8px 18px rgba(124,58,237,.25)", cursor: "pointer"
};
const btnGhost = { border: "1px solid #eee9ff", borderRadius: 12, padding: "10px 14px", color: "#3a2a63", fontWeight: 700, textDecoration: "none" };
