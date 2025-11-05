// src/pages/ProductosPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";

/* =======================
   Catálogo base (igual al HTML)
   ======================= */
let productosBase = [
  { id:"org01", categoria:"Organizadores", nombre:"Organizador de escritorio blanco", precio:12990, img:"assets/img/organizador.jpg.avif", desc:"Organizador metálico con cajón y compartimentos; ideal para notas, lápices y clips." },
  { id:"washi01", categoria:"Cintas / Washi", nombre:"Set 5 washi tape – colores mixtos", precio:3990, img:"assets/img/washi-mix5.jpg", desc:"Pack de 5 cintas washi de colores mixtos; papel de arroz, reposicionables, 15 mm x 5 m c/u." },
  { id:"calc01", categoria:"Calculadoras", nombre:"Calculadora compacta pastel", precio:6990, img:"assets/img/calculadora-pastel.jpg", desc:"Calculadora compacta con teclas suaves y diseño pastel; pantalla de 12 dígitos.",
    opciones:[{t:"Rosa"},{t:"Lila"},{t:"Celeste"},{t:"Verde"}] },
  { id:"washi02", categoria:"Cintas / Washi", nombre:"Washi tape ilustrada “Vida diaria”", precio:3490, img:"assets/img/washi-vida-diaria.jpg", desc:"Washi ilustrada temática de vida diaria; ideal para diarios y scrap, 15 mm x 5 m.",
    opciones:[{t:"Amarillo"},{t:"Rosa"},{t:"Verde"},{t:"Morado"}] },
  { id:"washi03", categoria:"Cintas / Washi", nombre:"Set de cintas washi – tonos pastel", precio:3990, img:"assets/img/washi-set-pastel.jpg", desc:"Set de cintas washi en tonos pastel; adhesivo suave sin residuos, perfecto para bullet journal.",
    opciones:[{t:"Pastel 1"},{t:"Pastel 2"},{t:"Pastel 3"},{t:"Pastel 4"}] },
  { id:"cut01", categoria:"Corte", nombre:"Cúter mini “Paw” (patas de gato)", precio:2990, img:"assets/img/cutter-paw.jpg", desc:"Cúter mini con tapa en forma de pata; hoja retráctil segura.",
    opciones:[{t:"Rosa"},{t:"Blanco"},{t:"Amarillo"},{t:"Celeste"}] },
  { id:"cua03", categoria:"Cuadernos & Libretas", nombre:"Cuaderno ilustrado A5 – Pinturas", precio:4990, img:"assets/img/cuaderno-pinturas.jpg", desc:"Cuaderno A5 con ilustraciones; 80 hojas lisas, papel 90 g, tapa dura.",
    opciones:[{t:"Lila"},{t:"Rosa"},{t:"Lavanda"}] },
  { id:"est01", categoria:"Estuches", nombre:"Estuche Sanrio (set 4) ", precio:8990, img:"assets/img/estuche-kuromi.jpg", desc:"Estuche Kuromi con compartimentos y cierre resistente.",
    opciones:[{t:"Cinnamoroll"},{t:"My Melody"},{t:"Kuromi"},{t:"Pompompurin"}] },
  { id:"est02", categoria:"Estuches", nombre:"Estuche Sanrio(set 6)", precio:8990, img:"assets/img/estuche-my-melody.jpg", desc:"Estuche My Melody con elásticos y bolsillo interno.",
    opciones:[{t:"My Melody"},{t:"Cinnamoroll"},{t:"Pompompurin"},{t:"Hello Kitty"},{t:"Gudetama"},{t:"Keroppi"}] },
  { id:"fab01", categoria:"Lápices de grafito", nombre:"Set lápices grafito Faber-Castell", precio:18990, img:"assets/img/faber-castell-set.jpg", desc:"Set de lápices de grafito Faber-Castell (HB–2B); incluye borrador y sacapuntas." },
  { id:"gom02", categoria:"Borradores", nombre:"Borrador eléctrico recargable", precio:11990, img:"assets/img/goma-electrica.jpg", desc:"Borrador eléctrico recargable por USB." },
  { id:"gom01", categoria:"Borradores", nombre:"Borradores degradé (pack 3)", precio:1990, img:"assets/img/gomas-de-colores.jpg", desc:"Pack de 3 gomas degradé libres de látex.",
    opciones:[{t:"Verde/Azul"},{t:"Rosa/Celeste"},{t:"Mix pastel"}] },
  { id:"lap10", categoria:"Lápices de colores", nombre:"Set lápices de colores – 10 unidades", precio:3990, img:"assets/img/lapices-10.jpg", desc:"Set de 10 lápices de color de mina suave." },
  { id:"lap25", categoria:"Lápices de colores", nombre:"Set lápices de colores – 25 unidades", precio:7990, img:"assets/img/lapices-25.jpg", desc:"Set de 25 lápices de color; minas resistentes." },
  { id:"lap30", categoria:"Lápices de colores", nombre:"Set lápices de colores – 30 unidades", precio:20000, img:"assets/img/lapices-30.jpg", desc:"Set de 30 lápices de color; incluye tonos piel y pasteles." },
  { id:"pinc01", categoria:"Pinceles / Acuarela", nombre:"Pinceles para acuarela (pack)", precio:8990, img:"assets/img/pinceles-acuarelas.jpg", desc:"Pack de pinceles para acuarela." },
  { id:"post01", categoria:"Notas adhesivas", nombre:"Notas adhesivas Cinnamoroll / Pompompurin", precio:2990, img:"assets/img/postit-cinnamoroll-pompompurin.jpg", desc:"Notas adhesivas oficiales Sanrio.",
    opciones:[{t:"Cinnamoroll"},{t:"Pompompurin"}] },
  { id:"post02", categoria:"Notas adhesivas", nombre:"Notas adhesivas Kuromi / My Melody", precio:2990, img:"assets/img/postit-kuromi-mymelody.jpg", desc:"Notas adhesivas con 3 diseños.",
    opciones:[{t:"Kuromi"},{t:"My Melody"}] },
  { id:"post03", categoria:"Notas adhesivas", nombre:"Notas adhesivas Pochacco / Hello Kitty", precio:2990, img:"assets/img/postit-pochacco-hellokitty.jpg", desc:"Notas adhesivas de colores suaves.",
    opciones:[{t:"Pochacco"},{t:"Hello Kitty"}] },
  { id:"saca01", categoria:"Sacapuntas", nombre:"Sacapuntas + borrador 2 en 1", precio:3490, img:"assets/img/sacapuntas-borrador.jpg", desc:"Sacapuntas con depósito y borrador integrado.",
    opciones:[{t:"Celeste"},{t:"Rosa"},{t:"Lila"},{t:"Verde"}] },
  { id:"bol01", categoria:"Bolígrafos", nombre:"Bolígrafos Sakura gel (pack)", precio:9990, img:"assets/img/sakura-boligrafos.jpg", desc:"Bolígrafos Sakura de tinta gel pigmentada." },
  { id:"set02", categoria:"Sets", nombre:"Set papelería “Gato Azul”", precio:10990, img:"assets/img/set-gato-azul.jpg", desc:"Set temático gato azul." },
  { id:"set01", categoria:"Sets", nombre:"Set papelería “Gato Rosado”", precio:10990, img:"assets/img/set-gato-rosado.jpg", desc:"Set temático gato rosado." },
  { id:"washi60", categoria:"Cintas / Washi", nombre:"Set 60 washi tapes", precio:16990, img:"assets/img/set60-cintas.jpg", desc:"Mega set de 60 washi tapes." },
  { id:"clip01", categoria:"Clips / Accesorios", nombre:"Clips decorativos “Click” (pack)", precio:2990, img:"assets/img/set-de-click.jpg", desc:"Pack de clips decorativos tipo botón.",
    opciones:[{t:"Lila"},{t:"Menta"},{t:"Celeste"}] },
  { id:"tij01", categoria:"Tijeras", nombre:"Tijeras My Melody", precio:6990, img:"assets/img/tijeras-my-melody.jpg", desc:"Tijeras con funda, filo inoxidable y agarre cómodo.",
    opciones:[{t:"Lila"},{t:"Rosa"},{t:"Celeste"}] },
  { id:"washi04", categoria:"Cintas / Washi", nombre:"Washi tape de flores vintage", precio:3490, img:"assets/img/washi-tape-flores.jpg", desc:"Washi tape de flores estilo vintage.",
    opciones:[{t:"Morado"},{t:"Rosa"},{t:"Dorado"}] },
  // Digitales
  { id:"todo-hk", categoria:"Planners / To-Do", nombre:"To do list — Hello Kitty", precio:1990, img:"assets/img/to-do-list-hello-kitty.jpg", desc:"To do list temático Hello Kitty." },
  { id:"todo-kuromi", categoria:"Planners / To-Do", nombre:"To do list — Kuromi", precio:1990, img:"assets/img/to-do-list-kuromi.jpg", desc:"To do list con diseño Kuromi." },
  { id:"todo-sailor", categoria:"Planners / To-Do", nombre:"To do list — Sailor Moon", precio:1990, img:"assets/img/to-do-list-sailor-moon.jpg", desc:"To do list Sailor Moon." },
  { id:"plan-hk", categoria:"Planners / To-Do", nombre:"Planner semanal — Hello Kitty", precio:2990, img:"assets/img/planner-semanal-hello-kitty.jpg", desc:"Planner semanal Hello Kitty." },
  { id:"plan-kuromi", categoria:"Planners / To-Do", nombre:"Planner semanal — Kuromi", precio:2990, img:"assets/img/planner-semanal-kuromi.jpg", desc:"Planner semanal Kuromi." },
  { id:"plan-sailor", categoria:"Planners / To-Do", nombre:"Planner semanal — Sailor Moon", precio:2990, img:"assets/img/planner-semanal-sailor-moon.jpg", desc:"Planner semanal Sailor Moon." }
];

/* ========= Merge con catálogo guardado en Admin ========= */
const CATALOG_KEY = "nf_catalog_custom_v1";
const deepClone = (o) => JSON.parse(JSON.stringify(o || {}));
const loadCustomArr = () => {
  try { return JSON.parse(localStorage.getItem(CATALOG_KEY) || "[]"); }
  catch { return []; }
};
const saveCustomArr = (arr) => {
  localStorage.setItem(CATALOG_KEY, JSON.stringify(arr));
};
function mergeCatalog() {
  const baseMap = new Map(productosBase.map(p => [p.id, p]));
  loadCustomArr().forEach(p => {
    const cp = { ...p };
    if (typeof cp.img === "string" && cp.img.startsWith("../")) {
      cp.img = cp.img.replace(/^\.\.\//, "");
    }
    baseMap.set(cp.id, cp);
  });
  return Array.from(baseMap.values());
}

/* ========= Stock compartido (mismas funciones del carrito) ========= */
function getUnifiedStockFor(id, optName) {
  const p = loadCustomArr().find(x => x.id === id);
  if (!p) return null;
  if (optName) {
    const o = (p.opciones || []).find(x => x.t === optName);
    if (o) {
      if (typeof o.s === "number") return o.s;
      if (typeof o.stock === "number") return o.stock;
    }
    return null;
  }
  if (typeof p.stock === "number") return p.stock;
  return null;
}
function persistStockChange(id, opt, delta) {
  const arr = loadCustomArr();
  let p = arr.find(x => x.id === id);
  if (!p) {
    const base = deepClone(productosBase.find(z => z.id === id)) || { id };
    p = { id, ...base };
    arr.push(p);
  }
  if (opt) {
    if (!Array.isArray(p.opciones)) p.opciones = [];
    let oo = p.opciones.find(o => o.t === opt);
    if (!oo) { oo = { t: opt, s: 0 }; p.opciones.push(oo); }
    oo.s = Math.max(0, Number(oo.s || 0) + delta);
  } else {
    p.stock = Math.max(0, Number(p.stock || 0) + delta);
  }
  saveCustomArr(arr);
}

/* ========= Carrito (misma llave/contador) ========= */
const CART_KEY = "nf_cart";
const toCLP = (n) => n.toLocaleString("es-CL", { style: "currency", currency: "CLP" });
const loadCart = () => { try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; } };
const saveCart = (c) => {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
  // actualiza burbuja del header (mismo id)
  const elTop = document.getElementById("contador");
  if (elTop) elTop.textContent = c.reduce((a, b) => a + (b.qty || 0), 0);
};

/* =======================
   Página de Productos
   ======================= */
export default function ProductosPage() {
  const productos = useMemo(() => mergeCatalog(), []);
  const [filtro, setFiltro] = useState("");
  const [selecciones, setSelecciones] = useState(() => ({})); // {prodId: {opt:"", qty:1}}

  useEffect(() => {
    // Inicializa selección por producto
    const init = {};
    productos.forEach(p => {
      init[p.id] = { opt: p.opciones?.[0]?.t || "", qty: 1 };
    });
    setSelecciones(init);

    // Sincroniza contador al entrar
    saveCart(loadCart());
  }, [productos]);

  // NEW: comportamiento del menú ACCEDER (igual al resto del sitio)
  useEffect(() => {
    const btn = document.querySelector(".btn-acceder");
    const dd = document.querySelector(".dropdown-content");
    if (!btn || !dd) return;

    const toggle = () => { dd.style.display = (dd.style.display === "block") ? "none" : "block"; };
    const closeOutside = (e) => {
      if (!e.target.matches(".btn-acceder") && dd.style.display === "block") dd.style.display = "none";
    };

    btn.addEventListener("click", toggle);
    window.addEventListener("click", closeOutside);
    return () => {
      btn.removeEventListener("click", toggle);
      window.removeEventListener("click", closeOutside);
    };
  }, []);

  function setQty(id, qty) {
    setSelecciones(s => ({ ...s, [id]: { ...(s[id] || {}), qty: Math.max(1, qty | 0) } }));
  }
  function setOpt(id, opt) {
    setSelecciones(s => ({ ...s, [id]: { ...(s[id] || {}), opt } }));
  }

  function addToCart(p) {
    const sel = selecciones[p.id] || { qty: 1, opt: "" };
    const optName = sel.opt || "";
    let qty = Math.max(1, sel.qty | 0);

    // Verificación de stock compartido (igual que en carrito)
    const disp = getUnifiedStockFor(p.id, optName);
    if (disp !== null && disp <= 0) {
      alert("Sin stock disponible para este producto/opción.");
      return;
    }
    if (disp !== null && qty > disp) {
      alert(`Solo quedan ${disp} unidades disponibles. Ajustamos tu cantidad.`);
      qty = disp;
    }

    const cart = loadCart();
    const it = cart.find(i => i.id === p.id && (i.opt || "") === optName);
    if (it) it.qty += qty; else cart.push({ id: p.id, qty, opt: optName });

    // Descuenta del espejo de stock
    if (disp !== null) persistStockChange(p.id, optName || null, -qty);

    saveCart(cart);
    alert("🛒 Agregado al carrito.");
  }

  const lista = productos.filter(p => {
    const q = filtro.trim().toLowerCase();
    if (!q) return true;
    return (
      p.nombre?.toLowerCase().includes(q) ||
      p.categoria?.toLowerCase().includes(q) ||
      p.desc?.toLowerCase().includes(q)
    );
  });

  return (
    <>
      {/* ====== TOP BAR + HEADER (mismo look del sitio) ====== */}
      <div className="top-bar">
        <div className="info-envios"><span>ENVÍOS GRATIS DESDE $24.990</span></div>
        <div className="derecha-redes-sociales">
          {/* CAMBIO: Link interno a /cambios */}
          <Link to="/cambios">Cambios o Devoluciones</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope"></i></a>
        </div>
      </div>

      <header>
        <div className="header-superior">
          {/* CAMBIO: logo a ruta / */}
          <div className="logo"><Link to="/"><img src="assets/img/logo.png" alt="Logo Nuit Fantome" /></Link></div>

          <div className="busqueda">
            <form onSubmit={(e)=>e.preventDefault()}>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={filtro}
                onChange={(e)=>setFiltro(e.target.value)}
              />
              <button type="submit"><i className="bi bi-search"></i></button>
            </form>
          </div>

          <div className="usuario-carrito">
            <div className="dropdown">
              <button className="btn-acceder">ACCEDER</button>
              <div className="dropdown-content">
                {/* CAMBIO: rutas internas */}
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/register">Registrarse</Link>
              </div>
            </div>
            {/* CAMBIO: carrito a /carrito */}
            <Link to="/carrito" style={{ textDecoration: "none" }}>
              <div className="carrito"><i className="bi bi-bag"></i><span className="contador" id="contador">0</span></div>
            </Link>
          </div>
        </div>

        <nav className="barra-tareas">
          <ul>
            {/* CAMBIO: navegación interna sin .html */}
            <li><Link to="/">INICIO</Link></li>
            <li><Link className="active" to="/productos">PRODUCTOS</Link></li>
            <li><Link to="/nosotros">NOSOTROS</Link></li>
            <li><Link to="/blogs">BLOGS</Link></li>
            <li><Link to="/contacto">CONTACTO</Link></li>
          </ul>
        </nav>
      </header>

      {/* ====== TU CONTENIDO ORIGINAL (NO BORRADO) ====== */}
      <main style={{ width: "min(1100px, 95%)", margin: "24px auto 32px" }}>
        {/* Título con el mismo look & feel */}
        <h2 style={{
          margin: "0 0 16px",
          color: "var(--ink, #3a2a63)",
          fontWeight: 900,
          fontSize: "clamp(1.6rem,1.1rem + 1.4vw,2.2rem)",
          display: "inline-flex",
          alignItems: "center",
          gap: 10,
          padding: "10px 14px 10px 12px",
          borderRadius: 14,
          background:
            "radial-gradient(14px 14px at 16px 16px, rgba(167,139,250,.18) 30%, transparent 31%) 0 0/32px 32px, linear-gradient(180deg,#efe8ff 0%, #e6f0ff 100%)",
          boxShadow: "0 8px 20px rgba(27,26,58,.08)"
        }}>
          <span role="img" aria-label="sparkles">✨</span> Productos
        </h2>

        {/* Buscador simple */}
        <div style={{ margin: "10px 0 18px" }}>
          <input
            value={filtro}
            onChange={e => setFiltro(e.target.value)}
            placeholder="Buscar productos…"
            className="input"
            style={{
              width: "100%",
              maxWidth: 420,
              padding: 10,
              borderRadius: 10,
              border: "1px solid var(--line, #eee9ff)",
              background: "#fff",
              color: "var(--ink, #3a2a63)"
            }}
          />
        </div>

        {/* Grilla de productos */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(220px, 1fr))",
            gap: 16
          }}
        >
          {lista.map((p) => {
            const sel = selecciones[p.id] || { opt: p.opciones?.[0]?.t || "", qty: 1 };
            const disp = getUnifiedStockFor(p.id, sel.opt || "");
            const agotado = disp !== null && disp <= 0;

            return (
              <article
                key={p.id}
                className="panel"
                style={{
                  background: "var(--panel, #fff)",
                  border: "1px solid var(--line, #eee9ff)",
                  borderRadius: 14,
                  padding: 12,
                  boxShadow: "0 6px 14px rgba(30,27,75,.06)",
                  display: "flex",
                  flexDirection: "column",
                  gap: 8
                }}
              >
                {/* 🔗 Mantengo tu cambio: Link al detalle */}
                <Link
                  to={`/producto/${p.id}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                  title={p.nombre}
                >
                  <img
                    src={p.img || "assets/img/placeholder.jpg"}
                    alt={p.nombre}
                    loading="lazy"
                    style={{
                      width: "100%",
                      aspectRatio: "1/1",
                      objectFit: "cover",
                      borderRadius: 12,
                      border: "1px solid var(--line, #eee9ff)",
                      background: "#fff",
                      boxShadow: "0 3px 8px rgba(30,27,75,.08)"
                    }}
                  />
                </Link>

                <div style={{ fontWeight: 800, color: "var(--ink, #3a2a63)" }}>{p.nombre}</div>
                <div className="muted" style={{ color: "var(--muted, #6b5aa6)", fontSize: ".92rem" }}>{p.categoria}</div>
                <div style={{ marginTop: 2, fontWeight: 900, color: "var(--ink, #3a2a63)" }}>{toCLP(p.precio)}</div>

                {disp !== null && (
                  <div className="muted" style={{ color: "var(--muted, #6b5aa6)", fontSize: ".9rem" }}>
                    Disponible: {disp}
                  </div>
                )}

                {/* Opciones y cantidad */}
                {Array.isArray(p.opciones) && p.opciones.length > 0 && (
                  <select
                    value={sel.opt}
                    onChange={(e) => setOpt(p.id, e.target.value)}
                    style={{
                      padding: 10,
                      borderRadius: 10,
                      border: "1px solid var(--line, #eee9ff)",
                      background: "#fff",
                      color: "var(--ink, #3a2a63)"
                    }}
                  >
                    {p.opciones.map(o => (
                      <option key={o.t} value={o.t}>{o.t}</option>
                    ))}
                  </select>
                )}

                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <input
                    type="number"
                    min={1}
                    value={sel.qty}
                    onChange={(e) => setQty(p.id, e.target.value)}
                    style={{
                      width: 86,
                      padding: "8px 10px",
                      textAlign: "center",
                      border: "1px solid var(--line, #eee9ff)",
                      borderRadius: 10,
                      background: "#fff",
                      boxShadow: "inset 0 1px 0 #f1edff"
                    }}
                  />
                  <button
                    disabled={agotado}
                    onClick={() => addToCart(p)}
                    className="btn"
                    style={{
                      background: "linear-gradient(90deg, var(--violet,#7c3aed) 0%, var(--violet-200,#a78bfa) 100%)",
                      color: "#fff",
                      border: 0,
                      borderRadius: 12,
                      padding: "10px 14px",
                      fontWeight: 800,
                      cursor: agotado ? "not-allowed" : "pointer",
                      boxShadow: "0 8px 18px rgba(124,58,237,.25)",
                      flex: 1
                    }}
                    title={agotado ? "Sin stock" : "Agregar al carrito"}
                  >
                    {agotado ? "Agotado" : "Agregar"}
                  </button>
                </div>
              </article>
            );
          })}
        </section>

        {lista.length === 0 && (
          <div className="empty" style={{ padding: 20, textAlign: "center", color: "#777" }}>
            No encontramos productos para “{filtro}”.
          </div>
        )}
      </main>

      {/* ====== FINAL-FINAL + FOOTER (parte de abajo) ====== */}
      <section className="final-final">
        <img src="assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
        <div className="final-contenido">
          <div className="final-logo"><img src="assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
          <div className="final-texto">
            <p>Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital.
              ¿Sabías que si tu escritorio tiene colores y te gusta, la motivación y la productividad llega por sí sola?</p>
          </div>
          <div className="final-redes">
            <div className="siguenos">Síguenos</div>
            <div className="iconos-redes">
              <a href="https://instagram.com"><img src="assets/img/logo_instagram.png" alt="Instagram" /></a>
              <a href="https://facebook.com"><img src="assets/img/logo_facebook.png" alt="Facebook" /></a>
              <a href="mailto:contacto@nuitfantome.com"><img src="assets/img/logo_gmail.png" alt="Email" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer-final">
        <div className="footer-contenido">
          <div className="footer-texto">© 2025 Nuit Fantome. Todos los derechos reservados.</div>
          <div className="footer-pagos">
            <img src="assets/img/webpay.png" alt="Webpay" />
            <img src="assets/img/transferencia.png" alt="Transferencia bancaria" />
            <img src="assets/img/mercado_pago.png" alt="Mercado Pago" />
          </div>
        </div>
      </footer>
    </>
  );
}
