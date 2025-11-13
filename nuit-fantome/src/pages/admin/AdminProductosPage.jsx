// src/pages/admin/AdminProductosPage.jsx 
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

// Estilos
import "../../assets/css/dashboard.css";
import "../../assets/css/admin-ui.css";

/* ========= Catálogo original ========= */
const CATALOGO =  [
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
  { id:"plan-kuromi", categoria:"Planners / To-Do", nombre:"Planner semanal — Kuromi", precio:2990, img:"assets/img/planner-kuromi.jpg", desc:"Planner semanal Kuromi." },
  { id:"plan-sailor", categoria:"Planners / To-Do", nombre:"Planner semanal — Sailor Moon", precio:2990, img:"assets/img/planner-semanal-sailor-moon.jpg", desc:"Planner semanal Sailor Moon." }
];

/* ======== Genera categorías automáticas ======== */
const CATEGORIAS_INICIALES = Array.from(
  new Set(CATALOGO.map(p => p.categoria))
).map((nombre, i) => ({ id: i + 1, nombre }));

const CAT_ID_BY_NAME = Object.fromEntries(
  CATEGORIAS_INICIALES.map(c => [c.nombre, c.id])
);

/* ======== Productos iniciales ======== */
const PRODUCTOS_INICIALES = CATALOGO.map(p => ({
  id: p.id,
  nombre: p.nombre,
  precio: p.precio,
  stock: 10,
  idCategoria: CAT_ID_BY_NAME[p.categoria],
  img: p.img,
  desc: p.desc,
  opciones: p.opciones ?? []
}));

/* ====== Helper: genera un ID único tipo p001, p002, etc. ====== */
const generarIdUnico = (lista) => {
  const usados = new Set(lista.map(p => String(p.id)));
  let n = 1;
  let id;
  do {
    id = "p" + String(n).padStart(3, "0");
    n++;
  } while (usados.has(id));
  return id;
};

/* ====================== COMPONENTE ====================== */
const AdminProductosPage = () => {
  const navigate = useNavigate();

  // Estado base
  const [categorias, setCategorias] = useState(CATEGORIAS_INICIALES);
  const [productos, setProductos] = useState(PRODUCTOS_INICIALES);
  const [tab, setTab] = useState("productos"); // productos | reportes | categorias | criticos

  // Para nueva imagen subida en "Agregar producto"
  const [newImgData, setNewImgData] = useState("");

  // --- Modal de edición ---
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formEdit, setFormEdit] = useState({
    id: "", nombre: "", idCategoria: "", precio: 0, stock: 0, img: "", desc: "", opciones: []
  });

  // ====== LocalStorage: cargar y guardar ======
  useEffect(() => {
    try {
      const raw = localStorage.getItem("nf_productos");
      if (raw) {
        const arr = JSON.parse(raw);
        if (Array.isArray(arr) && arr.length) setProductos(arr);
      }
    } catch {}
  }, []);

  // Exporta: admin -> tienda
  const exportToCatalog = (arrProd) => {
    return arrProd.map(p => ({
      id: p.id,
      categoria: categorias.find(c => c.id === p.idCategoria)?.nombre || "Sin categoría",
      nombre: p.nombre,
      precio: Number(p.precio || 0),
      img: (p.img || "").replace(/^\//, ""),
      desc: p.desc || "",
      // opciones con "s" = stock por opción (que usa la tienda)
      ...(Array.isArray(p.opciones) && p.opciones.length
        ? { opciones: p.opciones.map(o => ({ t: String(o.t || ""), s: Number(o.s || 0) })) }
        : {})
    }));
  };

  useEffect(() => {
    try {
      localStorage.setItem("nf_productos", JSON.stringify(productos));
      localStorage.setItem("nf_catalog_custom_v1", JSON.stringify(exportToCatalog(productos)));
      // Notificar a otras vistas (ej. ProductosPage) si escuchan este evento
      window.dispatchEvent(new CustomEvent("nf:productos:update"));
    } catch {}
  }, [productos]); // eslint-disable-line

  const catNombre = (idCat) =>
    categorias.find((c) => c.id === idCat)?.nombre ?? "—";

  /* === Manejar archivo de imagen en "Agregar producto" === */
  const handleNuevaImagen = (e) => {
    const file = e.target.files?.[0];
    if (!file) {
      setNewImgData("");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      setNewImgData(ev.target?.result || "");
    };
    reader.readAsDataURL(file);
  };

  // ====== CRUD ======
  const agregarProducto = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);

    const idInput = String(form.get("id") || "").trim();
    const idFinal = idInput || generarIdUnico(productos);

    const rutaTexto = String(form.get("img") || "").trim();
    const imgFinal = newImgData || rutaTexto;

    const nuevo = {
      id: idFinal,
      nombre: String(form.get("nombre")).trim(),
      precio: Number(form.get("precio")),
      stock: Number(form.get("stock")),
      idCategoria: Number(form.get("idCategoria")),
      img: imgFinal,
      desc: String(form.get("desc") || ""),
      opciones: [] // por defecto sin variantes
    };
    if (!nuevo.nombre || isNaN(nuevo.precio) || !nuevo.idCategoria) return;
    setProductos((prev) => [...prev, nuevo]);
    setNewImgData("");
    e.currentTarget.reset();
  };

  const abrirEditar = (p) => {
    setEditingId(p.id);
    setFormEdit({
      id: p.id,
      nombre: p.nombre,
      idCategoria: p.idCategoria,
      precio: p.precio,
      stock: p.stock,
      img: p.img || "",
      desc: p.desc || "",
      opciones: Array.isArray(p.opciones) ? p.opciones.map(o => ({ t: o.t || "", s: Number(o.s || 0) })) : []
    });
    setModalOpen(true);
  };

  const guardarEdicion = (e) => {
    e?.preventDefault();
    const limpio = {
      ...formEdit,
      precio: Number(formEdit.precio || 0),
      stock: Number(formEdit.stock || 0),
      idCategoria: Number(formEdit.idCategoria),
      opciones: (formEdit.opciones || [])
        .map(o => ({ t: String(o.t || "").trim(), s: Number(o.s || 0) }))
        .filter(o => o.t.length > 0)
    };
    setProductos(prev =>
      prev.map(p => (p.id === editingId ? { ...p, ...limpio } : p))
    );
    setModalOpen(false);
  };

  const eliminarProducto = (id) => {
    if (!confirm("¿Eliminar producto?")) return;
    setProductos((prev) => prev.filter((p) => p.id !== id));
    if (editingId === id) setModalOpen(false);
  };

  const agregarCategoria = (e) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const nombre = String(form.get("nombre")).trim();
    if (!nombre) return;
    if (categorias.some((c) => c.nombre.toLowerCase() === nombre.toLowerCase())) {
      alert("La categoría ya existe");
      return;
    }
    setCategorias((prev) => [...prev, { id: Date.now(), nombre }]);
    e.currentTarget.reset();
  };

  const eliminarCategoria = (id) => {
    if (!confirm("¿Eliminar categoría? (también desasocia productos)")) return;
    setCategorias((prev) => prev.filter((c) => c.id !== id));
    setProductos((prev) =>
      prev.map((p) => (p.idCategoria === id ? { ...p, idCategoria: 0 } : p))
    );
  };

  const criticos = useMemo(
    () => productos.filter((p) => Number(p.stock) <= 5 && (!Array.isArray(p.opciones) || p.opciones.length === 0)),
    [productos]
  );

  const reportePorCategoria = useMemo(() => {
    const base = categorias.reduce((acc, c) => {
      acc[c.id] = { categoria: c.nombre, cantidad: 0, total$: 0 };
      return acc;
    }, {});
    for (const p of productos) {
      if (!base[p.idCategoria]) continue;
      base[p.idCategoria].cantidad += 1;
      base[p.idCategoria].total$ += Number(p.precio || 0);
    }
    return Object.values(base);
  }, [productos, categorias]);

  return (
    <div className="wrapper">
      {/* ==== SIDEBAR ==== */}
      <aside className="sidebar">
        <div className="logo">
          <img src="/assets/img/logo.png" alt="Logo Empresa" />
        </div>
        <h2>Admin</h2>
        <ul>
          <li>
            <Link to="/admin/dashboard">
              <i className="fa fa-chart-line" />Dashboard
            </Link>
          </li>
          <li className="active">
            <Link to="/admin/productos">
              <i className="fa fa-box" />Productos
            </Link>
          </li>
          <li>
            <Link to="/admin/pedidos">
              <i className="fa fa-shopping-cart" />Pedidos
            </Link>
          </li>
          <li>
            <Link to="/admin/usuarios">
              <i className="fa fa-users" />Usuarios
            </Link>
          </li>
          <li>
            <a href="/" target="_blank" rel="noreferrer">
              <i className="fa fa-globe" />Ver sitio
            </a>
          </li>
        </ul>
        <div className="spark s1" />
        <div className="spark s2" />
        <div className="spark s3" />
        <div className="spark s4" />
      </aside>

      {/* ==== MAIN ==== */}
      <main className="main">
        <div className="topbar">
          <div className="left">
            <h1>Productos & Categorías</h1>
          </div>
          <div className="right">
            <button
              className="btn btn-primary"
              onClick={() => navigate("/admin/dashboard")}
              title="Volver al Dashboard"
            >
              ← Volver
            </button>
          </div>
        </div>

        <div className="container">
          {/* Tabs */}
          <ul className="nav nav-tabs tabs-inline">
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "productos" ? "active" : ""}`}
                onClick={() => setTab("productos")}
              >
                📦 Productos
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "reportes" ? "active" : ""}`}
                onClick={() => setTab("reportes")}
              >
                📈 Reportes
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "categorias" ? "active" : ""}`}
                onClick={() => setTab("categorias")}
              >
                🗂️ Categorías
              </button>
            </li>
            <li className="nav-item">
              <button
                className={`nav-link ${tab === "criticos" ? "active" : ""}`}
                onClick={() => setTab("criticos")}
              >
                🚨 Críticos
              </button>
            </li>
          </ul>

          {/* Panel */}
          <div className="card bg-dark text-light border-0 rounded-3 mt-3 p-3">
            {tab === "productos" && (
              <>
                <h5 className="mb-3">Listado de productos</h5>
                {/* 🔹 Tabla con IMAGEN */}
                <table className="table table-dark table-hover align-middle">
                  <thead>
                    <tr>
                      <th>Imagen</th>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Categoría</th>
                      <th>Precio</th>
                      <th>Stock</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map((p) => {
                      const src = p.img
                        ? (
                          p.img.startsWith("data:")
                            ? p.img
                            : (p.img.startsWith("/") ? p.img : "/" + p.img)
                        )
                        : "/assets/img/placeholder.jpg";
                      return (
                        <tr key={p.id}>
                          <td style={{ width: "72px" }}>
                            <img
                              src={src}
                              alt={p.nombre}
                              style={{
                                width: "56px",
                                height: "56px",
                                objectFit: "cover",
                                borderRadius: "10px",
                                border: "1px solid #e6e1ff",
                                boxShadow: "0 3px 8px rgba(0,0,0,.06)",
                                background: "#fff",
                              }}
                            />
                          </td>
                          <td>{p.id}</td>
                          <td>{p.nombre}</td>
                          <td>{catNombre(p.idCategoria)}</td>
                          <td>${p.precio}</td>
                          <td>
                            {p.opciones?.length
                              ? p.opciones.reduce(
                                  (acc, o) => acc + Number(o.s ?? o.stock ?? 0),
                                  0
                                )
                              : p.stock}
                          </td>
                          <td className="d-flex gap-2">
                            <button
                              className="btn btn-sm btn-warning"
                              onClick={() => abrirEditar(p)}
                            >
                              Editar
                            </button>
                            <button
                              onClick={() => eliminarProducto(p.id)}
                              className="btn btn-sm btn-danger"
                            >
                              Eliminar
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <hr />
                <h6 className="mb-2">Agregar producto</h6>
                <form className="row g-2" onSubmit={agregarProducto}>
                  <div className="col-md-2">
                    <input name="id" className="form-control" placeholder="ID (opcional)" />
                  </div>
                  <div className="col-md-3">
                    <input name="nombre" className="form-control" placeholder="Nombre" />
                  </div>
                  <div className="col-md-2">
                    <input name="precio" type="number" min="0" className="form-control" placeholder="Precio" />
                  </div>
                  <div className="col-md-2">
                    <input name="stock" type="number" min="0" className="form-control" placeholder="Stock" />
                  </div>
                  <div className="col-md-3">
                    <select name="idCategoria" className="form-select" defaultValue="">
                      <option value="" disabled>Selecciona categoría</option>
                      {categorias.map((c) => (
                        <option key={c.id} value={c.id}>{c.nombre}</option>
                      ))}
                    </select>
                  </div>

                  {/* Ruta de imagen (opcional) */}
                  <div className="col-md-6">
                    <input
                      name="img"
                      className="form-control"
                      placeholder="Ruta imagen (/assets/...)"
                    />
                  </div>

                  {/* Subir imagen desde archivo */}
                  <div className="col-md-6">
                    <input
                      type="file"
                      accept="image/*"
                      className="form-control"
                      onChange={handleNuevaImagen}
                    />
                    <small className="text-secondary">
                      Puedes subir una imagen o usar una ruta del proyecto.  
                      Si subes archivo, la imagen se guardará solo en este navegador.
                    </small>
                  </div>

                  <div className="col-md-12">
                    <input name="desc" className="form-control" placeholder="Descripción" />
                  </div>
                  <div className="col-12 d-grid d-md-block">
                    <button className="btn btn-primary mt-2">Agregar</button>
                  </div>
                </form>
              </>
            )}

            {tab === "categorias" && (
              <>
                <h5 className="mb-3">Categorías</h5>
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>ID</th>
                      <th>Nombre</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {categorias.map((c) => (
                      <tr key={c.id}>
                        <td>{c.id}</td>
                        <td>{c.nombre}</td>
                        <td>
                          <button
                            onClick={() => eliminarCategoria(c.id)}
                            className="btn btn-sm btn-danger"
                          >
                            Eliminar
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <hr />
                <h6 className="mb-2">Nueva categoría</h6>
                <form className="row g-2" onSubmit={agregarCategoria}>
                  <div className="col-md-10">
                    <input name="nombre" className="form-control" placeholder="Nombre categoría" />
                  </div>
                  <div className="col-md-2 d-grid">
                    <button className="btn btn-primary">Agregar</button>
                  </div>
                </form>
              </>
            )}

            {tab === "criticos" && (
              <>
                <h5 className="mb-3">Productos críticos (stock ≤ 5)</h5>
                {criticos.length === 0 ? (
                  <p className="text-secondary">No hay productos críticos 🎉</p>
                ) : (
                  <table className="table table-dark table-hover">
                    <thead>
                      <tr>
                        <th>ID</th>
                        <th>Producto</th>
                        <th>Categoría</th>
                        <th>Stock</th>
                      </tr>
                    </thead>
                    <tbody>
                      {criticos.map((p) => (
                        <tr key={p.id}>
                          <td>{p.id}</td>
                          <td>{p.nombre}</td>
                          <td>{catNombre(p.idCategoria)}</td>
                          <td>{p.stock}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </>
            )}

            {tab === "reportes" && (
              <>
                <h5 className="mb-3">Reporte por categoría</h5>
                <table className="table table-dark table-hover">
                  <thead>
                    <tr>
                      <th>Categoría</th>
                      <th># Productos</th>
                      <th>Total $ (suma de precios)</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reportePorCategoria.map((r) => (
                      <tr key={r.categoria}>
                        <td>{r.categoria}</td>
                        <td>{r.cantidad}</td>
                        <td>${r.total$}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </>
            )}
          </div>
        </div>
      </main>

      {/* ===== Modal Editar (con variantes) ===== */}
      {modalOpen && (
        <div className="modal d-block" tabIndex="-1" onClick={(e)=>{ if(e.target===e.currentTarget) setModalOpen(false); }}>
          <div className="modal-dialog modal-lg modal-dialog-centered">
            <div className="modal-content bg-dark text-light">
              <div className="modal-header">
                <h5 className="modal-title">Editar producto – {formEdit.id}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={()=>setModalOpen(false)}></button>
              </div>

              <form onSubmit={guardarEdicion}>
                <div className="modal-body">
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre</label>
                      <input className="form-control" value={formEdit.nombre}
                        onChange={(e)=>setFormEdit(f=>({...f, nombre: e.target.value}))}/>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Categoría</label>
                      <select className="form-select" value={formEdit.idCategoria}
                        onChange={(e)=>setFormEdit(f=>({...f, idCategoria: e.target.value}))}>
                        {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                      </select>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Precio (CLP)</label>
                      <input type="number" min="0" className="form-control" value={formEdit.precio}
                        onChange={(e)=>setFormEdit(f=>({...f, precio: e.target.value}))}/>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Stock general</label>
                      <input type="number" min="0" className="form-control" value={formEdit.stock}
                        onChange={(e)=>setFormEdit(f=>({...f, stock: e.target.value}))}/>
                    </div>
                    <div className="col-md-4">
                      <label className="form-label">Imagen (ruta o dataURL)</label>
                      <input className="form-control" value={formEdit.img}
                        onChange={(e)=>setFormEdit(f=>({...f, img: e.target.value}))}/>
                    </div>
                    <div className="col-12">
                      <label className="form-label">Descripción</label>
                      <textarea className="form-control" rows={3} value={formEdit.desc}
                        onChange={(e)=>setFormEdit(f=>({...f, desc: e.target.value}))}/>
                    </div>
                  </div>

                  {/* Variantes / Opciones */}
                  <hr />
                  <div className="d-flex justify-content-between align-items-center mb-2">
                    <h5 className="m-0">Variantes / Opciones</h5>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm"
                      onClick={() =>
                        setFormEdit(f => ({
                          ...f,
                          opciones: [...(f.opciones || []), { t: "", s: 0 }]
                        }))
                      }
                    >
                      + Agregar opción
                    </button>
                  </div>

                  {(!formEdit.opciones || formEdit.opciones.length === 0) && (
                    <p className="text-secondary">No hay opciones agregadas.</p>
                  )}

                  {formEdit.opciones?.length > 0 && (
                    <table className="table table-dark table-hover mb-2">
                      <thead>
                        <tr>
                          <th>Opción</th>
                          <th style={{width:140}}>Stock</th>
                          <th style={{width:60}}></th>
                        </tr>
                      </thead>
                      <tbody>
                        {formEdit.opciones.map((o, i) => (
                          <tr key={i}>
                            <td>
                              <input
                                className="form-control"
                                value={o.t}
                                onChange={(e) => {
                                  const ops = [...formEdit.opciones];
                                  ops[i] = { ...ops[i], t: e.target.value };
                                  setFormEdit(f => ({ ...f, opciones: ops }));
                                }}
                              />
                            </td>
                            <td>
                              <input
                                type="number"
                                min="0"
                                className="form-control"
                                value={o.s || 0}
                                onChange={(e) => {
                                  const ops = [...formEdit.opciones];
                                  ops[i] = { ...ops[i], s: Number(e.target.value) };
                                  setFormEdit(f => ({ ...f, opciones: ops }));
                                }}
                              />
                            </td>
                            <td>
                              <button
                                type="button"
                                className="btn btn-danger btn-sm"
                                onClick={() => {
                                  const ops = [...formEdit.opciones];
                                  ops.splice(i, 1);
                                  setFormEdit(f => ({ ...f, opciones: ops }));
                                }}
                              >
                                ✕
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  )}
                  <small className="text-secondary">
                    Si agregas opciones, la tienda usará el <b>stock por opción</b> y omitirá el stock general.
                  </small>
                </div>

                <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-danger"
                    onClick={()=>eliminarProducto(editingId)}>
                    Eliminar
                  </button>
                  <div className="d-flex gap-2">
                    <button type="button" className="btn btn-outline-secondary"
                      onClick={()=>setModalOpen(false)}>
                      Cancelar
                    </button>
                    <button className="btn btn-primary">Guardar cambios</button>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProductosPage;
