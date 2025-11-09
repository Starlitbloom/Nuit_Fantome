// src/pages/CategoriasPage.jsx
import React, { useMemo, useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";

/* =======================
   Catálogo base
   ======================= */
const base = [
  { id:"org01", categoria:"Organizadores", nombre:"Organizador de escritorio blanco", precio:12990, img:"/assets/img/organizador.jpg.avif", desc:"Organizador metálico con cajón y compartimentos; ideal para notas, lápices y clips." },
  { id:"washi01", categoria:"Cintas / Washi", nombre:"Set 5 washi tape – colores mixtos", precio:3990, img:"/assets/img/washi-mix5.jpg", desc:"Pack de 5 cintas washi de colores mixtos; papel de arroz, reposicionables, 15 mm x 5 m c/u." },
  { id:"calc01", categoria:"Calculadoras", nombre:"Calculadora compacta pastel", precio:6990, img:"/assets/img/calculadora-pastel.jpg", desc:"Calculadora compacta con teclas suaves y diseño pastel; pantalla de 12 dígitos.",
    opciones:[{t:"Rosa"},{t:"Lila"},{t:"Celeste"},{t:"Verde"}] },
  { id:"washi02", categoria:"Cintas / Washi", nombre:"Washi tape ilustrada “Vida diaria”", precio:3490, img:"/assets/img/washi-vida-diaria.jpg", desc:"Washi ilustrada temática de vida diaria; ideal para diarios y scrap, 15 mm x 5 m.",
    opciones:[{t:"Amarillo"},{t:"Rosa"},{t:"Verde"},{t:"Morado"}] },
  { id:"washi03", categoria:"Cintas / Washi", nombre:"Set de cintas washi – tonos pastel", precio:3990, img:"/assets/img/washi-set-pastel.jpg", desc:"Set de cintas washi en tonos pastel; adhesivo suave sin residuos, perfecto para bullet journal.",
    opciones:[{t:"Pastel 1"},{t:"Pastel 2"},{t:"Pastel 3"},{t:"Pastel 4"}] },
  { id:"cut01", categoria:"Corte", nombre:"Cúter mini “Paw” (patas de gato)", precio:2990, img:"/assets/img/cutter-paw.jpg", desc:"Cúter mini con tapa en forma de pata; hoja retráctil segura.",
    opciones:[{t:"Rosa"},{t:"Blanco"},{t:"Amarillo"},{t:"Celeste"}] },
  { id:"cua03", categoria:"Cuadernos & Libretas", nombre:"Cuaderno ilustrado A5 – Pinturas", precio:4990, img:"/assets/img/cuaderno-pinturas.jpg", desc:"Cuaderno A5 con ilustraciones; 80 hojas lisas, papel 90 g, tapa dura.",
    opciones:[{t:"Lila"},{t:"Rosa"},{t:"Lavanda"}] },
  { id:"est01", categoria:"Estuches", nombre:"Estuche Sanrio (set 4) ", precio:8990, img:"/assets/img/estuche-kuromi.jpg", desc:"Estuche Kuromi con compartimentos y cierre resistente.",
    opciones:[{t:"Cinnamoroll"},{t:"My Melody"},{t:"Kuromi"},{t:"Pompompurin"}] },
  { id:"est02", categoria:"Estuches", nombre:"Estuche Sanrio(set 6)", precio:8990, img:"/assets/img/estuche-my-melody.jpg", desc:"Estuche My Melody con elásticos y bolsillo interno.",
    opciones:[{t:"My Melody"},{t:"Cinnamoroll"},{t:"Pompompurin"},{t:"Hello Kitty"},{t:"Gudetama"},{t:"Keroppi"}] },
  { id:"fab01", categoria:"Lápices de grafito", nombre:"Set lápices grafito Faber-Castell", precio:18990, img:"/assets/img/faber-castell-set.jpg", desc:"Set de lápices de grafito Faber-Castell (HB–2B); incluye borrador y sacapuntas." },
  { id:"gom02", categoria:"Borradores", nombre:"Borrador eléctrico recargable", precio:11990, img:"/assets/img/goma-electrica.jpg", desc:"Borrador eléctrico recargable por USB." },
  { id:"gom01", categoria:"Borradores", nombre:"Borradores degradé (pack 3)", precio:1990, img:"/assets/img/gomas-de-colores.jpg", desc:"Pack de 3 gomas degradé libres de látex.",
    opciones:[{t:"Verde/Azul"},{t:"Rosa/Celeste"},{t:"Mix pastel"}] },
  { id:"lap10", categoria:"Lápices de colores", nombre:"Set lápices de colores – 10 unidades", precio:3990, img:"/assets/img/lapices-10.jpg", desc:"Set de 10 lápices de color de mina suave." },
  { id:"lap25", categoria:"Lápices de colores", nombre:"Set lápices de colores – 25 unidades", precio:7990, img:"/assets/img/lapices-25.jpg", desc:"Set de 25 lápices de color; minas resistentes." },
  { id:"lap30", categoria:"Lápices de colores", nombre:"Set lápices de colores – 30 unidades", precio:20000, img:"/assets/img/lapices-30.jpg", desc:"Set de 30 lápices de color; incluye tonos piel y pasteles." },
  { id:"pinc01", categoria:"Pinceles / Acuarela", nombre:"Pinceles para acuarela (pack)", precio:8990, img:"/assets/img/pinceles-acuarelas.jpg", desc:"Pack de pinceles para acuarela." },
  { id:"post01", categoria:"Notas adhesivas", nombre:"Notas adhesivas Cinnamoroll / Pompompurin", precio:2990, img:"/assets/img/postit-cinnamoroll-pompompurin.jpg", desc:"Notas adhesivas oficiales Sanrio." },
  { id:"post02", categoria:"Notas adhesivas", nombre:"Notas adhesivas Kuromi / My Melody", precio:2990, img:"/assets/img/postit-kuromi-mymelody.jpg", desc:"Notas adhesivas con 3 diseños." },
  { id:"post03", categoria:"Notas adhesivas", nombre:"Notas adhesivas Pochacco / Hello Kitty", precio:2990, img:"/assets/img/postit-pochacco-hellokitty.jpg", desc:"Notas adhesivas de colores suaves." },
  { id:"saca01", categoria:"Sacapuntas", nombre:"Sacapuntas + borrador 2 en 1", precio:3490, img:"/assets/img/sacapuntas-borrador.jpg", desc:"Sacapuntas con depósito y borrador integrado." },
  { id:"bol01", categoria:"Bolígrafos", nombre:"Bolígrafos Sakura gel (pack)", precio:9990, img:"/assets/img/sakura-boligrafos.jpg", desc:"Bolígrafos Sakura de tinta gel pigmentada." },
  { id:"set02", categoria:"Sets", nombre:"Set papelería “Gato Azul”", precio:10990, img:"/assets/img/set-gato-azul.jpg", desc:"Set temático gato azul." },
  { id:"set01", categoria:"Sets", nombre:"Set papelería “Gato Rosado”", precio:10990, img:"/assets/img/set-gato-rosado.jpg", desc:"Set temático gato rosado." },
  { id:"washi60", categoria:"Cintas / Washi", nombre:"Set 60 washi tapes", precio:16990, img:"/assets/img/set60-cintas.jpg", desc:"Mega set de 60 washi tapes." },
  { id:"clip01", categoria:"Clips / Accesorios", nombre:"Clips decorativos “Click” (pack)", precio:2990, img:"/assets/img/set-de-click.jpg", desc:"Pack de clips decorativos tipo botón.",
    opciones:[{t:"Lila"},{t:"Menta"},{t:"Celeste"}] },
  { id:"tij01", categoria:"Tijeras", nombre:"Tijeras My Melody", precio:6990, img:"/assets/img/tijeras-my-melody.jpg", desc:"Tijeras con funda, filo inoxidable y agarre cómodo.",
    opciones:[{t:"Lila"},{t:"Rosa"},{t:"Celeste"}] },
  { id:"washi04", categoria:"Cintas / Washi", nombre:"Washi tape de flores vintage", precio:3490, img:"/assets/img/washi-tape-flores.jpg", desc:"Washi tape de flores estilo vintage." },
  // Digitales
  { id:"todo-hk", categoria:"Planners / To-Do", nombre:"To do list — Hello Kitty", precio:1990, img:"/assets/img/to-do-list-hello-kitty.jpg", desc:"To do list temático Hello Kitty." },
  { id:"todo-kuromi", categoria:"Planners / To-Do", nombre:"To do list — Kuromi", precio:1990, img:"/assets/img/to-do-list-kuromi.jpg", desc:"To do list con diseño Kuromi." },
  { id:"todo-sailor", categoria:"Planners / To-Do", nombre:"To do list — Sailor Moon", precio:1990, img:"/assets/img/to-do-list-sailor-moon.jpg", desc:"To do list Sailor Moon." },
  { id:"plan-hk", categoria:"Planners / To-Do", nombre:"Planner semanal — Hello Kitty", precio:2990, img:"/assets/img/planner-semanal-hello-kitty.jpg", desc:"Planner semanal Hello Kitty." },
  { id:"plan-kuromi", categoria:"Planners / To-Do", nombre:"Planner semanal — Kuromi", precio:2990, img:"/assets/img/planner-kuromi.jpg", desc:"Planner semanal Kuromi." },
  { id:"plan-sailor", categoria:"Planners / To-Do", nombre:"Planner semanal — Sailor Moon", precio:2990, img:"/assets/img/planner-semanal-sailor-moon.jpg", desc:"Planner semanal Sailor Moon." }
];

const CATALOG_KEY = "nf_catalog_custom_v1";
const toCLP = (n) => n.toLocaleString("es-CL",{style:"currency",currency:"CLP"});
const loadCustom = () => { try {return JSON.parse(localStorage.getItem(CATALOG_KEY)||"[]");} catch {return [];} };

function mergeCatalog() {
  const map = new Map(base.map(p=>[p.id,p]));
  loadCustom().forEach(p=>{
    const cp = {...p};
    if (typeof cp.img==="string" && cp.img.startsWith("../")) cp.img = cp.img.replace(/^\.\.\//,"/");
    if (typeof cp.img==="string" && !cp.img.startsWith("/")) cp.img = "/"+cp.img.replace(/^\/+/,"");
    map.set(cp.id, cp);
  });
  return Array.from(map.values());
}

export default function CategoriasPage(){
  const location = useLocation();
  const isActive = (p) => {
    if (p === "/") return location.pathname === "/";
    return location.pathname.startsWith(p) ? "active" : "";
  };

  const catalogo = useMemo(()=>mergeCatalog(),[]);
  useEffect(()=>{ window.scrollTo(0,0); },[]);

  // Estado filtros y paginación
  const [filtroCat, setFiltroCat] = useState("Todos");
  const [precioMin, setPrecioMin] = useState(1000);
  const [precioMax, setPrecioMax] = useState("");
  const [pagina, setPagina] = useState(1);
  const porPagina = 8;

  // Filtrado
  const productosFiltrados = catalogo.filter(p=>{
    const catOk = filtroCat === "Todos" || p.categoria === filtroCat;
    const minOk = precioMin === "" ? true : p.precio >= parseInt(precioMin);
    const maxOk = precioMax === "" ? true : p.precio <= parseInt(precioMax);
    return catOk && minOk && maxOk;
  });

  // Paginación
  const totalPaginas = Math.ceil(Math.max(1, productosFiltrados.length) / porPagina);
  const inicio = (pagina - 1) * porPagina;
  const productosPagina = productosFiltrados.slice(inicio, inicio + porPagina);

  useEffect(()=>{ if(pagina>totalPaginas) setPagina(1); },[totalPaginas,pagina]);
  const cambiarPagina = (nueva) => { if (nueva >= 1 && nueva <= totalPaginas) setPagina(nueva); };

  return (
    <>
      {/* HEADER (igual sitio) */}
      <div className="top-bar">
        <div className="info-envios"><span>ENVÍOS GRATIS DESDE $24.990</span></div>
        <div className="derecha-redes-sociales">
          <Link to="/cambios">Cambios o Devoluciones</Link>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope"></i></a>
        </div>
      </div>

      <header>
        <div className="header-superior">
          <div className="logo"><Link to="/"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></Link></div>
          <div className="busqueda">
            <form onSubmit={(e)=>e.preventDefault()}>
              <input type="text" placeholder="Buscar productos..." />
              <button type="submit"><i className="bi bi-search"></i></button>
            </form>
          </div>
          <div className="usuario-carrito">
            <div className="dropdown">
              <button className="btn-acceder">ACCEDER</button>
              <div className="dropdown-content">
                <Link to="/login">Iniciar Sesión</Link>
                <Link to="/register">Registrarse</Link>
              </div>
            </div>
            <Link to="/carrito" style={{ textDecoration: "none" }}>
              <div className="carrito"><i className="bi bi-bag"></i><span className="contador" id="contador">0</span></div>
            </Link>
          </div>
        </div>

        <nav className="barra-tareas">
          <ul>
            <li><Link className={isActive("/")} to="/">INICIO</Link></li>
            <li><Link className={isActive("/productos")} to="/productos">PRODUCTOS</Link></li>
            <li><Link className={"active " + isActive("/categorias")} to="/categorias">CATEGORÍAS</Link></li>
            <li><Link className={isActive("/nosotros")} to="/nosotros">NOSOTROS</Link></li>
            <li><Link className={isActive("/blogs")} to="/blogs">BLOGS</Link></li>
            <li><Link className={isActive("/contacto")} to="/contacto">CONTACTO</Link></li>
          </ul>
        </nav>
      </header>

      {/* CONTENIDO */}
      <main className="page-categorias" style={{width:"min(1100px,95%)", margin:"34px auto 40px", color:"#fff"}}>
        <h1 style={{ margin: "0 0 12px" }}>Catálogo de productos</h1>

        {/* Filtros */}
        <div style={{
          display:"flex",
          flexWrap:"wrap",
          justifyContent:"space-between",
          alignItems:"center",
          gap:16,
          marginTop:"10px",
          marginBottom:18,
          background:"rgba(255,255,255,0.08)",
          padding:"16px 18px",
          borderRadius:16,
          boxShadow:"0 4px 10px rgba(30,27,75,.2)"
        }}>
          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <label style={{fontWeight:600}}>Categoría:</label>
            <select value={filtroCat} onChange={e=>{setFiltroCat(e.target.value); setPagina(1);}}
                    style={{padding:"8px 10px", borderRadius:8, border:"1px solid #ccc"}}>
              <option>Todos</option>
              {Array.from(new Set(catalogo.map(p=>p.categoria))).map(cat=>(
                <option key={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <label style={{fontWeight:600}}>Precio mínimo:</label>
            <input
              type="number"
              min={1000}
              step={500}
              value={precioMin}
              onChange={(e)=>{setPrecioMin(e.target.value === "" ? "" : Math.max(1000, Number(e.target.value))); setPagina(1);}}
              style={{width:110, padding:"8px", borderRadius:8, border:"1px solid #ccc"}}
            />
          </div>

          <div style={{display:"flex", alignItems:"center", gap:8}}>
            <label style={{fontWeight:600}}>Precio máximo:</label>
            <input
              type="number"
              min={1000}
              step={500}
              value={precioMax}
              onChange={(e)=>{setPrecioMax(e.target.value === "" ? "" : Math.max(1000, Number(e.target.value))); setPagina(1);}}
              style={{width:110, padding:"8px", borderRadius:8, border:"1px solid #ccc"}}
            />
          </div>

          <button
            onClick={()=>{setFiltroCat("Todos"); setPrecioMin(1000); setPrecioMax(""); setPagina(1);}}
            style={{
              background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
              color:"#fff", border:"none", borderRadius:10, padding:"10px 16px",
              fontWeight:"bold", cursor:"pointer", boxShadow:"0 8px 18px rgba(124,58,237,.25)"
            }}>
            Limpiar filtros
          </button>
        </div>

        {/* Grilla */}
        <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(240px,1fr))", gap:18}}>
          {productosPagina.map(p=>(
            <Link key={p.id} to={`/producto/${p.id}`} style={{textDecoration:"none", color:"#fff"}}>
              <article style={{
                border:"2px solid transparent",
                borderRadius:14,
                padding:10,
                background:"#ffffff",
                transition:"transform .2s ease, box-shadow .2s ease, border-color .3s ease"
              }}
              onMouseEnter={e=>{
                e.currentTarget.style.transform="translateY(-4px)";
                e.currentTarget.style.boxShadow="0 10px 22px rgba(124,58,237,.25)";
                e.currentTarget.style.borderColor="#a78bfa";
              }}
              onMouseLeave={e=>{
                e.currentTarget.style.transform="translateY(0)";
                e.currentTarget.style.boxShadow="0 6px 14px rgba(30,27,75,.08)";
                e.currentTarget.style.borderColor="transparent";
              }}>
                <div style={{width:"100%", aspectRatio:"4/3", overflow:"hidden", borderRadius:10}}>
                  <img
                    src={p.img || "/assets/img/placeholder.jpg"}
                    alt={p.nombre}
                    style={{width:"100%", height:"100%", objectFit:"cover", transition:"transform .4s ease"}}
                    onMouseEnter={e => { e.currentTarget.style.transform = "scale(1.05)"; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = "scale(1)"; }}
                  />
                </div>
                <div style={{fontWeight:700, marginTop:6, color:"#3a2a63"}}>{p.nombre}</div>
                <div style={{fontSize:13, color:"#6b5aa6"}}>{p.categoria}</div>
                <div style={{fontWeight:900, color:"#3a2a63"}}>{toCLP(p.precio)}</div>
              </article>
            </Link>
          ))}
        </div>

        {/* Paginación */}
        <div style={{marginTop:28, display:"flex", justifyContent:"center", alignItems:"center", gap:10}}>
          <button onClick={()=>cambiarPagina(pagina-1)} disabled={pagina===1}
                  style={{padding:"8px 12px", borderRadius:8, border:"none",
                          background:"#7c3aed", color:"#fff", cursor:"pointer", opacity:pagina===1?0.5:1}}>◀</button>
          <span style={{fontWeight:"bold"}}>Página {pagina} de {totalPaginas}</span>
          <button onClick={()=>cambiarPagina(pagina+1)} disabled={pagina===totalPaginas}
                  style={{padding:"8px 12px", borderRadius:8, border:"none",
                          background:"#7c3aed", color:"#fff", cursor:"pointer", opacity:pagina===totalPaginas?0.5:1}}>▶</button>
        </div>
      </main>

      {/* FOOTER */}
      <section className="final-final">
        <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
        <div className="final-contenido">
          <div className="final-logo"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
          <div className="final-texto">
            <p>Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital.</p>
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
