// src/pages/BlogsPage.jsx
import React, { useEffect, useMemo, useState, useCallback } from "react";
import "../assets/css/style.css"; // estilos globales del sitio

export default function BlogsPage() {
  // ====== DATA (misma estructura que tu HTML) ======
  const posts = useMemo(
    () => [
      {
        id: "b01",
        titulo: "Cómo empezar tu bullet journal (sin abrumarte)",
        fecha: "2025-03-10",
        lectura: "5 min",
        categoria: "Planificación",
        cover: "portada-bullet journal.jpg",
        images: [
          "portada-bullet journal.jpg",
          "idea-decoracion.jpg",
          "portada-decoracion.jpg",
        ],
        tips: `💡 Tips para no abrumarte
- Empieza con lo mínimo: índice, future log, monthly y daily.
- Usa bolígrafos o lápices comunes (no necesitas decoración al inicio).
- No busques la perfección: el Bullet Journal es una herramienta, no una obra de arte.
- Cada mes puedes probar añadir algo nuevo (tracker, notas creativas, etc.).`,
        tags: ["bullet journal", "hábitos", "organización"],
        extracto:
          "Guía básica con claves sencillas para comenzar tu bullet journal y mantenerlo vivo.",
        cuerpo:
          "Empezar un bullet journal no requiere cientos de materiales. Con una libreta, un lápiz y esta estructura mínima (index, future log, monthly, daily) ya puedes partir. Lo importante es iterar...",
      },
      {
        id: "b02",
        titulo: "Ideas de decoración con washi tape",
        fecha: "2025-02-20",
        lectura: "4 min",
        categoria: "Creatividad",
        cover: "portada-blogs.jpg",
        images: ["portada-blogs.jpg", "banderitas.jpg", "marca-pagina.jpg", "marco-washi-tape.jpg"],
        tags: ["washi tape", "journaling", "diy"],
        extracto:
          "Cinco formas fáciles de usar washi tape en tu cuaderno y escritorio.",
        cuerpo:
          "El washi tape es versátil: separadores, marcos, banderitas y patrones combinados. Aquí te dejamos cinco ideas rápidas para transformar páginas y etiquetas.",
      },
      {
        id: "b03",
        titulo: "Rutina de estudio de 25 minutos (método Pomodoro)",
        fecha: "2025-01-28",
        lectura: "3 min",
        categoria: "Estudio",
        cover: "portada-pomodoro.jpg",
        tips_html: `
<h4>⏱️ Rutina Pomodoro de 25 minutos</h4>
<h5>🔹 Antes de empezar (2–3 min)</h5>
<ul>
  <li>Prepara tu espacio: agua, cuaderno, lápiz, materiales.</li>
  <li>Define 1 <strong>tarea concreta</strong>.</li>
  <li>Pon el temporizador en <strong>25 minutos</strong>.</li>
</ul>
<h5>🔹 Durante los 25 minutos</h5>
<ol>
  <li><strong>Min 0–5</strong>: entra en foco (repaso rápido).</li>
  <li><strong>Min 6–20</strong>: trabajo profundo sin distracciones.</li>
  <li><strong>Min 21–25</strong>: cierre con mini-resumen.</li>
</ol>
<h5>🔹 Después</h5>
<ul>
  <li>Descansa <strong>5 min</strong>. Cada 4 pomodoros, pausa larga de 15–30 min.</li>
</ul>`,
        tags: ["estudio", "productividad"],
        extracto:
          "Pequeñas sesiones enfocadas + descansos cortos: así se ve un ciclo efectivo.",
        cuerpo:
          "Configura un temporizador de 25 min, apaga notificaciones y define una sola tarea. Descansa 5 min. Repite x4 y toma un descanso largo. Ajusta a tu energía diaria.",
      },
      {
        id: "b04",
        titulo: "Qué papel elegir para rotuladores y acuarela ligera",
        fecha: "2024-12-15",
        lectura: "6 min",
        categoria: "Materiales",
        cover: "acuarela ligera-portada.jpg",
        tips: `📒 Papeles recomendados
- 🌿 Clairefontaine PaintOn Mixed Media 250 gsm
- 💧 Clairefontaine Aquapad Bloc Acuarela A5
- 🎨 Canson Block Mixed Media Artist 600 gsm
- 🌊 Canson XL Aquarelle Croquera A5
- 🍃 Hahnemühle Mixed Media Bamboo 265 gsm
- 🎀 Himi Watercolor Pad`,
        tags: ["papel", "rotuladores", "acuarela"],
        extracto:
          "Peso, textura y gramaje: cómo escoger sin perderte entre opciones.",
        cuerpo:
          "Para rotuladores a base de alcohol, busca papeles lisos y resistentes al sangrado. Para acuarela ligera, 200–300 g/m² prensado en frío evitará ondas.",
      },
      {
        id: "b05",
        titulo: "Plantillas gratis: To-Do List y Planner semanal",
        fecha: "2025-03-01",
        lectura: "2 min",
        categoria: "Descargables",
        cover: "portada-planner.jpg",
        images: ["portada-planner.jpg", "planner-semanal.jpg", "to-do-list.jpg"],
        download: "assets/descargas/plantillas-to-do-planner.zip",
        tags: ["printable", "gratis"],
        extracto:
          "Descarga dos plantillas imprimibles para organizar tu semana (PDF).",
        cuerpo:
          "Incluimos dos PDFs listos para imprimir en tamaño A5/A4: To-Do List y Planner semanal. Tip: imprime en 100 g para mejor sensación.",
      },
    ],
    []
  );

  // ====== Estado UI ======
  const categorias = useMemo(
    () => ["Todos", ...Array.from(new Set(posts.map((p) => p.categoria)))],
    [posts]
  );
  const [cat, setCat] = useState("Todos");
  const [orden, setOrden] = useState("recientes");
  const [modalPost, setModalPost] = useState(null);
  const [galIndex, setGalIndex] = useState(0);
  const [newsMsg, setNewsMsg] = useState("");

  // ====== Contador carrito en header ======
  useEffect(() => {
    const CART_KEY = "nf_cart";
    let total = 0;
    try {
      const c = JSON.parse(localStorage.getItem(CART_KEY)) || [];
      total = c.reduce((a, b) => a + (b.qty || 0), 0);
    } catch {}
    const el = document.getElementById("contador");
    if (el) el.textContent = total;
  }, []);

  // ====== Smart loader (intenta distintos directorios como en tu HTML) ======
  const BASE_DIRS = ["", "assets/img/blog/", "assets/img/blogs/", "assets/img/"];
  const handleSmartImg = useCallback((e, filename) => {
    // si ya viene con /, usar tal cual
    if (filename.includes("/")) return;
    const img = e.currentTarget;
    const i = Number(img.dataset.idx || 0);
    if (i + 1 >= BASE_DIRS.length) return;
    img.dataset.idx = String(i + 1);
    img.src = encodeURI(BASE_DIRS[i + 1] + filename);
  }, []);

  // ====== Filtros + orden ======
  const lista = useMemo(() => {
    let l = posts.filter((p) => cat === "Todos" || p.categoria === cat);
    const toDate = (s) => new Date(s);
    switch (orden) {
      case "antiguos":
        l.sort((a, b) => toDate(a.fecha) - toDate(b.fecha));
        break;
      case "az":
        l.sort((a, b) => a.titulo.localeCompare(b.titulo));
        break;
      case "za":
        l.sort((a, b) => b.titulo.localeCompare(a.titulo));
        break;
      default:
        l.sort((a, b) => toDate(b.fecha) - toDate(a.fecha));
    }
    return l;
  }, [cat, orden, posts]);

  // ====== Modal ======
  const openModal = (p) => {
    setModalPost(p);
    setGalIndex(0);
    document.body.style.overflow = "hidden";
  };
  const closeModal = () => {
    setModalPost(null);
    document.body.style.overflow = "";
  };

  // ====== Newsletter ======
  const submitNews = (ev) => {
    ev.preventDefault();
    const data = new FormData(ev.currentTarget);
    const email = String(data.get("email") || "").trim();
    const ok = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!ok) {
      setNewsMsg("Por favor escribe un correo válido 🙂");
      return;
    }
    alert(
      "¡Gracias por suscribirte! 🎉\nTe enviaremos ideas, imprimibles y lanzamientos una vez por semana. Puedes darte de baja cuando quieras."
    );
    setNewsMsg("¡Listo! Revisa tu bandeja (o spam) para confirmar la suscripción.");
    ev.currentTarget.reset();
  };

  return (
    <>
      {/* Estilos propios (calcados del HTML) */}
      <style>{`
        :root{--nf-bg:#0f0321;--nf-card:#ffffff;--nf-soft:#f5f2ff;--nf-primary:#7c3aed;--nf-primary-2:#a78bfa;--nf-ink:#2b254a;--nf-muted:#6c6a7a;--nf-ring:rgba(124,58,237,.28)}
        main.blogs{color:#fff;background:var(--nf-bg)} .container{width:min(1100px,92%);margin-inline:auto}
        .hero-blogs{position:relative;background:
          radial-gradient(1200px 600px at 10% -20%, rgba(124,58,237,.28), transparent 60%),
          radial-gradient(900px 500px at 90% 10%, rgba(167,139,250,.22), transparent 60%),
          linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0));
          padding:64px 0 54px;text-align:center;overflow:hidden}
        .hero-blogs h1{margin:0;font-size:clamp(28px,4vw,40px)}
        .hero-blogs p{margin:10px auto 0;color:#e9e6ff;max-width:760px;font-size:clamp(14px,2.2vw,18px)}
        .spark{position:absolute;width:14px;height:14px;border-radius:50%;background:radial-gradient(#fff,rgba(255,255,255,.1));filter:drop-shadow(0 0 10px #fff);animation:float 8s linear infinite}
        .spark.s1{left:8%;top:28%;animation-duration:7.5s}.spark.s2{left:82%;top:22%}.spark.s3{left:18%;top:70%;animation-duration:9s}.spark.s4{left:72%;top:68%;animation-duration:10s}
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}
        .tools{display:flex;align-items:center;justify-content:space-between;gap:16px;margin:14px 0 8px}
        .chips{display:flex;flex-wrap:wrap;gap:10px}
        .chip{border:1px solid #e9e5ff;background:#faf8ff;color:#3a2a63;padding:7px 12px;border-radius:999px;font-weight:700;cursor:pointer}
        .chip.active{background:#7c3aed;color:#fff;border-color:#7c3aed}
        .grid{padding:22px 0}
        .cards{display:grid;grid-template-columns:repeat(auto-fill,minmax(260px,1fr));gap:16px}
        .card{background:#fff;border:1px solid #eee;border-radius:16px;overflow:hidden;color:var(--nf-ink);box-shadow:0 16px 40px rgba(17,16,40,.12);transition:.15s}
        .card:hover{transform:translateY(-2px);box-shadow:0 20px 46px rgba(17,16,40,.16)}
        .thumb{width:100%;height:170px;object-fit:cover}
        .body{padding:12px 14px}
        .meta{display:flex;gap:10px;align-items:center;color:#7b7596;font-size:12px}
        .tags{display:flex;flex-wrap:wrap;gap:6px;margin:8px 0}.tag{font-size:12px;background:var(--nf-soft);border:1px solid #ece7ff;border-radius:999px;padding:4px 8px;color:#2b2452}
        .title{margin:6px 0 6px;font-weight:800}.excerpt{color:#5c577a;font-size:14px}
        .actions{display:flex;gap:10px;align-items:center;margin:10px 0 4px}
        .btn{background:linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%);color:#fff;border:0;border-radius:10px;padding:8px 12px;font-weight:800;cursor:pointer;box-shadow:0 6px 14px rgba(124,58,237,.25);text-decoration:none;display:inline-flex;align-items:center;gap:8px}
        .btn-ghost{background:#f3f0ff;color:#2b2452;border:0;border-radius:10px;padding:8px 12px;font-weight:800;cursor:pointer}
        .modal{position:fixed;inset:0;display:none;z-index:99999}.modal.show{display:flex;align-items:center;justify-content:center}
        .modal .scrim{position:absolute;inset:0;background:rgba(17,16,40,.55);backdrop-filter:blur(2px)}
        .modal .box{position:relative;z-index:1;width:min(800px,92vw);max-height:85vh;overflow:auto;background:#fff;border-radius:16px;border:1px solid #eee;box-shadow:0 24px 60px rgba(17,16,40,.28)}
        .modal .cover{display:block;width:100%;height:auto;aspect-ratio:16/7;max-height:42vh;object-fit:cover;border-top-left-radius:16px;border-top-right-radius:16px}
        .modal .content{padding:16px 18px;color:#2b254a;position:relative;z-index:1}
        .modal h3{margin:0 0 8px}.modal .m-meta{color:#7b7596;font-size:12px;display:flex;gap:10px;align-items:center}
        .modal .close{position:sticky;top:0;float:right;margin:10px 10px 0 0;background:#f3f0ff;border:0;border-radius:10px;padding:6px 10px;cursor:pointer;font-weight:800}
        .gallery{margin:14px 0 10px}
        .g-main{display:block;width:100%;height:auto;aspect-ratio:16/9;max-height:56vh;object-fit:contain;background:#faf8ff;border-radius:12px;border:1px solid #eee}
        .g-thumbs{margin-top:10px;display:flex;gap:8px;flex-wrap:wrap}
        .g-thumbs img{flex:0 0 auto;width:96px;height:72px;object-fit:cover;cursor:pointer;border-radius:8px;border:2px solid transparent;transition:.15s}
        .g-thumbs img.active{border-color:#7c3aed}
        @media (max-width:560px){.modal .cover{aspect-ratio:16/9;max-height:32vh}.g-main{aspect-ratio:4/3;max-height:36vh}.g-thumbs img{width:78px;height:58px}}
        .m-actions{display:flex;gap:10px;margin-top:12px;flex-wrap:wrap}
        .tips{background:#faf8ff;color:#2b254a;border:1px solid #ece7ff;border-radius:12px;padding:14px 16px;margin-top:12px}
        .tips.plain{white-space:pre-wrap}.tips h4{margin:0 0 8px;font-size:16px}.tips h5{margin:10px 0 6px;font-size:14px}.tips ul,.tips ol{margin:6px 0 10px 18px;padding:0}.tips li{margin:4px 0}.tips strong{font-weight:700}
        .newsletter{margin:8px 0 20px;position:relative;z-index:10}
        .news-card{position:relative;z-index:10;background:linear-gradient(180deg,#1b0a3a,#13062b);border:1px solid rgba(255,255,255,.08);color:#e9e6ff;padding:18px;border-radius:16px;display:grid;gap:14px;grid-template-columns:1.2fr .8fr;align-items:center}
        .news-card h3{margin:0 0 6px}.news-card form{display:flex;gap:8px}
        .news-card input{flex:1;padding:10px 12px;border-radius:10px;border:1px solid #433366;background:#0e0720;color:#fff}
        .news-card button{white-space:nowrap}.news-msg{margin-top:6px;color:#cfcbe6;font-size:14px}
        @media (max-width:820px){.news-card{grid-template-columns:1fr}}
        .final-final{margin-top:28px}
      `}</style>

      {/* Top bar */}
      <div className="top-bar">
        <div className="info-envios"><span>ENVÍOS GRATIS DESDE $24.990</span></div>
        <div className="derecha-redes-sociales">
          <a href="/cambios">Cambios o Devoluciones</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram" /></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f" /></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope" /></a>
        </div>
      </div>

      {/* Header */}
      <header>
        <div className="header-superior">
          <div className="logo">
            <a href="/"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></a>
          </div>
          <div className="busqueda">
            <form action="/productos" method="get">
              <input type="text" name="buscar" placeholder="Buscar productos..." />
              <button type="submit"><i className="bi bi-search" /></button>
            </form>
          </div>
          <div className="usuario-carrito">
            <div className="dropdown">
              <button className="btn-acceder">ACCEDER</button>
              <div className="dropdown-content">
                <a href="/login">Iniciar Sesión</a>
                <a href="/register">Registrarse</a>
              </div>
            </div>
            <a href="/carrito" style={{ textDecoration: "none" }}>
              <div className="carrito">
                <i className="bi bi-bag" />
                <span className="contador" id="contador">0</span>
              </div>
            </a>
          </div>
        </div>
        <nav className="barra-tareas">
          <ul>
            <li><a href="/">INICIO</a></li>
            <li><a href="/productos">PRODUCTOS</a></li>
            <li><a href="/nosotros">NOSOTROS</a></li>
            <li><a className="active" href="/blogs">BLOGS</a></li>
            <li><a href="/contacto">CONTACTO</a></li>
          </ul>
        </nav>
      </header>

      {/* CUERPO */}
      <main className="blogs">
        {/* HERO */}
        <section className="hero-blogs">
          <span className="spark s1" /><span className="spark s2" />
          <span className="spark s3" /><span className="spark s4" />
          <div className="container">
            <h1>Blogs &amp; guías</h1>
            <p>Ideas para estudiar, planificar y crear. Tutoriales, inspiración y herramientas para que tu escritorio sea tu lugar favorito ✨</p>
          </div>
        </section>

        {/* FILTROS */}
        <section className="container">
          <div className="tools">
            <div className="chips">
              {categorias.map((c) => (
                <button
                  key={c}
                  className={`chip ${cat === c ? "active" : ""}`}
                  onClick={() => setCat(c)}
                >
                  {c}
                </button>
              ))}
            </div>
            <select
              value={orden}
              onChange={(e) => setOrden(e.target.value)}
              className="chip"
              style={{ borderRadius: 10 }}
            >
              <option value="recientes">Ordenar: Recientes</option>
              <option value="antiguos">Más antiguos</option>
              <option value="az">Título A → Z</option>
              <option value="za">Título Z → A</option>
            </select>
          </div>
        </section>

        {/* GRID */}
        <section className="container grid">
          <div className="cards">
            {lista.length === 0 ? (
              <div style={{ color: "#cfcbe6" }}>No hay publicaciones en esta categoría.</div>
            ) : (
              lista.map((p) => (
                <article key={p.id} className="card">
                  <img
                    className="thumb"
                    alt={p.titulo}
                    src={encodeURI(p.cover.includes("/") ? p.cover : BASE_DIRS[0] + p.cover)}
                    data-idx="0"
                    onError={(e) => handleSmartImg(e, p.cover)}
                  />
                  <div className="body">
                    <div className="meta">
                      <span><i className="fa-regular fa-calendar" /> {new Date(p.fecha).toLocaleDateString("es-CL")}</span>
                      <span>·</span>
                      <span><i className="fa-regular fa-clock" /> {p.lectura}</span>
                    </div>
                    <div className="tags">
                      {p.tags?.map((t) => (
                        <span key={t} className="tag">{t}</span>
                      ))}
                    </div>
                    <div className="title">{p.titulo}</div>
                    <p className="excerpt">{p.extracto}</p>
                    <div className="actions">
                      <button className="btn" onClick={() => openModal(p)}>Leer</button>
                      <button className="btn-ghost" onClick={() => openModal(p)}>Vista rápida</button>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
        </section>

        {/* NEWSLETTER */}
        <section className="container newsletter">
          <div className="news-card">
            <div>
              <h3>Recibe nuevas guías en tu correo</h3>
              <p style={{ color: "#cfcbe6", margin: 0 }}>
                Una vez por semana: ideas, imprimibles y lanzamientos (sin spam).
              </p>
            </div>
            <form id="newsForm" onSubmit={submitNews} noValidate>
              <input id="newsEmail" type="email" name="email" autoComplete="email" required placeholder="tu@email.com" />
              <button className="btn" type="submit">Suscribirme</button>
            </form>
            {newsMsg ? <p id="newsInlineMsg" className="news-msg" aria-live="polite">{newsMsg}</p> : <p id="newsInlineMsg" className="news-msg" aria-live="polite" hidden />}
          </div>
        </section>

        {/* FINAL FINAL */}
        <section className="final-final">
          <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
          <div className="final-contenido">
            <div className="final-logo"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
            <div className="final-texto">
              <p>Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital.
                Si tu escritorio tiene colores y te encanta, la motivación llega por sí sola ✨</p>
            </div>
            <div className="final-redes">
              <div className="siguenos">Síguenos</div>
              <div className="iconos-redes">
                <a href="https://instagram.com"><img src="/assets/img/logo_instagram.png" alt="Instagram" /></a>
                <a href="https://facebook.com"><img src="/assets/img/logo_facebook.png" alt="Facebook" /></a>
                <a href="mailto:contacto@nuitfantome.com"><img src="/assets/img/logo_gmail.png" alt="Email" /></a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer className="footer-final">
        <div className="footer-contenido">
          <div className="footer-texto">© 2025 Nuit Fantome. Todos los derechos reservados.</div>
          <div className="footer-pagos">
            <img src="/assets/img/webpay.png" alt="Webpay" />
            <img src="/assets/img/transferencia.png" alt="Transferencia bancaria" />
            <img src="/assets/img/mercado_pago.png" alt="Mercado Pago" />
          </div>
        </div>
      </footer>

      {/* MODAL */}
      {modalPost && (
        <div className="modal show" aria-hidden="false" onClick={closeModal}>
          <div className="scrim" />
          <div className="box" onClick={(e) => e.stopPropagation()}>
            <button className="close" onClick={closeModal}>Cerrar ✕</button>
            <img
              className="cover"
              alt={modalPost.titulo}
              src={encodeURI(
                modalPost.cover.includes("/")
                  ? modalPost.cover
                  : BASE_DIRS[0] + modalPost.cover
              )}
              data-idx="0"
              onError={(e) => handleSmartImg(e, modalPost.cover)}
            />
            <div className="content">
              <h3 id="mTitle">{modalPost.titulo}</h3>
              <div className="m-meta" id="mMeta">
                <span><i className="fa-regular fa-calendar" /> {new Date(modalPost.fecha).toLocaleDateString("es-CL")}</span>
                <span>·</span>
                <span><i className="fa-regular fa-clock" /> {modalPost.lectura}</span>
                <span>·</span>
                <span className="tag">{modalPost.categoria}</span>
              </div>

              {/* Galería */}
              {Array.isArray(modalPost.images) && modalPost.images.length > 0 ? (
                <div className="gallery" id="mGallery">
                  <img
                    id="gMain"
                    className="g-main"
                    alt={`${modalPost.titulo} — imagen ${galIndex + 1}`}
                    src={encodeURI(
                      modalPost.images[galIndex].includes("/")
                        ? modalPost.images[galIndex]
                        : BASE_DIRS[0] + modalPost.images[galIndex]
                    )}
                    data-idx="0"
                    onError={(e) => handleSmartImg(e, modalPost.images[galIndex])}
                  />
                  <div id="gThumbs" className="g-thumbs">
                    {modalPost.images.map((name, i) => (
                      <img
                        key={name + i}
                        alt={`miniatura ${i + 1}`}
                        className={i === galIndex ? "active" : ""}
                        src={encodeURI(name.includes("/") ? name : BASE_DIRS[0] + name)}
                        data-idx="0"
                        onError={(e) => handleSmartImg(e, name)}
                        onClick={() => setGalIndex(i)}
                      />
                    ))}
                  </div>
                </div>
              ) : null}

              {/* Acciones del modal */}
              <div id="mActions" className="m-actions">
                {modalPost.download && (
                  <a
                    className="btn"
                    href={modalPost.download}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <i className="bi bi-download" /> Descargar
                  </a>
                )}
              </div>

              {/* Cuerpo */}
              <p id="mBody" style={{ marginTop: 10 }}>
                {modalPost.cuerpo}
              </p>

              {/* Tips */}
              {modalPost.tips_html ? (
                <div
                  id="mTips"
                  className="tips"
                  dangerouslySetInnerHTML={{ __html: modalPost.tips_html }}
                />
              ) : modalPost.tips ? (
                <div id="mTips" className="tips plain">{modalPost.tips}</div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
