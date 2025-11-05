// src/pages/NosotrosPage.jsx
import React, { useEffect } from "react";
import "../assets/css/style.css"; // CSS global del sitio (header/footer, tipografías, etc.)

export default function NosotrosPage() {
  // Actualiza el contador del carrito en el header (mismo patrón que el resto del sitio)
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

  return (
    <>
      {/* Estilos SOLO de esta página (incluye @keyframes) */}
      <style>{`
        :root{
          --nf-bg:#0f0321;
          --nf-card:#ffffff;
          --nf-soft:#f5f2ff;
          --nf-primary:#7c3aed;
          --nf-primary-2:#a78bfa;
          --nf-ink:#2b254a;
          --nf-muted:#6c6a7a;
          --nf-ring: rgba(124,58,237,.28);
        }
        main.nosotros{color:#fff;background:var(--nf-bg);}
        .container{width:min(1100px,92%);margin-inline:auto}

        .hero-nosotros{
          position:relative;
          background:
            radial-gradient(1200px 600px at 10% -20%, rgba(124,58,237,.28), transparent 60%),
            radial-gradient(900px 500px at 90% 10%, rgba(167,139,250,.22), transparent 60%),
            linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0));
          padding:64px 0 54px;
          text-align:center;
          overflow:hidden;
        }
        .hero-nosotros h1{margin:0;font-size:clamp(28px,4vw,40px);letter-spacing:.5px}
        .hero-nosotros p{margin:10px auto 0;color:#e9e6ff;max-width:760px;font-size:clamp(14px,2.2vw,18px)}
        .spark{
          position:absolute; width:14px; height:14px; border-radius:50%;
          background: radial-gradient(#fff,rgba(255,255,255,.1));
          filter:drop-shadow(0 0 10px #fff);
          animation: float 8s linear infinite;
        }
        .spark.s1{left:8%; top:28%; animation-duration:7.5s}
        .spark.s2{left:82%; top:22%}
        .spark.s3{left:18%; top:70%; animation-duration:9s}
        .spark.s4{left:72%; top:68%; animation-duration:10s}
        @keyframes float{0%{transform:translateY(0)}50%{transform:translateY(-8px)}100%{transform:translateY(0)}}

        .card{
          background:var(--nf-card);
          color:var(--nf-ink);
          border:1px solid #eee;
          border-radius:16px;
          padding:22px;
          box-shadow:0 16px 40px rgba(17,16,40,.14);
        }
        .card p{color:#4a4568}

        .grid-2{display:grid; gap:18px; grid-template-columns: 1.1fr .9fr;}
        @media (max-width:900px){ .grid-2{grid-template-columns:1fr} }

        .timeline{position:relative; padding-left:24px;}
        .timeline::before{
          content:""; position:absolute; left:8px; top:4px; bottom:4px;
          width:2px; background:linear-gradient(var(--nf-primary), var(--nf-primary-2));
          border-radius:999px;
        }
        .t-item{position:relative; margin:14px 0 14px 0}
        .t-item::before{
          content:""; position:absolute; left:-17px; top:.4em;
          width:10px; height:10px; border-radius:50%;
          background:var(--nf-primary); box-shadow:0 0 0 4px var(--nf-ring);
        }
        .t-item h4{margin:0 0 4px; font-size:15px; color:#382e76}
        .t-item p{margin:0; color:#635c86; font-size:14px}

        .mv{display:grid; gap:16px; grid-template-columns:1fr 1fr; margin-top:16px}
        @media (max-width:820px){ .mv{grid-template-columns:1fr} }
        .mv .card{background:linear-gradient(#fff,#fff) padding-box, linear-gradient(90deg,#eae7ff,#fff) border-box; border:1px solid transparent}
        .mv h3{margin:0 0 8px; color:#382e76}

        .valores-wrap{display:flex; flex-wrap:wrap; gap:10px; margin-top:10px}
        .chip{
          border:1px solid #ece7ff; background:var(--nf-soft); color:#2b2452;
          padding:8px 12px; border-radius:999px; font-weight:700; display:inline-flex; align-items:center; gap:8px
        }
        .chip i{color:var(--nf-primary)}

        .beneficios{display:grid; gap:16px; grid-template-columns:repeat(4,1fr); margin-top:18px}
        @media (max-width:920px){ .beneficios{grid-template-columns:repeat(2,1fr)} }
        @media (max-width:540px){ .beneficios{grid-template-columns:1fr} }
        .b-card{background:#fff;border:1px solid #eee;border-radius:14px;padding:18px; color:#2b254a}
        .b-card h4{margin:10px 0 6px}
        .b-icon{
          width:40px;height:40px;border-radius:12px;display:grid;place-items:center;
          background:linear-gradient(90deg,var(--nf-primary),var(--nf-primary-2)); color:#fff; font-size:18px
        }

        .faq{margin-top:8px}
        details{
          background:#170a33; border:1px solid rgba(255,255,255,.08);
          border-radius:12px; padding:12px 14px; margin:10px 0
        }
        details[open]{border-color:rgba(124,58,237,.45); box-shadow:0 8px 24px rgba(124,58,237,.12)}
        summary{cursor:pointer; font-weight:700; color:#e9e6ff; list-style:none}
        summary::-webkit-details-marker{display:none}
        details p{color:#cfcbe6; margin:10px 2px 2px}

        section.section{padding:28px 0}
        .section h2{margin:0 0 10px}
        .section p.lead{color:#4a4568; font-size:16px; line-height:1.6;}
        .final-final{margin-top:28px}
      `}</style>

      {/* Barra superior */}
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
            <li><a className="active" href="/nosotros">NOSOTROS</a></li>
            <li><a href="/blogs">BLOGS</a></li>
            <li><a href="/contacto">CONTACTO</a></li>
          </ul>
        </nav>
      </header>

      {/* CUERPO */}
      <main className="nosotros">
        {/* HERO */}
        <section className="hero-nosotros">
          <span className="spark s1" /><span className="spark s2" />
          <span className="spark s3" /><span className="spark s4" />
          <div className="container">
            <h1>Sobre nosotros</h1>
            <p>
              Conoce más acerca de <strong>Nuit Fantôme</strong>, nuestra historia y lo que nos inspira
              para crear papelería que te acompaña en cada idea ✨
            </p>
          </div>
        </section>

        {/* QUIÉNES SOMOS + TIMELINE */}
        <section className="section">
          <div className="container grid-2">
            <article className="card">
              <h2 style={{ margin: "0 0 8px" }}>¿Quiénes somos?</h2>
              <p className="lead">
                Somos una papelería creativa con alma nostálgica. Diseñamos y curamos productos bonitos,
                funcionales y de calidad, para que planificar, estudiar o crear sea un momento que disfrutes.
              </p>
              <p>
                Creemos en el poder de los colores y los objetos que cuentan historias. Por eso combinamos
                colecciones temáticas, materiales confiables y un toque kawaii que hace sonreír a tu escritorio.
              </p>
            </article>

            <aside className="card">
              <h3 style={{ margin: "0 0 6px", color: "#382e76" }}>Nuestra historia</h3>
              <div className="timeline">
                <div className="t-item">
                  <h4>2019 · La idea</h4>
                  <p>Nace el sueño de una papelería distinta que mezcle estética y utilidad.</p>
                </div>
                <div className="t-item">
                  <h4>2021 · Primer catálogo</h4>
                  <p>Lanzamos sets temáticos y empezamos a llegar a escritorios de todo Chile.</p>
                </div>
                <div className="t-item">
                  <h4>2024 · Comunidad</h4>
                  <p>Sumamos colecciones propias y creamos guías para estudiar y organizar.</p>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* MISIÓN / VISIÓN */}
        <section className="section">
          <div className="container mv">
            <div className="card">
              <h3>Misión</h3>
              <p>Fomentar la creatividad y acompañarte en cada etapa con papelería física y digital que te motive a lograrlo todo.</p>
            </div>
            <div className="card">
              <h3>Visión</h3>
              <p>Ser una comunidad donde el arte y las ideas fluyen; un lugar donde cada producto inspira a empezar.</p>
            </div>
          </div>
        </section>

        {/* VALORES */}
        <section className="section">
          <div className="container">
            <h2>Nuestros valores</h2>
            <div className="valores-wrap">
              <span className="chip"><i className="fa-solid fa-wand-magic-sparkles" /> Creatividad</span>
              <span className="chip"><i className="fa-solid fa-heart" /> Pasión</span>
              <span className="chip"><i className="fa-solid fa-seedling" /> Sostenibilidad</span>
              <span className="chip"><i className="fa-solid fa-handshake-angle" /> Conexión humana</span>
            </div>
          </div>
        </section>

        {/* POR QUÉ ELEGIRNOS */}
        <section className="section">
          <div className="container">
            <h2>¿Por qué elegirnos?</h2>
            <div className="beneficios">
              <div className="b-card">
                <div className="b-icon"><i className="fa-solid fa-star" /></div>
                <h4>Calidad que se nota</h4>
                <p>Papeles, tintas y acabados que resisten el día a día sin sacrificar lo bonito.</p>
              </div>
              <div className="b-card">
                <div className="b-icon"><i className="fa-solid fa-gift" /></div>
                <h4>Colecciones pensadas</h4>
                <p>Sets coordinados para que todo combine y organizar sea un placer.</p>
              </div>
              <div className="b-card">
                <div className="b-icon"><i className="fa-solid fa-truck" /></div>
                <h4>Despacho seguro</h4>
                <p>Empaques protegidos y seguimiento para que llegue perfecto a tus manos.</p>
              </div>
              <div className="b-card">
                <div className="b-icon"><i className="fa-solid fa-people-group" /></div>
                <h4>Comunidad</h4>
                <p>Tutoriales, ideas y tips para estudiar, planificar y crear sin bloqueo.</p>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="section">
          <div className="container">
            <h2>Preguntas frecuentes</h2>
            <div className="faq">
              <details>
                <summary>¿Hacen envíos a todo Chile?</summary>
                <p>Sí. Enviamos a todo el país con diferentes couriers. Los costos y plazos se calculan en el checkout según tu comuna.</p>
              </details>
              <details>
                <summary>¿Los productos tienen garantía?</summary>
                <p>Por supuesto. Si algo llega dañado o con fallas, escríbenos dentro de los 10 días y lo cambiamos o reembolsamos.</p>
              </details>
              <details>
                <summary>¿Puedo pedir un regalo?</summary>
                <p>Sí. Podemos incluir una tarjetita con tu mensaje y empaquetado bonito sin costo adicional.</p>
              </details>
            </div>
          </div>
        </section>

        {/* Sección final estándar */}
        <section className="final-final">
          <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
          <div className="final-contenido">
            <div className="final-logo"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
            <div className="final-texto">
              <p>
                Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital.
                Si tu escritorio tiene colores y te encanta, la motivación llega por sí sola ✨
              </p>
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

      {/* Footer */}
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
    </>
  );
}
