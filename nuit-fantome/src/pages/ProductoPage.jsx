// src/pages/ProductoPage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";

/* =======================
   Catálogo base (igual al HTML)
   ======================= */
let productosBase =  [
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
  { id:"post01", categoria:"Notas adhesivas", nombre:"Notas adhesivas Cinnamoroll / Pompompurin", precio:2990, img:"assets/img/postit-cinnamoroll-pompompurin.jpg", desc:"Notas adhesivas oficiales Sanrio." },
  { id:"post02", categoria:"Notas adhesivas", nombre:"Notas adhesivas Kuromi / My Melody", precio:2990, img:"assets/img/postit-kuromi-mymelody.jpg", desc:"Notas adhesivas con 3 diseños." },
  { id:"post03", categoria:"Notas adhesivas", nombre:"Notas adhesivas Pochacco / Hello Kitty", precio:2990, img:"assets/img/postit-pochacco-hellokitty.jpg", desc:"Notas adhesivas de colores suaves." },
  { id:"saca01", categoria:"Sacapuntas", nombre:"Sacapuntas + borrador 2 en 1", precio:3490, img:"assets/img/sacapuntas-borrador.jpg", desc:"Sacapuntas con depósito y borrador integrado." },
  { id:"bol01", categoria:"Bolígrafos", nombre:"Bolígrafos Sakura gel (pack)", precio:9990, img:"assets/img/sakura-boligrafos.jpg", desc:"Bolígrafos Sakura de tinta gel pigmentada." },
  { id:"set02", categoria:"Sets", nombre:"Set papelería “Gato Azul”", precio:10990, img:"assets/img/set-gato-azul.jpg", desc:"Set temático gato azul." },
  { id:"set01", categoria:"Sets", nombre:"Set papelería “Gato Rosado”", precio:10990, img:"assets/img/set-gato-rosado.jpg", desc:"Set temático gato rosado." },
  { id:"washi60", categoria:"Cintas / Washi", nombre:"Set 60 washi tapes", precio:16990, img:"assets/img/set60-cintas.jpg", desc:"Mega set de 60 washi tapes." },
  { id:"clip01", categoria:"Clips / Accesorios", nombre:"Clips decorativos “Click” (pack)", precio:2990, img:"assets/img/set-de-click.jpg", desc:"Pack de clips decorativos tipo botón." },
  { id:"tij01", categoria:"Tijeras", nombre:"Tijeras My Melody", precio:6990, img:"assets/img/tijeras-my-melody.jpg", desc:"Tijeras con funda, filo inoxidable y agarre cómodo." },
  { id:"washi04", categoria:"Cintas / Washi", nombre:"Washi tape de flores vintage", precio:3490, img:"assets/img/washi-tape-flores.jpg", desc:"Washi tape de flores estilo vintage." },
  // Digitales
  { id:"todo-hk", categoria:"Planners / To-Do", nombre:"To do list — Hello Kitty", precio:1990, img:"assets/img/to-do-list-hello-kitty.jpg", desc:"To do list temático Hello Kitty." },
  { id:"todo-kuromi", categoria:"Planners / To-Do", nombre:"To do list — Kuromi", precio:1990, img:"assets/img/to-do-list-kuromi.jpg", desc:"To do list con diseño Kuromi." },
  { id:"todo-sailor", categoria:"Planners / To-Do", nombre:"To do list — Sailor Moon", precio:1990, img:"assets/img/to-do-list-sailor-moon.jpg", desc:"To do list Sailor Moon." },
  { id:"plan-hk", categoria:"Planners / To-Do", nombre:"Planner semanal — Hello Kitty", precio:2990, img:"assets/img/planner-semanal-hello-kitty.jpg", desc:"Planner semanal Hello Kitty." },
  { id:"plan-kuromi", categoria:"Planners / To-Do", nombre:"Planner semanal — Kuromi", precio:2990, img:"assets/img/planner-kuromi.jpg", desc:"Planner semanal Kuromi." },
  { id:"plan-sailor", categoria:"Planners / To-Do", nombre:"Planner semanal — Sailor Moon", precio:2990, img:"assets/img/planner-semanal-sailor-moon.jpg", desc:"Planner semanal Sailor Moon." }
];

/* ========= Merge con catálogo guardado en Admin ========= */
const CATALOG_KEY = "nf_catalog_custom_v1";
const deepClone = (o) => JSON.parse(JSON.stringify(o || {}));
const loadCustomArr = () => { try{ return JSON.parse(localStorage.getItem(CATALOG_KEY)||"[]"); }catch{ return []; } };
const saveCustomArr = (arr) => localStorage.setItem(CATALOG_KEY, JSON.stringify(arr));
function mergeCatalog() {
  const baseMap = new Map(productosBase.map(p => [p.id, p]));
  loadCustomArr().forEach(p => {
    const cp = { ...p };
    if (typeof cp.img === "string" && cp.img.startsWith("../")) cp.img = cp.img.replace(/^\.\.\//, "");
    baseMap.set(cp.id, cp);
  });
  return Array.from(baseMap.values());
}

/* ========= Stock compartido ========= */
function getUnifiedStockFor(id, optName){
  const p = loadCustomArr().find(x=>x.id===id);
  if(!p) return null;
  if(optName){
    const o = (p.opciones||[]).find(x=>x.t===optName);
    if(o){ if(typeof o.s==="number") return o.s; if(typeof o.stock==="number") return o.stock; }
    return null;
  }
  if(typeof p.stock==="number") return p.stock;
  return null;
}
function persistStockChange(id, opt, delta){
  const arr = loadCustomArr();
  let p = arr.find(x=>x.id===id);
  if(!p){
    const base = deepClone(productosBase.find(z=>z.id===id)) || { id };
    p = { id, ...base }; arr.push(p);
  }
  if(opt){
    if(!Array.isArray(p.opciones)) p.opciones = [];
    let oo = p.opciones.find(o=>o.t===opt);
    if(!oo){ oo = { t: opt, s: 0 }; p.opciones.push(oo); }
    oo.s = Math.max(0, Number(oo.s||0) + delta);
  }else{
    p.stock = Math.max(0, Number(p.stock||0) + delta);
  }
  saveCustomArr(arr);
}

/* ========= Carrito / recientes ========= */
const CART_KEY = "nf_cart";
const RECENT_KEY = "nf_recent";
const toCLP = (n)=> n.toLocaleString("es-CL",{ style:"currency", currency:"CLP" });
const loadCart = ()=> { try{ return JSON.parse(localStorage.getItem(CART_KEY))||[]; }catch{ return []; } };
const saveCart = (c)=> {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
  const elTop = document.getElementById("contador");
  if(elTop) elTop.textContent = c.reduce((a,b)=>a + (b.qty||0), 0);
};
const loadRecent = ()=> { try{ return JSON.parse(localStorage.getItem(RECENT_KEY))||[]; }catch{ return []; } };
const saveRecent = (arr)=> localStorage.setItem(RECENT_KEY, JSON.stringify(arr));
function addRecentlyViewed(id){
  let arr = loadRecent().filter(x=>x!==id);
  arr.unshift(id);
  if(arr.length>12) arr = arr.slice(0,12);
  saveRecent(arr);
}

/* =======================
   Página de Detalle de Producto
   ======================= */
export default function ProductoPage(){
  const { id } = useParams();
  const productos = useMemo(()=> mergeCatalog(), []);
  const p = useMemo(()=> productos.find(x=>x.id===id) || productos[0], [productos, id]);

  const [selectedOpt, setSelectedOpt] = useState(p?.opciones?.[0]?.t || "");
  const [qty, setQty] = useState(1);
  const [showOptModal, setShowOptModal] = useState(false);
  const disp = getUnifiedStockFor(p?.id, p?.opciones ? (selectedOpt||"") : "");

  // Header: dropdown ACCEDER como en el resto del sitio
  useEffect(()=>{
    const btn = document.querySelector(".btn-acceder");
    const dd = document.querySelector(".dropdown-content");
    if (!btn || !dd) return;
    const toggle = ()=> { dd.style.display = (dd.style.display === "block") ? "none" : "block"; };
    const closeOutside = (e)=>{ if(!e.target.matches(".btn-acceder") && dd.style.display==="block"){ dd.style.display="none"; } };
    btn.addEventListener("click", toggle);
    window.addEventListener("click", closeOutside);
    return ()=> { btn.removeEventListener("click", toggle); window.removeEventListener("click", closeOutside); };
  }, []);

  // Sincroniza contador + agrega a “vistos”
  useEffect(()=>{
    saveCart(loadCart());
    if(p?.id) addRecentlyViewed(p.id);
  }, [p?.id]);

  useEffect(()=>{
    // Si cambia de producto, resetea selección
    setSelectedOpt(p?.opciones?.[0]?.t || "");
    setQty(1);
  }, [p?.id]);

  if(!p) return null;

  function handleAdd(){
    let q = Math.max(1, parseInt(qty,10) || 1);
    if(p.opciones && !selectedOpt){
      alert("Elige un diseño antes de añadir al carrito.");
      setShowOptModal(true);
      return;
    }
    const available = getUnifiedStockFor(p.id, p.opciones ? selectedOpt : "");
    if(available !== null && available <= 0){
      alert("Sin stock disponible para esta variante.");
      return;
    }
    if(available !== null && q > available){
      if(!window.confirm(`Solo quedan ${available}. ¿Añadir ${available} al carrito?`)) return;
      q = available;
    }
    const cart = loadCart();
    const it = cart.find(i => i.id===p.id && (i.opt||"") === (selectedOpt||""));
    if(it) it.qty += q; else cart.push({ id: p.id, qty: q, opt: selectedOpt||"" });
    if(available !== null) persistStockChange(p.id, selectedOpt||null, -q);
    saveCart(cart);
    alert(`🛒 Añadido${selectedOpt?` (${selectedOpt})`:''}`);
  }

  const relacionados = useMemo(()=>{
    let list = productos.filter(x=>x.id!==p.id && x.categoria===p.categoria);
    if(list.length<4) list = [...list, ...productos.filter(x=>x.id!==p.id && x.categoria!==p.categoria)];
    return list.slice(0,4);
  }, [productos, p]);

  const vistos = useMemo(()=>{
    const ids = loadRecent().filter(x=>x!==p.id);
    return ids.map(vid => productos.find(pp=>pp.id===vid)).filter(Boolean).slice(0,8);
  }, [p.id, productos]);

  return (
    <>
      {/* ===== Top bar + Header ===== */}
      <div className="top-bar">
        <div className="info-envios"><span>ENVÍOS GRATIS DESDE $24.990</span></div>
        <div className="derecha-redes-sociales">
          <a href="/cambios.html">Cambios o Devoluciones</a>
          <a href="https://instagram.com" target="_blank" rel="noreferrer"><i className="fab fa-instagram"></i></a>
          <a href="https://facebook.com" target="_blank" rel="noreferrer"><i className="fab fa-facebook-f"></i></a>
          <a href="mailto:contacto@nuitfantome.com"><i className="fas fa-envelope"></i></a>
        </div>
      </div>
      <header>
        <div className="header-superior">
          <div className="logo"><a href="/"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></a></div>
          <div className="busqueda" style={{display:"none"}} />
          <div className="usuario-carrito">
            <div className="dropdown">
              <button className="btn-acceder">ACCEDER</button>
              <div className="dropdown-content">
                <a href="/login.html">Iniciar Sesión</a>
                <a href="/register.html">Registrarse</a>
              </div>
            </div>
            <a href="/carrito.html" style={{ textDecoration:"none" }}>
              <div className="carrito"><i className="bi bi-bag"></i><span className="contador" id="contador">0</span></div>
            </a>
          </div>
        </div>
        <nav className="barra-tareas">
          <ul>
            <li><a href="/">INICIO</a></li>
            <li><a className="active" href="/productos.html">PRODUCTOS</a></li>
            <li><a href="/nosotros.html">NOSOTROS</a></li>
            <li><a href="/blogs.html">BLOGS</a></li>
            <li><a href="/contacto.html">CONTACTO</a></li>
          </ul>
        </nav>
      </header>

      {/* ===== Cuerpo ===== */}
      <main className="container" style={{maxWidth:1200, margin:"0 auto", padding:16}}>
        {/* Migas */}
        <div className="breadcrumb" style={{fontSize:".9rem", margin:"16px 0", color:"#666"}}>
          <Link to="/">Inicio</Link> &nbsp;›&nbsp; <Link to="/productos">{
            p.categoria || "Categoría"
          }</Link> &nbsp;›&nbsp; <span className="muted">{p.nombre}</span>
        </div>

        <section className="product-layout" style={{
          display:"grid", gridTemplateColumns:"1.2fr 1fr", gap:24, alignItems:"start"
        }}>
          {/* Media */}
          <div className="product-media" style={{
            border:"1px solid #e5e5e5", borderRadius:12, padding:12, background:"#fff"
          }}>
            {p.img ? (
              <img className="main"
                   src={p.img}
                   alt={p.nombre}
                   style={{width:"100%", height:460, objectFit:"cover", borderRadius:10, background:"#2f2f2f"}} />
            ) : <div className="main" style={{height:460}} />}

            <div className="thumbs" style={{display:"flex", gap:8, marginTop:10, flexWrap:"wrap"}}>
              {[p.img,p.img,p.img].filter(Boolean).map((src, i)=>(
                <img key={i}
                     src={src}
                     alt={`thumb ${i+1}`}
                     style={{width:64, height:64, objectFit:"cover", borderRadius:8, border:"2px solid #ddd", cursor:"pointer"}}
                     onClick={(e)=>{
                       const main = e.currentTarget.closest(".product-media")?.querySelector(".main");
                       if(main) main.src = src;
                     }} />
              ))}
            </div>
          </div>

          {/* Info */}
          <div className="product-info">
            <h1 style={{margin:"0 0 6px"}}>{p.nombre}</h1>
            <div className="product-price" style={{color:"#9c27b0", fontWeight:700, fontSize:"1.2rem", margin:"6px 0 14px"}}>
              {toCLP(p.precio)}
            </div>

            {/* Disponibles si hay control de stock */}
            {disp !== null && (
              <div className="muted" id="dispTxt" style={{margin:"6px 0 10px", color:"#999"}}>
                Disponibles: {disp}
              </div>
            )}

            <p className="muted" style={{color:"#ddd"}}>{p.desc||""}</p>

            {/* Elegir diseño (modal) */}
            {Array.isArray(p.opciones) && p.opciones.length>0 && (
              <div className="opt-actions" style={{display:"flex", gap:12, alignItems:"center", margin:"12px 0"}}>
                <button className="btn-detalle"
                        onClick={()=>setShowOptModal(true)}
                        style={{
                          background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)", color:"#fff",
                          border:0, borderRadius:12, padding:"10px 14px", fontWeight:800, cursor:"pointer",
                          boxShadow:"0 8px 18px rgba(124,58,237,.25)"
                        }}>
                  Elegir diseño
                </button>
                <span id="optLabel" style={{background:"#f3f0ff", color:"#2b2452", borderRadius:999, padding:"6px 10px", fontWeight:700}}>
                  {selectedOpt ? `Elegido: ${selectedOpt}` : "Ninguno"}
                </span>
              </div>
            )}

            <div className="qty" style={{display:"flex", alignItems:"center", gap:10, margin:"10px 0"}}>
              <label htmlFor="qty">Cantidad</label>
              <input id="qty"
                     type="number"
                     min={1}
                     value={qty}
                     onChange={(e)=> setQty(Math.max(1, parseInt(e.target.value,10) || 1))}
                     style={{width:80, padding:8, border:"1px solid #ccc", borderRadius:8, textAlign:"center"}} />
            </div>

            <button className="btn-detalle add-to-cart"
                    onClick={handleAdd}
                    disabled={disp !== null && disp <= 0}
                    title={disp !== null && disp <= 0 ? "Sin stock" : "Añadir al carrito"}
                    style={{
                      background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)", color:"#fff",
                      border:0, borderRadius:12, padding:"10px 14px", fontWeight:800, cursor:"pointer",
                      boxShadow:"0 8px 18px rgba(124,58,237,.25)", opacity: (disp!==null && disp<=0)? .6 : 1
                    }}>
              {(disp !== null && disp <= 0) ? "Agotado" : "Añadir al carrito"}
            </button>
          </div>
        </section>

        {/* Relacionados */}
        <section className="section-grid" style={{padding:"28px 0"}}>
          <h3 style={{margin:"18px 0 10px", color:"#fff"}}>Productos relacionados</h3>
          <div className="cards" style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:16}}>
            {relacionados.map(r=>(
              <Link key={r.id} to={`/producto/${r.id}`} className="card" style={{
                background:"#fff", border:"1px solid #eee", borderRadius:12, padding:10, textDecoration:"none", color:"#2b254a"
              }}>
                {r.img ? <img className="ph" src={r.img} alt={r.nombre} style={{width:"100%", height:180, objectFit:"cover", borderRadius:10}}/> : <div className="ph" />}
                <div className="title" style={{fontWeight:700, display:"block", marginTop:6}}>{r.nombre}</div>
                <div className="price" style={{color:"#7c3aed", fontWeight:800}}>{toCLP(r.precio)}</div>
              </Link>
            ))}
          </div>
        </section>

        {/* Vistos recientemente */}
        <section className="section-grid" style={{padding:"28px 0"}}>
          <h3 style={{margin:"18px 0 10px", color:"#fff"}}>Productos que viste recientemente</h3>
          <div className="cards" style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(230px,1fr))", gap:16}}>
            {vistos.length ? vistos.map(v=>(
              <Link key={v.id} to={`/producto/${v.id}`} className="card" style={{
                background:"#fff", border:"1px solid #eee", borderRadius:12, padding:10, textDecoration:"none", color:"#2b254a"
              }}>
                {v.img ? <img className="ph" src={v.img} alt={v.nombre} style={{width:"100%", height:180, objectFit:"cover", borderRadius:10}}/> : <div className="ph" />}
                <div className="title" style={{fontWeight:700, display:"block", marginTop:6}}>{v.nombre}</div>
                <div className="price" style={{color:"#7c3aed", fontWeight:800}}>{toCLP(v.precio)}</div>
              </Link>
            )) : <div className="muted" style={{color:"#bbb"}}>Aún no has visto productos.</div>}
          </div>
        </section>
      </main>

      {/* ===== Modal de opciones ===== */}
      {showOptModal && Array.isArray(p.opciones) && (
        <div className="opt-modal show" role="dialog" aria-modal="true" aria-labelledby="optTitle"
             onClick={()=>setShowOptModal(false)}
             style={{position:"fixed", inset:0, zIndex:99999, display:"flex", alignItems:"center", justifyContent:"center"}}>
          <div className="scrim" style={{position:"absolute", inset:0, background:"rgba(17,16,40,.5)", backdropFilter:"blur(2px)"}} />
          <div className="box" onClick={(e)=>e.stopPropagation()}
               style={{position:"relative", zIndex:1, width:"min(720px,92vw)", background:"#fff", border:"1px solid #eee",
                       borderRadius:14, padding:16, boxShadow:"0 20px 40px rgba(30,27,75,.22)"}}>
            <h3 id="optTitle" style={{margin:"0 0 8px"}}>Elige un diseño</h3>
            <div className="opt-grid" style={{display:"grid", gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))", gap:12, marginTop:10}}>
              {p.opciones.map(o=>{
                const isSel = selectedOpt===o.t;
                return (
                  <button key={o.t} type="button"
                          onClick={()=>{ setSelectedOpt(o.t); setShowOptModal(false); }}
                          className={`opt-btn ${isSel?'selected':''}`}
                          style={{
                            border:`1px solid ${isSel?'#a78bfa':'#ece7ff'}`,
                            borderRadius:12, background:"#fff", cursor:"pointer", minHeight:96, padding:10, fontWeight:700,
                            boxShadow: isSel? "0 0 0 3px rgba(124,58,237,.20) inset" : "none"
                          }}>
                    {o.t}
                  </button>
                );
              })}
            </div>
            <div style={{marginTop:12, display:"flex", justifyContent:"flex-end", gap:8}}>
              <button className="btn-detalle" onClick={()=>setShowOptModal(false)}
                      style={{background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)", color:"#fff", border:0, borderRadius:12, padding:"10px 14px", fontWeight:800}}>
                Listo
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ===== Final-final + Footer ===== */}
      <section className="final-final">
        <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
        <div className="final-contenido">
          <div className="final-logo"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
          <div className="final-texto">
            <p>Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital. 
            Sabías que si tu escritorio tiene colores y te gusta, la motivación y la productividad llega por sí sola?</p>
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
