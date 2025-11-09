import React, { useEffect, useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";

const ORDER_DRAFT_KEY = "nf_order_draft";
const ENVIO_BASE = 3490;
const UMBRAL_RM_FREE = 24990;
const RM_NAME = "Región Metropolitana de Santiago";

const toCLP = (n) => (n || 0).toLocaleString("es-CL", { style: "currency", currency: "CLP" });

export default function PagoPage() {
  const navigate = useNavigate();
  const [draft, setDraft] = useState(null);

  useEffect(() => {
    try {
      const d = JSON.parse(sessionStorage.getItem(ORDER_DRAFT_KEY) || "null");
      if (!d) {
        alert("No hay un pedido en curso. Te llevamos al carrito.");
        navigate("/carrito");
      } else {
        setDraft(d);
      }
    } catch {
      navigate("/carrito");
    }
  }, [navigate]);

  const subtotal = useMemo(() => {
    // Si tus items no traen precio aquí, esto puede dar 0. No pasa nada:
    // el total final lo puedes recalcular en la boleta con tu catálogo.
    return draft?.resumen?.subtotal || 0;
  }, [draft]);

  // Tipo de envío: retiro o delivery (solo RM)
  const [envioTipo, setEnvioTipo] = useState("retiro"); // "retiro" | "delivery"

  // Método de pago
  const [pago, setPago] = useState("webpay"); // "webpay" | "transferencia" | "efectivo"

  if (!draft) return null;

  const esRM = draft.buyer?.region === RM_NAME;

  const costoEnvio = envioTipo === "retiro"
    ? 0
    : esRM
      ? (subtotal >= UMBRAL_RM_FREE ? 0 : ENVIO_BASE)
      : 0; // por seguridad, pero no mostraríamos delivery fuera de RM

  const total = subtotal + costoEnvio;

  const efectivoDisponible = esRM && envioTipo === "delivery";

  // si eligen efectivo sin cumplir condiciones, forzamos a webpay
  useEffect(() => {
    if (pago === "efectivo" && !efectivoDisponible) {
      setPago("webpay");
    }
  }, [pago, efectivoDisponible]);

  function confirmarPago() {
    // Validaciones simples
    if (envioTipo === "delivery" && !esRM) {
      alert("Delivery solo disponible en Región Metropolitana.");
      return;
    }
    if (pago === "efectivo" && !efectivoDisponible) {
      alert("El pago en efectivo solo aplica para Delivery en RM.");
      return;
    }

    // Guardar lo necesario para la boleta
    const ordenFinal = {
      ...draft,
      envio: {
        tipo: envioTipo, // retiro | delivery
        costo: costoEnvio,
      },
      pago: {
        metodo: pago, // webpay | transferencia | efectivo
      },
      resumen: {
        subtotal,
        envio: costoEnvio,
        total,
      },
      fechaConfirmacion: Date.now(),
    };

    try {
      sessionStorage.setItem(ORDER_DRAFT_KEY, JSON.stringify(ordenFinal));
    } catch {}

    // Aquí “simulamos” el pago. Si quieres, podrías
    // condicionar el flujo por método.
    navigate("/boleta");
  }

  return (
    <main style={{ width: "min(1100px,95%)", margin: "28px auto" }}>
      <h1 style={{ color: "#fff", marginBottom: 12 }}>Pago y Envío</h1>

      <section style={card}>
        <h3 style={h3}>Resumen del comprador</h3>
        <div style={{ color: "#3a2a63" }}>
          <div><strong>{draft.buyer?.nombre} {draft.buyer?.apellido}</strong></div>
          <div>{draft.buyer?.email}{draft.buyer?.telefono ? ` · ${draft.buyer.telefono}` : ""}</div>
          <div>{draft.buyer?.rut}</div>
          <div>
            {draft.buyer?.calle} {draft.buyer?.numero}
            {draft.buyer?.depto ? `, ${draft.buyer.depto}` : ""} · {draft.buyer?.comuna}
          </div>
          <div>{draft.buyer?.region}</div>
          {draft.buyer?.indicaciones && <div>Indicaciones: {draft.buyer.indicaciones}</div>}
        </div>

        <hr style={hr} />

        <h3 style={h3}>Método de envío</h3>
        <div style={row}>
          <label style={radioLabel}>
            <input
              type="radio"
              checked={envioTipo === "retiro"}
              onChange={() => setEnvioTipo("retiro")}
            />
            <span>Retiro en tienda (Gratis)</span>
          </label>

          <label style={radioLabel}>
            <input
              type="radio"
              checked={envioTipo === "delivery"}
              onChange={() => setEnvioTipo("delivery")}
              disabled={!esRM}
            />
            <span>
              Delivery (solo RM){esRM ? (subtotal >= UMBRAL_RM_FREE ? " · Envío GRATIS" : ` · Costo ${toCLP(ENVIO_BASE)}`) : " · No disponible fuera de RM"}
            </span>
          </label>
        </div>

        <hr style={hr} />

        <h3 style={h3}>Método de pago</h3>
        <div style={row}>
          <label style={radioLabel}>
            <input
              type="radio"
              name="mp"
              checked={pago === "webpay"}
              onChange={() => setPago("webpay")}
            />
            <span>Webpay</span>
          </label>
          <label style={radioLabel}>
            <input
              type="radio"
              name="mp"
              checked={pago === "transferencia"}
              onChange={() => setPago("transferencia")}
            />
            <span>Transferencia</span>
          </label>
          <label style={radioLabel}>
            <input
              type="radio"
              name="mp"
              checked={pago === "efectivo"}
              onChange={() => setPago("efectivo")}
              disabled={!efectivoDisponible}
            />
            <span>Efectivo (solo Delivery en RM)</span>
          </label>
        </div>

        <hr style={hr} />

        <div style={{ display: "grid", gap: 6 }}>
          <div style={linea}><span>Subtotal</span><strong>{toCLP(subtotal)}</strong></div>
          <div style={linea}><span>Envío</span><strong>{costoEnvio === 0 ? "Gratis" : toCLP(costoEnvio)}</strong></div>
          <div style={{ ...linea, fontSize: "1.1rem" }}>
            <span>Total</span><strong>{toCLP(total)}</strong>
          </div>
        </div>

        <div style={{ display: "flex", gap: 10, marginTop: 16 }}>
          <button onClick={confirmarPago} style={btnPrimary}>Confirmar y pagar</button>
          <Link to="/checkout" style={btnGhost}>Volver</Link>
        </div>
      </section>
    </main>
  );
}

/* estilos mínimos */
const card = { background: "#fff", border: "1px solid #eee9ff", borderRadius: 14, padding: 16 };
const hr = { border: 0, borderTop: "1px solid #eee9ff", margin: "12px 0" };
const h3 = { color: "#3a2a63", margin: "6px 0 8px" };
const row = { display: "flex", flexDirection: "column", gap: 8 };
const radioLabel = { display: "flex", alignItems: "center", gap: 8, color: "#3a2a63" };
const linea = { display: "flex", justifyContent: "space-between", color: "#3a2a63" };
const btnPrimary = {
  background: "linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
  color: "#fff", border: 0, borderRadius: 12, padding: "10px 14px", fontWeight: 900,
  boxShadow: "0 8px 18px rgba(124,58,237,.25)", cursor: "pointer"
};
const btnGhost = { border: "1px solid #eee9ff", borderRadius: 12, padding: "10px 14px", color: "#3a2a63", fontWeight: 700, textDecoration: "none" };
