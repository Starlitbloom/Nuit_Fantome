// src/pages/ProductoDetallePage.jsx
import React, { useEffect, useMemo, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";

/* ===== Catálogo base (mismo de Productos/Carrito) ===== */
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
  { id:"post01", categoria:"Notas adhesivas", nombre:"Notas adhesivas Cinnamoroll / Pompompurin", precio:2990, img:"/assets/img/postit-cinnamoroll-pompompurin.jpg", desc:"Notas adhesivas oficiales Sanrio.",
    opciones:[{t:"Cinnamoroll"},{t:"Pompompurin"}] },
  { id:"post02", categoria:"Notas adhesivas", nombre:"Notas adhesivas Kuromi / My Melody", precio:2990, img:"/assets/img/postit-kuromi-mymelody.jpg", desc:"Notas adhesivas con 3 diseños.",
    opciones:[{t:"Kuromi"},{t:"My Melody"}] },
  { id:"post03", categoria:"Notas adhesivas", nombre:"Notas adhesivas Pochacco / Hello Kitty", precio:2990, img:"/assets/img/postit-pochacco-hellokitty.jpg", desc:"Notas adhesivas de colores suaves.",
    opciones:[{t:"Pochacco"},{t:"Hello Kitty"}] },
  { id:"saca01", categoria:"Sacapuntas", nombre:"Sacapuntas + borrador 2 en 1", precio:3490, img:"/assets/img/sacapuntas-borrador.jpg", desc:"Sacapuntas con depósito y borrador integrado.",
    opciones:[{t:"Celeste"},{t:"Rosa"},{t:"Lila"},{t:"Verde"}] },
  { id:"bol01", categoria:"Bolígrafos", nombre:"Bolígrafos Sakura gel (pack)", precio:9990, img:"/assets/img/sakura-boligrafos.jpg", desc:"Bolígrafos Sakura de tinta gel pigmentada." },
  { id:"set02", categoria:"Sets", nombre:"Set papelería “Gato Azul”", precio:10990, img:"/assets/img/set-gato-azul.jpg", desc:"Set temático gato azul." },
  { id:"set01", categoria:"Sets", nombre:"Set papelería “Gato Rosado”", precio:10990, img:"/assets/img/set-gato-rosado.jpg", desc:"Set temático gato rosado." },
  { id:"washi60", categoria:"Cintas / Washi", nombre:"Set 60 washi tapes", precio:16990, img:"/assets/img/set60-cintas.jpg", desc:"Mega set de 60 washi tapes." },
  { id:"clip01", categoria:"Clips / Accesorios", nombre:"Clips decorativos “Click” (pack)", precio:2990, img:"/assets/img/set-de-click.jpg", desc:"Pack de clips decorativos tipo botón.",
    opciones:[{t:"Lila"},{t:"Menta"},{t:"Celeste"}] },
  { id:"tij01", categoria:"Tijeras", nombre:"Tijeras My Melody", precio:6990, img:"/assets/img/tijeras-my-melody.jpg", desc:"Tijeras con funda, filo inoxidable y agarre cómodo.",
    opciones:[{t:"Lila"},{t:"Rosa"},{t:"Celeste"}] },
  { id:"washi04", categoria:"Cintas / Washi", nombre:"Washi tape de flores vintage", precio:3490, img:"/assets/img/washi-tape-flores.jpg", desc:"Washi tape de flores estilo vintage.",
    opciones:[{t:"Morado"},{t:"Rosa"},{t:"Dorado"}] },
  { id:"todo-hk", categoria:"Planners / To-Do", nombre:"To do list — Hello Kitty", precio:1990, img:"/assets/img/to-do-list-hello-kitty.jpg", desc:"To do list temático Hello Kitty." },
  { id:"todo-kuromi", categoria:"Planners / To-Do", nombre:"To do list — Kuromi", precio:1990, img:"/assets/img/to-do-list-kuromi.jpg", desc:"To do list con diseño Kuromi." },
  { id:"todo-sailor", categoria:"Planners / To-Do", nombre:"To do list — Sailor Moon", precio:1990, img:"/assets/img/to-do-list-sailor-moon.jpg", desc:"To do list Sailor Moon." },
  { id:"plan-hk", categoria:"Planners / To-Do", nombre:"Planner semanal — Hello Kitty", precio:2990, img:"/assets/img/planner-semanal-hello-kitty.jpg", desc:"Planner semanal Hello Kitty." },
  { id:"plan-kuromi", categoria:"Planners / To-Do", nombre:"Planner semanal — Kuromi", precio:2990, img:"/assets/img/planner-kuromi.jpg", desc:"Planner semanal Kuromi." },
  { id:"plan-sailor", categoria:"Planners / To-Do", nombre:"Planner semanal — Sailor Moon", precio:2990, img:"/assets/img/planner-semanal-sailor-moon.jpg", desc:"Planner semanal Sailor Moon." }
];

const CATALOG_KEY = "nf_catalog_custom_v1";
const CART_KEY    = "nf_cart";
const toCLP = (n) => n.toLocaleString("es-CL",{style:"currency",currency:"CLP"});
const loadCustom = () => { try {return JSON.parse(localStorage.getItem(CATALOG_KEY)||"[]");} catch {return [];} };
const loadCart   = () => { try {return JSON.parse(localStorage.getItem(CART_KEY)||"[]");} catch {return [];} };
const saveCart   = (c)  => { localStorage.setItem(CART_KEY, JSON.stringify(c)); };

function mergeCatalog() {
  const map = new Map(base.map(p=>[p.id,p]));
  loadCustom().forEach(p=>{
    const cp = {...p};
    if (typeof cp.img==="string" && cp.img.startsWith("../")) cp.img = cp.img.replace(/^\.\.\//,"/");
    map.set(cp.id, cp);
  });
  return Array.from(map.values());
}

// Vistos recientes
const RECENTS_KEY = "nf_recent";
const getRecents  = () => { try {return JSON.parse(localStorage.getItem(RECENTS_KEY)||"[]");} catch {return [];} };
const pushRecent  = (id) => {
  const s = new Set([id, ...getRecents()]);
  const arr = Array.from(s).slice(0,12);
  localStorage.setItem(RECENTS_KEY, JSON.stringify(arr));
};

export default function ProductoDetallePage(){
  const { id } = useParams();
  const navigate = useNavigate();
  const catalogo = useMemo(()=>mergeCatalog(),[]);
  const prod     = useMemo(()=>catalogo.find(p=>p.id===id),[catalogo,id]);

  const [opt, setOpt]   = useState(prod?.opciones?.[0]?.t || "");
  const [qty, setQty]   = useState(1);

  useEffect(()=>{ if(prod){ pushRecent(prod.id); setOpt(prod.opciones?.[0]?.t || ""); setQty(1);} },[prod]);

  if(!prod){
    return (
      <main style={{padding:24, color:"#fff"}}>
        <p>Producto no encontrado.</p>
        <button className="btn" onClick={()=>navigate("/productos")}>Volver a productos</button>
      </main>
    );
  }

  const recents = getRecents().filter(x=>x!==prod.id).map(rid=>catalogo.find(p=>p.id===rid)).filter(Boolean).slice(0,8);
  const relacionados = catalogo.filter(p=>p.categoria===prod.categoria && p.id!==prod.id).slice(0,8);

  function addToCart(){
    const cart = loadCart();
    const keyOpt = opt || "";
    const it = cart.find(i=>i.id===prod.id && (i.opt||"")===keyOpt);
    if(it) it.qty += qty; else cart.push({id:prod.id, qty, opt:keyOpt});
    saveCart(cart);
    alert("🛒 Agregado al carrito.");
  }

  return (
    <>
      <main style={{width:"min(1100px,95%)", margin:"24px auto 32px", color:"#fff"}}>
        <nav style={{marginBottom:12, fontSize:14, color:"#ccc"}}>
          <Link to="/productos" style={{color:"#fff"}}>Productos</Link> / <span>{prod.nombre}</span>
        </nav>

        <section style={{display:"grid", gridTemplateColumns:"1fr 1fr", gap:24}}>
          <img src={prod.img || "/assets/img/placeholder.jpg"} alt={prod.nombre}
               style={{width:"100%", borderRadius:12, border:"1px solid #eee9ff"}} />

          <div>
            <h1 style={{margin:"0 0 6px", color:"#fff"}}>{prod.nombre}</h1>
            <div style={{color:"#fff"}}>{prod.categoria}</div>
            <div style={{fontSize:24, fontWeight:900, margin:"12px 0", color:"#fff"}}>{toCLP(prod.precio)}</div>
            <p style={{lineHeight:1.5, color:"#fff"}}>{prod.desc}</p>

            {Array.isArray(prod.opciones) && prod.opciones.length>0 && (
              <div style={{marginTop:10}}>
                <label style={{color:"#fff"}}>Opción:&nbsp;</label>
                <select value={opt} onChange={e=>setOpt(e.target.value)} style={{padding:8, borderRadius:8}}>
                  {prod.opciones.map(o=><option key={o.t} value={o.t}>{o.t}</option>)}
                </select>
              </div>
            )}

            <div style={{display:"flex", gap:8, marginTop:12}}>
              <input type="number" min={1} value={qty} onChange={e=>setQty(Math.max(1, e.target.value|0))}
                     style={{width:90, textAlign:"center", padding:8, borderRadius:8, border:"1px solid #eee9ff"}} />
              <button className="btn" onClick={addToCart}
                      style={{background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)", color:"#fff",
                              border:0, borderRadius:12, padding:"10px 14px", fontWeight:800}}>
                Agregar al carrito
              </button>
            </div>
          </div>
        </section>

        {/* Vistos recientemente */}
        {recents.length>0 && (
          <>
            <h3 style={{margin:"28px 0 12px", color:"#fff"}}>Vistos recientemente</h3>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12}}>
              {recents.map(p=>(
                <Link key={p.id} to={`/producto/${p.id}`} style={{textDecoration:"none", color:"#fff"}}>
                  <article style={{border:"1px solid #eee9ff", borderRadius:12, padding:10}}>
                    <img src={p.img} alt={p.nombre} style={{width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:10}} />
                    <div style={{fontWeight:700, marginTop:6}}>{p.nombre}</div>
                    <div style={{fontSize:13, color:"#ccc"}}>{p.categoria}</div>
                    <div style={{fontWeight:900}}>{toCLP(p.precio)}</div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}

        {/* Recomendados */}
        {relacionados.length>0 && (
          <>
            <h3 style={{margin:"28px 0 12px", color:"#fff"}}>También te puede interesar</h3>
            <div style={{display:"grid", gridTemplateColumns:"repeat(auto-fill,minmax(180px,1fr))", gap:12}}>
              {relacionados.map(p=>(
                <Link key={p.id} to={`/producto/${p.id}`} style={{textDecoration:"none", color:"#fff"}}>
                  <article style={{border:"1px solid #eee9ff", borderRadius:12, padding:10}}>
                    <img src={p.img} alt={p.nombre} style={{width:"100%", aspectRatio:"1/1", objectFit:"cover", borderRadius:10}} />
                    <div style={{fontWeight:700, marginTop:6}}>{p.nombre}</div>
                    <div style={{fontSize:13, color:"#ccc"}}>{p.categoria}</div>
                    <div style={{fontWeight:900}}>{toCLP(p.precio)}</div>
                  </article>
                </Link>
              ))}
            </div>
          </>
        )}
      </main>

      {/* Pie igual */}
      <section className="final-final">
        <img src="/assets/img/fondo_footer.png" alt="Fondo final" className="final-bg" />
        <div className="final-contenido">
          <div className="final-logo"><img src="/assets/img/logo.png" alt="Logo Nuit Fantome" /></div>
          <div className="final-texto">
            <p style={{color:"#fff"}}>Te ayudamos a planificar para lograrlo todo con nuestra papelería física y digital.</p>
          </div>
          <div className="final-redes">
            <div className="siguenos" style={{color:"#fff"}}>Síguenos</div>
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
          <div className="footer-texto" style={{color:"#fff"}}>© 2025 Nuit Fantome. Todos los derechos reservados.</div>
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
