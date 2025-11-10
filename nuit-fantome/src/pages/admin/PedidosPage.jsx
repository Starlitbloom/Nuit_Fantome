// src/pages/admin/PedidosPage.jsx
import "../../assets/css/dashboard.css";   // layout sidebar + main   // tu tema general
import "../../assets/css/pedidos.css"; 
import "../../assets/css/admin-ui.css";    // ⬅️ estilos SOLO de Pedidos (nuevo)
import React, { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  getOrders, addOrder, updateOrder, deleteOrder, getOrderById, exportOrdersCSV
} from "../../data/ordersDb";

const ESTADOS = ["Pendiente", "En proceso", "Completado", "Cancelado"];

const clsEstado = (s) => {
  switch (s) {
    case "Pendiente":   return "estado-pendiente";
    case "En proceso":  return "estado-proceso";
    case "Completado":  return "estado-ok";
    case "Cancelado":   return "estado-cancelado";
    default:            return "estado-neutral";
  }
};

const PedidosPage = () => {
  const [list, setList] = useState([]);
  const [q, setQ] = useState("");
  const [estado, setEstado] = useState("");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [sort, setSort] = useState({ field: "fecha", dir: -1 });
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [toast, setToast] = useState(null);

  const [open, setOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ id:"", fecha:"", cliente:"", email:"", items:"", total:0, estado:"Pendiente" });

  const navigate = useNavigate();

  useEffect(() => { setList(getOrders()); }, []);

  const filtered = useMemo(() => {
    let res = [...list];
    const term = q.trim().toLowerCase();
    if (term) {
      res = res.filter(p => {
        const hay = (p.id+" "+p.cliente+" "+p.email+" "+(p.items||[]).join(" ")).toLowerCase();
        return hay.includes(term);
      });
    }
    if (estado) res = res.filter(p => p.estado === estado);

    const d = desde ? new Date(desde) : null;
    const h = hasta ? new Date(hasta) : null;
    if (d) res = res.filter(p => new Date(p.fecha) >= d);
    if (h) res = res.filter(p => new Date(p.fecha) <= h);

    res.sort((a,b) => {
      const { field, dir } = sort;
      let A = a[field], B = b[field];
      if (field === "total") return (A - B) * dir;
      if (field === "fecha") return (new Date(A) - new Date(B)) * dir;
      return String(A).localeCompare(String(B), "es", { numeric:true }) * dir;
    });
    return res;
  }, [list, q, estado, desde, hasta, sort]);

  const maxPage = Math.max(1, Math.ceil(filtered.length / pageSize));
  const pageData = filtered.slice((page-1)*pageSize, (page-1)*pageSize + pageSize);

  useEffect(() => { setPage(1); }, [q, estado, desde, hasta, pageSize]);

  const metrics = useMemo(() => {
    const by = s => filtered.filter(p => p.estado === s).length;
    return {
      total: filtered.length,
      pendiente: by("Pendiente"),
      proceso: by("En proceso"),
      completado: by("Completado"),
      cancelado: by("Cancelado"),
    };
  }, [filtered]);

  const showToast = (msg, ok=true) => {
    setToast({ msg, ok });
    setTimeout(() => setToast(null), 2200);
  };

  const openNew = () => {
    const hoy = new Date().toISOString().slice(0,10);
    setEditingId(null);
    setForm({ id:"", fecha: hoy, cliente:"", email:"", items:"", total:0, estado:"Pendiente" });
    setOpen(true);
  };

  const openEdit = (id) => {
    const p = getOrderById(id);
    if (!p) return;
    setEditingId(id);
    setForm({
      id: p.id,
      fecha: p.fecha,
      cliente: p.cliente,
      email: p.email,
      items: (p.items||[]).join(", "),
      total: p.total,
      estado: p.estado
    });
    setOpen(true);
  };

  const onSave = (e) => {
    e?.preventDefault();
    try {
      const payload = {
        id: form.id?.trim() || undefined,
        fecha: form.fecha,
        cliente: form.cliente?.trim(),
        email: form.email?.trim(),
        items: form.items?.split(",").map(s=>s.trim()).filter(Boolean),
        total: Number(form.total || 0),
        estado: form.estado
      };
      let out;
      if (editingId) out = updateOrder(editingId, payload);
      else out = addOrder(payload);
      setList(out);
      setOpen(false);
      showToast("Pedido guardado");
    } catch (err) {
      showToast(err.message || "No se pudo guardar", false);
    }
  };

  const onDelete = (id) => {
    if (!confirm(`¿Eliminar el pedido ${id}?`)) return;
    const out = deleteOrder(id);
    setList(out);
    showToast("Pedido eliminado");
  };

  const thSort = (field) => {
    setSort(prev => ({ field, dir: prev.field === field ? -prev.dir : 1 }));
  };

  const limpiar = () => { setQ(""); setEstado(""); setDesde(""); setHasta(""); };
  const toCLP = (n) => Number(n || 0).toLocaleString("es-CL", { style:"currency", currency:"CLP" });

  return (
    <div className="wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <div className="logo"><img src="/assets/img/logo.png" alt="Logo" /></div>
        <h2>Admin</h2>
        <ul>
          <li><Link to="/admin/dashboard"><i className="fa fa-chart-line"></i>Dashboard</Link></li>
          <li><Link to="/admin/productos"><i className="fa fa-box"></i>Productos</Link></li>
          <li className="active"><Link to="/admin/pedidos"><i className="fa fa-shopping-cart"></i>Pedidos</Link></li>
          <li><Link to="/admin/usuarios"><i className="fa fa-users"></i>Usuarios</Link></li>
          <li><a href="/" target="_blank" rel="noreferrer"><i className="fa fa-globe"></i>Ver sitio</a></li>
        </ul>
        <div className="spark s1"></div><div className="spark s2"></div><div className="spark s3"></div><div className="spark s4"></div>
      </aside>

      {/* Main */}
      <main className="main">
        <div className="topbar">
          <div className="left"><h1>Administración: Pedidos</h1></div>
          <div className="right">
            <button className="btn btn-primary" onClick={() => navigate("/admin/dashboard")}>← Volver</button>
          </div>
        </div>

        <div className="orders-page">
          {toast && (
            <div className={`alert ${toast.ok ? "alert-success" : "alert-danger"} py-2`}>{toast.msg}</div>
          )}

          {/* Filtros */}
          <div className="orders-filters">
            <div className="field">
              <label>Buscar</label>
              <input value={q} onChange={e=>setQ(e.target.value)} placeholder="Cliente, email, ID, producto…" />
            </div>
            <div className="field">
              <label>Estado</label>
              <select value={estado} onChange={e=>setEstado(e.target.value)}>
                <option value="">Todos</option>
                {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="field">
              <label>Desde</label>
              <input type="date" value={desde} onChange={e=>setDesde(e.target.value)} />
            </div>
            <div className="field">
              <label>Hasta</label>
              <input type="date" value={hasta} onChange={e=>setHasta(e.target.value)} />
            </div>
            <div className="actions">
              <button className="nf-btn ghost" onClick={limpiar}><i className="fa-solid fa-rotate me-1"></i>Limpiar</button>
              <button className="nf-btn outline" onClick={()=>exportOrdersCSV(filtered)}><i className="fa-regular fa-file-lines me-1"></i>CSV</button>
              <button className="nf-btn primary" onClick={openNew}><i className="fa-solid fa-plus me-1"></i>Nuevo</button>
            </div>
          </div>

          {/* KPIs */}
          <div className="orders-kpis">
            <div className="kpi"><span>Total pedidos</span><strong>{metrics.total}</strong></div>
            <div className="kpi"><span>Pendientes</span><strong>{metrics.pendiente}</strong></div>
            <div className="kpi"><span>En proceso</span><strong>{metrics.proceso}</strong></div>
            <div className="kpi"><span>Completados</span><strong>{metrics.completado}</strong></div>
          </div>

          {/* Tabla */}
          <div className="orders-table">
            <div className="table-wrap">
              <table>
                <thead>
                  <tr>
                    <th onClick={()=>thSort("id")}>ID</th>
                    <th onClick={()=>thSort("fecha")}>Fecha</th>
                    <th onClick={()=>thSort("cliente")}>Cliente</th>
                    <th onClick={()=>thSort("email")}>Email</th>
                    <th>Artículos</th>
                    <th onClick={()=>thSort("total")}>Total</th>
                    <th onClick={()=>thSort("estado")}>Estado</th>
                    <th className="col-actions">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {pageData.length === 0 ? (
                    <tr><td colSpan={8} className="empty">No hay resultados con los filtros actuales.</td></tr>
                  ) : pageData.map(p => (
                    <tr key={p.id}>
                      <td>{p.id}</td>
                      <td>{p.fecha}</td>
                      <td>{p.cliente}</td>
                      <td className="wrap">{p.email}</td>
                      <td className="wrap">{(p.items||[]).join(", ")}</td>
                      <td>{toCLP(p.total)}</td>
                      <td><span className={`estado-badge ${clsEstado(p.estado)}`}>{p.estado}</span></td>
                      <td className="actions">
                        <button className="nf-btn tiny outline" onClick={()=>openEdit(p.id)}>Ver/Editar</button>
                        <button className="nf-btn tiny danger" onClick={()=>onDelete(p.id)}>Eliminar</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="pager">
              <div className="left">
                <span>Por página</span>
                <select value={pageSize} onChange={e=>setPageSize(Number(e.target.value))}>
                  {[5,10,20,50].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
              </div>
              <div className="right">
                <button disabled={page<=1} onClick={()=>setPage(p=>Math.max(1,p-1))}>◀</button>
                <span>{page} / {maxPage}</span>
                <button disabled={page>=maxPage} onClick={()=>setPage(p=>Math.min(maxPage,p+1))}>▶</button>
              </div>
            </div>
          </div>

          {/* Modal */}
          {open && (
            <div className="modal d-block" tabIndex="-1" onClick={(e)=>{ if(e.target===e.currentTarget) setOpen(false); }}>
              <div className="modal-dialog modal-lg modal-dialog-centered">
                <div className="modal-content bg-dark text-light">
                  <div className="modal-header">
                    <h5 className="modal-title">Pedido {editingId ? form.id : "(nuevo)"}</h5>
                    <button type="button" className="btn-close btn-close-white" onClick={()=>setOpen(false)}></button>
                  </div>
                  <form onSubmit={onSave}>
                    <div className="modal-body">
                      <div className="row g-3">
                        <div className="col-md-4">
                          <label className="form-label">ID (opcional)</label>
                          <input className="form-control" value={form.id} onChange={e=>setForm(f=>({...f,id:e.target.value}))} placeholder="NF-1234"/>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Fecha</label>
                          <input type="date" className="form-control" value={form.fecha} onChange={e=>setForm(f=>({...f,fecha:e.target.value}))}/>
                        </div>
                        <div className="col-md-4">
                          <label className="form-label">Total (CLP)</label>
                          <input type="number" min="0" step="100" className="form-control" value={form.total} onChange={e=>setForm(f=>({...f,total:e.target.value}))}/>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Cliente</label>
                          <input className="form-control" value={form.cliente} onChange={e=>setForm(f=>({...f,cliente:e.target.value}))}/>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Email</label>
                          <input type="email" className="form-control" value={form.email} onChange={e=>setForm(f=>({...f,email:e.target.value}))}/>
                        </div>
                        <div className="col-md-6">
                          <label className="form-label">Estado</label>
                          <select className="form-select" value={form.estado} onChange={e=>setForm(f=>({...f,estado:e.target.value}))}>
                            {ESTADOS.map(s => <option key={s} value={s}>{s}</option>)}
                          </select>
                        </div>
                        <div className="col-12">
                          <label className="form-label">Artículos (separados por coma)</label>
                          <textarea className="form-control" rows={3} value={form.items} onChange={e=>setForm(f=>({...f,items:e.target.value}))} placeholder="Agenda 2025 x1, Planner Digital x1"></textarea>
                        </div>
                      </div>
                    </div>
                    <div className="modal-footer">
                      <button type="button" className="btn btn-outline-secondary" onClick={()=>setOpen(false)}>Cerrar</button>
                      <button className="btn btn-primary">Guardar</button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PedidosPage;
