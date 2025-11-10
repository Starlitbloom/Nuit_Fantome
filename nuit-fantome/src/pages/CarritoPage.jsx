// src/pages/CarritoPage.jsx
import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

/* =================== Constantes =================== */
const CART_KEY    = "nf_cart";
const CATALOG_KEY = "nf_catalog_custom_v1";
const PREF_REGION = "nf_pref_region";
const ORDER_DRAFT = "nf_order_draft";
const ORDERS_KEY  = "nf_orders"; // historial de boletas

const UMBRAL_ENVIO_GRATIS_RM = 24990;
const COSTO_ENVIO_BASE       = 3490;

// Couriers (costos fijos referenciales)
const COSTO_STARKEN     = 4490;
const COSTO_CHILEXPRESS = 4990;
const COSTO_CORREOS     = 3990;

const toCLP = (n)=> (Number(n)||0).toLocaleString("es-CL",{style:"currency",currency:"CLP"});

// 👉 Datos para transferencia (edítalos con los reales de tu cuenta)
const TRANSFER_DATA = {
  titular: "Nuit Fantôme SpA",
  rut: "76.123.456-7",
  banco: "Banco Estado",
  tipo: "Cuenta Vista",
  numero: "12345678",
  correo: "pagos@nuitfantome.cl",
  glosa: "Pedido Nuit Fantôme"
};

const REGIONES = [
  "Región Metropolitana de Santiago","Arica y Parinacota","Tarapacá","Antofagasta","Atacama","Coquimbo",
  "Valparaíso","O’Higgins","Maule","Ñuble","Biobío","La Araucanía","Los Ríos","Los Lagos","Aysén","Magallanes"
];

const RM_COMUNAS = [
  "Cerrillos","Cerro Navia","Conchalí","El Bosque","Estación Central","Huechuraba","Independencia","La Cisterna",
  "La Florida","La Granja","La Pintana","La Reina","Las Condes","Lo Barnechea","Lo Espejo","Lo Prado","Macul","Maipú",
  "Ñuñoa","Pedro Aguirre Cerda","Peñalolén","Providencia","Pudahuel","Quilicura","Quinta Normal","Recoleta","Renca",
  "San Joaquín","San Miguel","San Ramón","Santiago","Vitacura","Puente Alto","Pirque","San José de Maipo","Colina",
  "Lampa","Tiltil","San Bernardo","Buin","Calera de Tango","Paine","Melipilla","Alhué","Curacaví","María Pinto",
  "San Pedro","Talagante","El Monte","Isla de Maipo","Padre Hurtado","Peñaflor"
];

const esRM = (r="") => /metropolitana/i.test(r);

/* ===== Helpers persistencia de órdenes (boletas) ===== */
function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {}; } catch { return {}; }
}
function writeOrders(obj) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(obj));
}

/* ========== Catálogo base mínimo (para precios) ========== */
const base =  [
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

function loadCustom() { try { return JSON.parse(localStorage.getItem(CATALOG_KEY)||"[]"); } catch { return []; } }
function mergeCatalog(){
  const m = new Map(base.map(p=>[p.id,p]));
  loadCustom().forEach(p => m.set(p.id, { ...m.get(p.id), ...p }));
  return Array.from(m.values());
}
function loadCart() { try { return JSON.parse(localStorage.getItem(CART_KEY))||[]; } catch { return []; } }
function saveCart(c) {
  localStorage.setItem(CART_KEY, JSON.stringify(c));
  const el = document.getElementById("contador");
  if (el) el.textContent = c.reduce((a,b)=>a+(b.qty||0),0);
}

/* ====== utilidades rut ====== */
function cleanRut(rut){ return (rut||"").replace(/[.\-]/g,"").trim().toUpperCase(); }
function formatRut(rut){
  const c = cleanRut(rut);
  if(c.length<2) return c;
  const body = c.slice(0,-1), dv=c.slice(-1);
  return body.replace(/\B(?=(\d{3})+(?!\d))/g,".")+"-"+dv;
}
function validateRut(rut){
  const c = cleanRut(rut);
  if(!/^\d{7,8}[0-9K]$/.test(c)) return false;
  const body = c.slice(0,-1), dv=c.slice(-1);
  let s=0,m=2;
  for(let i=body.length-1;i>=0;i--){ s += Number(body[i])*m; m = m===7 ? 2 : m+1; }
  const calc = 11 - (s%11);
  const dig = calc===11?"0":calc===10?"K":String(calc);
  return dig === dv;
}

/* ======================= Página ======================= */
export default function CarritoPage(){
  const navigate = useNavigate();
  const catalog = useMemo(()=>mergeCatalog(),[]);
  const [cart, setCart] = useState(()=>loadCart());
  const [region, setRegion] = useState(()=> localStorage.getItem(PREF_REGION) || "Región Metropolitana de Santiago");

  // Formulario
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef(null);
  const [form, setForm] = useState({
    nombre:"", apellido:"", email:"", rut:"", telefono:"",
    calle:"", numero:"", depto:"", comuna:"", region: region, notas:""
  });

  // Envío / Pago
  // shippingMethod: 'retira' | 'delivery_rm' | 'starken' | 'chilexpress' | 'correos'
  const [shippingMethod, setShippingMethod] = useState("retira");
  // payment: 'webpay' | 'transferencia' | 'efectivo'
  const [payment, setPayment] = useState("webpay");

  // Comprobante para transferencia
  const [receipt, setReceipt] = useState({ name:"", data:"" });
  const handleReceipt = (e)=>{
    const file = e.target.files?.[0];
    if (!file) return;
    const max = 3*1024*1024; // 3MB
    if (file.size > max) { alert("Archivo muy grande (máx. 3MB)."); e.target.value=""; return; }
    const reader = new FileReader();
    reader.onload = ()=> setReceipt({ name:file.name, data: String(reader.result) });
    reader.readAsDataURL(file);
  };

  useEffect(()=> saveCart(cart), [cart]);
  useEffect(()=> localStorage.setItem(PREF_REGION, region), [region]);
  useEffect(()=> setForm(f=>({...f, region})), [region]);

  // Reglas envío/pago
  useEffect(()=>{
    if (shippingMethod === "delivery_rm") setPayment("efectivo"); // Delivery RM -> solo efectivo
    if (["starken","chilexpress","correos"].includes(shippingMethod) && payment==="efectivo") {
      setPayment("webpay"); // couriers no efectivo
    }
  }, [shippingMethod]);

  // Si cambia a región no-RM y estaba en delivery_rm, forzar a retira
  useEffect(()=>{
    if(!esRM(form.region) && shippingMethod==="delivery_rm"){
      setShippingMethod("retira");
      if(payment==="efectivo") setPayment("webpay");
    }
    // Efectivo solo en RM
    if(payment==="efectivo" && !esRM(form.region)){
      setPayment("webpay");
    }
  }, [form.region, shippingMethod, payment]);

  const onChange = (e)=> setForm(f=>({...f, [e.target.name]: e.target.value}));

  const items = cart.map(it=>{
    const p = catalog.find(x=>x.id===it.id);
    const precio = p?.precio || 0;
    return {
      ...it,
      nombre   : p?.nombre || it.id,
      categoria: p?.categoria || "—",
      img      : p?.img || "/assets/img/placeholder.jpg",
      precio,
      subtotal : precio * (it.qty||0)
    };
  });

  const subtotal = items.reduce((a,b)=>a+b.subtotal,0);
  const faltaGratisRM = Math.max(0, UMBRAL_ENVIO_GRATIS_RM - subtotal);

  // Costo envío
  const envio = (() => {
    if (!items.length) return 0;
    switch (shippingMethod) {
      case "retira":        return 0;
      case "delivery_rm":   return subtotal >= UMBRAL_ENVIO_GRATIS_RM ? 0 : COSTO_ENVIO_BASE;
      case "starken":       return COSTO_STARKEN;
      case "chilexpress":   return COSTO_CHILEXPRESS;
      case "correos":       return COSTO_CORREOS;
      default:              return 0;
    }
  })();

  const total = subtotal + envio;

  const inc = (id,opt)=> setCart(c=> c.map(it=> it.id===id && (it.opt||"")=== (opt||"") ? {...it, qty:(it.qty||1)+1} : it));
  const dec = (id,opt)=> setCart(c=> c.map(it=> it.id===id && (it.opt||"")=== (opt||"") ? {...it, qty: Math.max(1,(it.qty||1)-1)} : it));
  const del = (id,opt)=> setCart(c=> c.filter(it=> !(it.id===id && (it.opt||"")=== (opt||"")) ));

  const abrirFormulario = ()=>{
    setShowForm(true);
    setTimeout(()=>{ formRef.current?.scrollIntoView({behavior:"smooth", block:"start"}); }, 50);
  };

  /* ==== Confirmar pedido ==== */
  const confirmarPedido = (e)=>{
    e.preventDefault();

    // Validaciones básicas
    if(!form.nombre.trim() || !form.apellido.trim()){ alert("Completa nombre y apellido."); return; }
    if(!/\S+@\S+\.\S+/.test(form.email)){ alert("Email no válido."); return; }
    if(!validateRut(form.rut)){ alert("RUT no válido."); return; }
    if(!form.calle.trim()){ alert("Completa la calle."); return; }
    if(esRM(form.region) && !form.comuna.trim()){ alert("Selecciona la comuna."); return; }
    if(shippingMethod==="delivery_rm" && !esRM(form.region)){ alert("El delivery solo está disponible en la Región Metropolitana."); return; }
    if(shippingMethod==="delivery_rm" && payment!=="efectivo"){ alert("Para delivery RM, el método de pago es Efectivo."); return; }
    if(payment==="transferencia" && !receipt.data){
      if(!confirm("No adjuntaste comprobante. ¿Continuar de todas formas?")) return;
    }

    const draft = {
      id: "ORDER"+Date.now(),
      form: { ...form, rut: formatRut(form.rut) },
      shipping: {
        method: shippingMethod,
        carrier: ["starken","chilexpress","correos"].includes(shippingMethod) ? shippingMethod : null,
        payment,
        transferReceipt: payment==="transferencia" && receipt.data ? { name: receipt.name, data: receipt.data } : null
      },
      items,
      totales: { subtotal, envio, total },
      fecha: new Date().toISOString()
    };

    localStorage.setItem(ORDER_DRAFT, JSON.stringify(draft));
    const all = readOrders(); all[draft.id] = draft; writeOrders(all);

    // Limpia carrito
    localStorage.setItem(CART_KEY, JSON.stringify([]));
    const el = document.getElementById("contador"); if (el) el.textContent = "0";
    setCart([]);

    navigate(`/boleta/${draft.id}`);
  };

  const mensajeEnvioAside = (() => {
    switch (shippingMethod) {
      case "retira":
        return "Retiro en tienda — sin costo de envío.";
      case "delivery_rm":
        return subtotal >= UMBRAL_ENVIO_GRATIS_RM
          ? "Delivery RM: envío gratis aplicado."
          : `Delivery RM: envío gratis desde ${toCLP(UMBRAL_ENVIO_GRATIS_RM)} — te faltan ${toCLP(faltaGratisRM)}.`;
      case "starken":
        return `Starken (a todo Chile) — costo fijo ${toCLP(COSTO_STARKEN)}.`;
      case "chilexpress":
        return `Chilexpress (a todo Chile) — costo fijo ${toCLP(COSTO_CHILEXPRESS)}.`;
      case "correos":
        return `Correos de Chile (a todo Chile) — costo fijo ${toCLP(COSTO_CORREOS)}.`;
      default:
        return "";
    }
  })();

  return (
    <main style={{ width:"min(1100px,95%)", margin:"28px auto" }}>
      <h1 style={{ color:"#3a2a63", marginBottom:18 }}>Carrito</h1>

      <section style={{ display:"grid", gridTemplateColumns:"1fr 360px", gap:16 }}>
        {/* LISTA */}
        <div style={{ background:"#1b0f2b", borderRadius:14, border:"1px solid #2a1742" }}>
          {items.length===0 && (
            <div style={{ padding:20, color:"#fff" }}>
              Tu carrito está vacío. <Link to="/productos" style={{ color:"#a78bfa", fontWeight:700 }}>Explorar productos</Link>
            </div>
          )}

          {items.map((it)=>(
            <div key={`${it.id}-${it.opt||""}`} style={{
              display:"grid", gridTemplateColumns:"120px 1fr 120px 120px", gap:12,
              alignItems:"center", padding:12, borderBottom:"1px solid #2a1742", color:"#fff"
            }}>
              <img src={it.img} alt={it.nombre} style={{ width:110, height:90, objectFit:"cover", borderRadius:10, background:"#fff" }}/>
              <div>
                <div style={{ fontWeight:800 }}>{it.nombre}{it.opt?` • ${it.opt}`:""}</div>
                <div style={{ color:"#cdbdfc", fontSize:".9rem" }}>{it.categoria}</div>
                <button onClick={()=>del(it.id, it.opt)} style={btnLink}>Eliminar</button>
              </div>

              <div style={{ display:"flex", gap:8, alignItems:"center", justifyContent:"center" }}>
                <button onClick={()=>dec(it.id, it.opt)} style={qtyBtn}>-</button>
                <span style={{ minWidth:24, textAlign:"center" }}>{it.qty}</span>
                <button onClick={()=>inc(it.id, it.opt)} style={qtyBtn}>+</button>
              </div>

              <div style={{ textAlign:"right", fontWeight:900 }}>{toCLP(it.subtotal)}</div>
            </div>
          ))}
        </div>

        {/* RESUMEN */}
        <aside style={{ background:"#fff", border:"1px solid #eee9ff", borderRadius:14, padding:14, height:"fit-content" }}>
          <h3 style={{ color:"#3a2a63", marginTop:0 }}>Resumen</h3>

          <div className="field">
            <label style={{ display:"block", marginBottom:6, color:"#6b5aa6", fontWeight:700 }}>Región de envío</label>
            <select
              value={form.region}
              onChange={(e)=>{ setRegion(e.target.value); setForm(f=>({...f, region:e.target.value, comuna:""})); }}
              style={{ width:"100%", padding:"10px", borderRadius:10, border:"1px solid #eee9ff", background:"#fff" }}
            >
              {REGIONES.map(r => <option key={r} value={r}>{r}</option>)}
            </select>
          </div>

          {/* Métodos de envío */}
          <div className="field" style={{ marginTop:10 }}>
            <label style={{ display:"block", marginBottom:6, color:"#6b5aa6", fontWeight:700 }}>Método de envío</label>
            <div style={{ display:"grid", gap:6 }}>
              <label style={radioRow}>
                <input type="radio" name="envio" value="retira"
                  checked={shippingMethod==="retira"} onChange={()=>setShippingMethod("retira")} />
                <span>Retiro en tienda (sin costo)</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="envio" value="delivery_rm"
                  checked={shippingMethod==="delivery_rm"} onChange={()=>setShippingMethod("delivery_rm")}
                  disabled={!esRM(form.region)}
                  title={!esRM(form.region) ? "Solo disponible en Región Metropolitana" : ""} />
                <span>Delivery (solo RM)</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="envio" value="starken"
                  checked={shippingMethod==="starken"} onChange={()=>setShippingMethod("starken")} />
                <span>Starken (a todo Chile)</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="envio" value="chilexpress"
                  checked={shippingMethod==="chilexpress"} onChange={()=>setShippingMethod("chilexpress")} />
                <span>Chilexpress (a todo Chile)</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="envio" value="correos"
                  checked={shippingMethod==="correos"} onChange={()=>setShippingMethod("correos")} />
                <span>Correos de Chile (a todo Chile)</span>
              </label>
            </div>
            <div style={{ color:"#6b5aa6", fontSize:".85rem", marginTop:6 }}>
              {mensajeEnvioAside}
            </div>
          </div>

          {/* Métodos de pago */}
          <div className="field" style={{ marginTop:10 }}>
            <label style={{ display:"block", marginBottom:6, color:"#6b5aa6", fontWeight:700 }}>Método de pago</label>
            <div style={{ display:"grid", gap:6 }}>
              <label style={radioRow}>
                <input type="radio" name="pago" value="webpay"
                  checked={payment==="webpay"} onChange={()=>setPayment("webpay")}
                  disabled={shippingMethod==="delivery_rm"} />
                <span>Tarjeta (Webpay)</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="pago" value="transferencia"
                  checked={payment==="transferencia"} onChange={()=>setPayment("transferencia")}
                  disabled={shippingMethod==="delivery_rm"} />
                <span>Transferencia</span>
              </label>

              <label style={radioRow}>
                <input type="radio" name="pago" value="efectivo"
                  checked={payment==="efectivo"} onChange={()=>setPayment("efectivo")}
                  disabled={["starken","chilexpress","correos"].includes(shippingMethod) || !esRM(form.region)}
                  title={!esRM(form.region) ? "Efectivo solo disponible en RM" : ""} />
                <span>Efectivo {shippingMethod==="delivery_rm" ? "(Delivery en RM)" : ""}</span>
              </label>
            </div>

            {/* Datos + Comprobante transferencia */}
            {payment==="transferencia" && (
              <div style={transferBox}>
                <div style={{ fontWeight:800, color:"#3a2a63", marginBottom:6 }}>Datos para transferencia</div>
                <ul style={{ margin:"0 0 8px 16px", color:"#3a2a63" }}>
                  <li><strong>Titular:</strong> {TRANSFER_DATA.titular}</li>
                  <li><strong>RUT:</strong> {TRANSFER_DATA.rut}</li>
                  <li><strong>Banco:</strong> {TRANSFER_DATA.banco}</li>
                  <li><strong>Tipo de cuenta:</strong> {TRANSFER_DATA.tipo}</li>
                  <li><strong>N° de cuenta:</strong> {TRANSFER_DATA.numero}</li>
                  <li><strong>Correo:</strong> {TRANSFER_DATA.correo}</li>
                  <li><strong>Glosa:</strong> {TRANSFER_DATA.glosa}</li>
                </ul>

                <label style={{ display:"block", marginBottom:6, color:"#6b5aa6", fontWeight:700 }}>
                  Comprobante (JPG/PNG/PDF, máx. 3 MB) — opcional
                </label>
                <input type="file" accept="image/*,application/pdf" onChange={handleReceipt} />
                {receipt.name && (
                  <div style={{ fontSize:".85rem", color:"#6b5aa6", marginTop:6 }}>
                    Archivo cargado: <strong>{receipt.name}</strong>
                  </div>
                )}
              </div>
            )}
          </div>

          <div style={{ display:"flex", justifyContent:"space-between", marginTop:12 }}>
            <span>Subtotal</span><strong>{toCLP(subtotal)}</strong>
          </div>
          <div style={{ display:"flex", justifyContent:"space-between", marginTop:6 }}>
            <span>Envío</span><strong>{envio===0 ? "Gratis" : toCLP(envio)}</strong>
          </div>
          <hr style={{ border:0, borderTop:"1px solid #f1edff", margin:"10px 0" }}/>
          <div style={{ display:"flex", justifyContent:"space-between", fontSize:"1.05rem" }}>
            <span>Total</span><strong>{toCLP(total)}</strong>
          </div>

          {!showForm ? (
            <button onClick={abrirFormulario}
              style={{...btnPrimary, width:"100%", marginTop:12}}
              disabled={!items.length}
              title={!items.length ? "Tu carrito está vacío" : "Ingresar datos de envío"}>
              Proceder al pago
            </button>
          ) : (
            <a href="#form-checkout" style={{ ...btnGhost, display:"block", textAlign:"center" }}>
              Ir al formulario
            </a>
          )}

          <Link to="/productos" style={{ ...btnGhost, display:"block", textAlign:"center", marginTop:8 }}>
            Seguir comprando
          </Link>
        </aside>
      </section>

      {/* =================== FORMULARIO DE CLIENTE =================== */}
      {showForm && (
        <section id="form-checkout" ref={formRef}
          style={{ marginTop:22, background:"#fff", border:"1px solid #eee9ff", borderRadius:14, padding:16 }}>
          <h3 style={{ color:"#3a2a63", marginTop:0 }}>Datos del comprador y entrega</h3>
          <form onSubmit={confirmarPedido} style={{ display:"grid", gap:12 }}>
            <div style={grid2}>
              <Field label="Nombre"  name="nombre"  value={form.nombre}  onChange={onChange} required/>
              <Field label="Apellido" name="apellido" value={form.apellido} onChange={onChange} required/>
            </div>

            <div style={grid2}>
              <Field label="Correo electrónico" type="email" name="email" value={form.email} onChange={onChange} required placeholder="tucorreo@dominio.cl"/>
              <Field label="Teléfono (opcional)" name="telefono" value={form.telefono} onChange={onChange} placeholder="+56 9 1234 5678"/>
            </div>

            <div style={grid2}>
              <div>
                <label className="lbl">RUT</label>
                <input name="rut" value={form.rut} onChange={onChange}
                  onBlur={(e)=> setForm(f=>({...f, rut: formatRut(e.target.value)}))}
                  placeholder="12.345.678-9" inputMode="text" autoComplete="off" required style={input}/>
              </div>

              <div>
                <label className="lbl">Comuna</label>
                {esRM(form.region) ? (
                  <select name="comuna" value={form.comuna} onChange={onChange} required style={input}>
                    <option value="">Selecciona comuna…</option>
                    {RM_COMUNAS.map(c=> <option key={c} value={c}>{c}</option>)}
                  </select>
                ) : (
                  <input name="comuna" value={form.comuna} onChange={onChange} placeholder="Tu comuna" required style={input}/>
                )}
              </div>
            </div>

            <div style={grid3}>
              <Field label="Calle" name="calle" value={form.calle} onChange={onChange} required/>
              <Field label="Número" name="numero" value={form.numero} onChange={onChange} required/>
              <Field label="Depto / Casa (opcional)" name="depto" value={form.depto} onChange={onChange}/>
            </div>

            <div style={grid2}>
              <div>
                <label className="lbl">Región</label>
                <select name="region" value={form.region}
                  onChange={(e)=>{ setRegion(e.target.value); setForm(f=>({...f, region:e.target.value, comuna:""})); }}
                  style={input}>
                  {REGIONES.map(r=><option key={r} value={r}>{r}</option>)}
                </select>
              </div>
              <Field label="Indicaciones para el reparto (opcional)" name="notas" value={form.notas} onChange={onChange} placeholder="Ej: dejar en conserjería si no estoy"/>
            </div>

            <div style={{ display:"flex", gap:12, marginTop:6 }}>
              <button type="submit" style={btnPrimary}>Confirmar pedido</button>
              <button type="button" style={btnGhost} onClick={()=>setShowForm(false)}>Volver</button>
            </div>
          </form>
        </section>
      )}
    </main>
  );
}

/* ========= Componentes y estilos pequeños ========= */
function Field({label, ...props}){
  return (
    <div>
      <label className="lbl">{label}</label>
      <input {...props} style={input}/>
    </div>
  );
}

const grid2 = { display:"grid", gridTemplateColumns:"1fr 1fr", gap:12 };
const grid3 = { display:"grid", gridTemplateColumns:"2fr 1fr 1fr", gap:12 };

const input = {
  width:"100%", padding:"10px", borderRadius:10, border:"1px solid #eee9ff",
  background:"#fff", color:"#3a2a63"
};
const radioRow = { display:"flex", alignItems:"center", gap:8 };
const qtyBtn = {
  width:28, height:28, borderRadius:8, border:"1px solid #3c245d",
  background:"#2a1742", color:"#fff", cursor:"pointer"
};
const btnLink = { background:"none", border:0, color:"#cdbdfc", cursor:"pointer", padding:0, marginTop:6 };
const btnPrimary = {
  background:"linear-gradient(90deg,#7c3aed 0%,#a78bfa 100%)",
  color:"#fff", border:0, borderRadius:12, padding:"10px 14px", fontWeight:900,
  boxShadow:"0 8px 18px rgba(124,58,237,.25)", cursor:"pointer"
};
const btnGhost = {
  padding:"10px 14px", borderRadius:12, border:"1px solid #eee9ff",
  color:"#3a2a63", textDecoration:"none", fontWeight:700, background:"#fff", cursor:"pointer"
};
const transferBox = {
  marginTop:12,
  background:"#faf8ff",
  border:"1px solid #eee9ff",
  borderRadius:12,
  padding:12
};
