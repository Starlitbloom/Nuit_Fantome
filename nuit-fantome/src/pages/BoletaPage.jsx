// src/pages/BoletaPage.jsx
import React, { useMemo } from "react";
import { Link, useParams } from "react-router-dom";

/* ===== Claves de almacenamiento ===== */
const ORDERS_KEY     = "nf_orders";
const LAST_ORDER_KEY = "nf_last_order";
const ORDER_DRAFT    = "nf_order_draft";

/* ===== Helpers ===== */
const toCLP = (n) => (Number(n) || 0).toLocaleString("es-CL", { style:"currency", currency:"CLP" });

// Normaliza rutas: "assets/..." -> "/assets/..." para que funcionen en /boleta/:id
const fixSrc = (s) => {
  if (!s) return "/assets/img/placeholder.jpg";
  if (s.startsWith("assets/")) return "/" + s;
  if (s.startsWith("./assets/")) return s.slice(1);
  return s;
};

// Logo de la tienda (pon el archivo en public/assets/img/)
const LOGO = "/assets/img/logo.png";

function readOrders(){ try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {}; } catch { return {}; } }
function readJSON(key){ try { return JSON.parse(localStorage.getItem(key) || "null"); } catch { return null; } }

/** Normaliza cualquier forma de “order” a un modelo común para la vista */
function normalizeOrder(orderRaw) {
  if (!orderRaw) return null;

  // ---------- Forma A: { buyer, envio, pago, resumen, items, numPedido?, fecha? } ----------
  if (orderRaw.buyer && orderRaw.resumen) {
    const { buyer, envio = {}, pago = {}, resumen = {}, items = [], numPedido, fecha } = orderRaw;

    const buyerBlock = {
      nombre: buyer.nombre || "", apellido: buyer.apellido || "", rut: buyer.rut || "",
      email: buyer.email || "", telefono: buyer.telefono || "", region: buyer.region || "",
      comuna: buyer.comuna || "", calle: buyer.calle || "", numero: buyer.numero || "",
      depto: buyer.depto || "", indicaciones: buyer.indicaciones || ""
    };

    const envioBlock = { tipo: envio.tipo || "retira", carrier: envio.carrier || null };
    const pagoBlock  = { metodo: pago.metodo || "—", comprobante: pago.comprobante || null };
    const totales    = { subtotal: resumen.subtotal || 0, envio: resumen.envio || 0, total: resumen.total || 0 };

    const itemsNorm = (items || []).map(it => ({
      id: it.id,
      nombre: it.nombre || it.id || "Producto",
      categoria: it.categoria,
      img: it.img || "/assets/img/placeholder.jpg",
      precio: Number(it.precio) || 0,
      qty: Number(it.qty || 1),
      opt: it.opt
    }));

    return {
      id: orderRaw.id || numPedido || "",
      fecha: fecha || new Date().toISOString(),
      buyer: buyerBlock,
      envio: envioBlock,
      pago: pagoBlock,
      resumen: totales,
      items: itemsNorm
    };
  }

  // ---------- Forma B (desde CarritoPage): { form, shipping, totales, items } ----------
  if (orderRaw.form && orderRaw.totales) {
    const { form, shipping = {}, totales = {}, items = [], id, fecha } = orderRaw;

    const buyerBlock = {
      nombre: form.nombre || "", apellido: form.apellido || "", rut: form.rut || "",
      email: form.email || "", telefono: form.telefono || "", region: form.region || "",
      comuna: form.comuna || "", calle: form.calle || "", numero: form.numero || "",
      depto: form.depto || "", indicaciones: form.notas || ""
    };

    // Mapeo de métodos nuevos del carrito
    // shipping.method: 'retira' | 'delivery_rm' | 'starken' | 'chilexpress' | 'correos'
    let envioTipo = "retira";
    let carrier = null;
    if (shipping.method === "delivery_rm") envioTipo = "delivery";
    if (["starken","chilexpress","correos"].includes(shipping.method)) {
      envioTipo = "courier";
      carrier = shipping.method; // guardamos el nombre del courier
    }

    const envioBlock   = { tipo: envioTipo, carrier };
    const pagoBlock    = { metodo: shipping.payment || "—", comprobante: shipping.transferReceipt || null };
    const totalesBlock = { subtotal: totales.subtotal || 0, envio: totales.envio || 0, total: totales.total || 0 };

    const itemsNorm = (items || []).map(it => ({
      id: it.id,
      nombre: it.nombre || it.id || "Producto",
      categoria: it.categoria,
      img: it.img || "/assets/img/placeholder.jpg",
      precio: Number(it.precio) || 0,
      qty: Number(it.qty || it.cantidad || 1),
      opt: it.opt
    }));

    return {
      id: id || "",
      fecha: fecha || new Date().toISOString(),
      buyer: buyerBlock,
      envio: envioBlock,
      pago: pagoBlock,
      resumen: totalesBlock,
      items: itemsNorm
    };
  }

  return null;
}

export default function BoletaPage(){
  const { id } = useParams();

  const order = useMemo(() => {
    let raw = null;
    if (id) {
      const all = readOrders();
      raw = all[id] || null;
    }
    if (!raw) raw = readJSON(LAST_ORDER_KEY);
    if (!raw) raw = readJSON(ORDER_DRAFT);
    return normalizeOrder(raw);
  }, [id]);

  if (!order || !order.buyer || !order.resumen) {
    return (
      <main style={{ width: "min(900px,95%)", margin: "28px auto" }}>
        <div style={card}>
          <h2 style={{ marginTop: 0 }}>No hay boleta para mostrar</h2>
          <p>Primero completa el proceso de compra.</p>
          <Link to="/carrito" style={btnPrimary}>Ir al carrito</Link>
        </div>
      </main>
    );
  }

  const { buyer, resumen, items } = order;

  // Etiquetas amigables para métodos de pago
  const etiquetasPago = {
    webpay: "Tarjeta (Webpay)",
    mercadopago: "Mercado Pago",
    khipu: "Khipu",
    paypal: "PayPal",
    transferencia: "Transferencia",
    efectivo: "Efectivo",
    "—": "—"
  };

  const isPDF = (data) => typeof data === "string" && data.startsWith("data:application/pdf");
  const isIMG = (data) => typeof data === "string" && data.startsWith("data:image/");

  // Etiqueta de envío/courier
  const etiquetaEnvio = (() => {
    if (order.envio?.tipo === "delivery") return "Delivery (solo RM)";
    if (order.envio?.tipo === "courier") {
      const carriers = { starken: "Starken", chilexpress: "Chilexpress", correos: "Correos de Chile" };
      return `Courier — ${carriers[order.envio?.carrier] || order.envio?.carrier || "Despacho"}`;
    }
    return "Retiro en tienda";
  })();

  return (
    <main style={{ width: "min(900px,95%)", margin: "28px auto" }}>
      <section style={card}>

        {/* Encabezado con logo y timbre */}
        <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center", gap:12 }}>
          <div style={{ display:"flex", alignItems:"center", gap:12 }}>
            <img
              src={fixSrc(LOGO)}
              alt="Nuit Fantôme"
              onError={(e)=>{ e.currentTarget.style.display="none"; }}
              style={{ height:46 }}
            />
            <div>
              <h1 style={{ margin:"0 0 4px", color:"#3a2a63" }}>Boleta electrónica</h1>
              <div style={{ color:"#6b5aa6", fontWeight:700 }}>
                N° {order.id || "—"} • {new Date(order.fecha).toLocaleString("es-CL")}
              </div>
            </div>
          </div>
          <img
            src={fixSrc("assets/img/timbre_pagado.png")}
            alt="Pagado"
            onError={(e)=>{ e.currentTarget.style.display="none"; }}
            style={{ width:110, opacity:0.85 }}
          />
        </div>

        <hr style={hr} />

        {/* Datos del comprador / entrega */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={box}>
            <h3 style={h3}>Datos del comprador</h3>
            <Row k="Nombre" v={`${buyer.nombre || ""} ${buyer.apellido || ""}`.trim() || "—"} />
            <Row k="RUT" v={buyer.rut || "—"} />
            <Row k="Correo" v={buyer.email || "—"} />
            {buyer.telefono && <Row k="Teléfono" v={buyer.telefono} />}
          </div>

          <div style={box}>
            <h3 style={h3}>Dirección de entrega</h3>
            <Row k="Región" v={buyer.region || "—"} />
            {buyer.comuna && <Row k="Comuna" v={buyer.comuna} />}
            <Row
              k="Dirección"
              v={[
                buyer.calle || "",
                buyer.numero || "",
                buyer.depto ? `Dpto/Casa ${buyer.depto}` : "",
              ].filter(Boolean).join(", ") || "—"}
            />
            {buyer.indicaciones && <Row k="Indicaciones" v={buyer.indicaciones} />}
          </div>
        </div>

        <hr style={hr} />

        {/* Detalle de productos */}
        <h3 style={h3}>Detalle de compra</h3>
        <div style={{ overflowX:"auto" }}>
          <table style={table}>
            <thead>
              <tr>
                <th style={thLeft}>Producto</th>
                <th>Cant.</th>
                <th>Precio</th>
                <th>Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {(!items || items.length===0) && (
                <tr><td colSpan={4} style={{ textAlign:"center", padding:14, color:"#666" }}>No se encontraron ítems.</td></tr>
              )}
              {items && items.map((it,i)=>(
                <tr key={`${it.id || i}-${it.opt || ""}`}>
                  <td style={{ textAlign:"left" }}>
                    <div style={{ display:"flex", alignItems:"center", gap:10 }}>
                      <img
                        src={fixSrc(it.img)}
                        alt={it.nombre}
                        onError={(e)=>{ e.currentTarget.src="/assets/img/placeholder.jpg"; }}
                        style={{ width:44, height:44, objectFit:"cover", borderRadius:8, border:"1px solid #eee9ff" }}
                      />
                      <div>
                        <div style={{ fontWeight:800, color:"#3a2a63" }}>
                          {it.nombre || it.id || "Producto"}{it.opt ? ` • ${it.opt}` : ""}
                        </div>
                        {it.categoria && <div style={{ fontSize:".85rem", color:"#6b5aa6" }}>{it.categoria}</div>}
                      </div>
                    </div>
                  </td>
                  <td style={tdCenter}>{it.qty || 1}</td>
                  <td style={tdCenter}>{toCLP(it.precio)}</td>
                  <td style={tdRight}>{toCLP((it.precio || 0) * (it.qty || 1))}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totales */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 280px", gap:16, marginTop:10 }}>
          <div />
          <div style={totalsBox}>
            <Row k="Subtotal" v={toCLP(resumen.subtotal)} />
            <Row k="Envío" v={resumen.envio === 0 ? "Gratis" : toCLP(resumen.envio)} />
            <div style={{ ...row, fontSize:"1.05rem", borderTop:"1px solid #f1edff", paddingTop:8 }}>
              <span>Total</span>
              <strong>{toCLP(resumen.total)}</strong>
            </div>
          </div>
        </div>

        <hr style={hr} />

        {/* Envío / Pago */}
        <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:16 }}>
          <div style={box}>
            <h3 style={h3}>Envío</h3>
            <Row k="Tipo" v={etiquetaEnvio} />
          </div>
          <div style={box}>
            <h3 style={h3}>Pago</h3>
            <Row k="Método" v={etiquetasPago[order.pago?.metodo] || "—"} />

            {/* Comprobante si es transferencia */}
            {order.pago?.metodo === "transferencia" && order.pago?.comprobante?.data && (
              <div style={{ marginTop:8 }}>
                <div style={{ fontSize:".9rem", color:"#6b5aa6", marginBottom:6 }}>Comprobante adjunto:</div>
                {isIMG(order.pago.comprobante.data) ? (
                  <a href={order.pago.comprobante.data}
                     download={order.pago.comprobante.name || "comprobante.jpg"}
                     title="Descargar comprobante">
                    <img
                      src={order.pago.comprobante.data}
                      alt="Comprobante transferencia"
                      style={{ maxWidth:180, borderRadius:8, border:"1px solid #eee9ff" }}
                    />
                  </a>
                ) : isPDF(order.pago.comprobante.data) ? (
                  <a href={order.pago.comprobante.data}
                     download={order.pago.comprobante.name || "comprobante.pdf"}
                     style={btnGhost}>
                    Descargar PDF
                  </a>
                ) : null}
              </div>
            )}
          </div>
        </div>

        {/* Acciones */}
        <div style={{ display:"flex", gap:10, marginTop:16 }}>
          <button onClick={()=>window.print()} style={btnPrimary}>Imprimir</button>
          <Link to="/" style={btnGhost}>Volver al inicio</Link>
        </div>
      </section>
    </main>
  );
}

/* ---------- Componentes auxiliares ---------- */
function Row({ k, v }) {
  return (
    <div style={row}>
      <span>{k}</span>
      <strong style={{ textAlign:"right" }}>{v}</strong>
    </div>
  );
}

/* ---------- Estilos inline simples ---------- */
const card = { background:"#fff", border:"1px solid #eee9ff", borderRadius:14, padding:16 };
const hr   = { border:0, borderTop:"1px solid #f1edff", margin:"14px 0" };
const h3   = { margin:"0 0 8px", color:"#3a2a63" };
const box  = { background:"#faf8ff", border:"1px solid #eee9ff", borderRadius:12, padding:12 };
const row  = { display:"flex", justifyContent:"space-between", margin:"6px 0", gap:12 };
const totalsBox = { background:"#faf8ff", border:"1px solid #eee9ff", borderRadius:12, padding:12 };

const table = {
  width:"100%",
  borderCollapse:"collapse",
  border:"1px solid #eee9ff",
  borderRadius:12,
  overflow:"hidden",
};
const thLeft   = { textAlign:"left", padding:10, background:"#f7f4ff", color:"#3a2a63" };
const tdCenter = { textAlign:"center", padding:10 };
const tdRight  = { textAlign:"right", padding:10 };

const btnPrimary = {
  background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
  color:"#fff", border:0, borderRadius:12, padding:"10px 14px",
  fontWeight:900, boxShadow:"0 8px 18px rgba(124,58,237,.25)", cursor:"pointer",
  textDecoration:"none", display:"inline-block"
};
const btnGhost = {
  border:"1px solid #eee9ff", borderRadius:12, padding:"10px 14px",
  color:"#3a2a63", fontWeight:700, textDecoration:"none"
};
