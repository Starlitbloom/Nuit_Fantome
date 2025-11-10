// src/data/ordersDb.js

const KEY_ORDERS = "nf_orders_v1";

/** ====== Seed (igual a tu HTML) ====== */
const SEED = [
  {id:"NF-001", fecha:"2025-09-20", cliente:"María López",  email:"maria@example.com",  items:["Agenda 2025 x1","Planner Digital x1"], total:35990, estado:"Pendiente"},
  {id:"NF-002", fecha:"2025-09-21", cliente:"Carlos Díaz",  email:"carlos@example.com", items:["Set Stickers Fantôme x2"],           total:11980, estado:"Completado"},
  {id:"NF-003", fecha:"2025-09-22", cliente:"Ana Rivas",    email:"ana.rivas@example.com", items:["Cuaderno Dot Grid x1","Marcadores Pastel x1"], total:18990, estado:"En proceso"},
  {id:"NF-004", fecha:"2025-09-23", cliente:"Tomás P.",     email:"tomasp@example.com",   items:["Planner Digital x1"],              total:7990,  estado:"Cancelado"},
  {id:"NF-005", fecha:"2025-09-24", cliente:"Daniela Soto", email:"daniela@example.com",  items:["Agenda 2025 x1"],                  total:14990, estado:"Pendiente"}
];

function read() {
  try {
    const raw = localStorage.getItem(KEY_ORDERS);
    if (raw) return JSON.parse(raw);
  } catch {}
  localStorage.setItem(KEY_ORDERS, JSON.stringify(SEED));
  return [...SEED];
}
function write(list) {
  localStorage.setItem(KEY_ORDERS, JSON.stringify(list));
}

/** ===== API ===== */
export function getOrders() {
  return read();
}

export function addOrder(partial) {
  const list = read();
  const nuevo = {
    id: partial.id || genId(),
    fecha: partial.fecha || new Date().toISOString().slice(0,10),
    cliente: (partial.cliente || "").trim() || "Cliente",
    email: (partial.email || "").trim() || "demo@example.com",
    items: Array.isArray(partial.items) ? partial.items : [(partial.items || "Producto demo x1")],
    total: Number(partial.total || 0),
    estado: partial.estado || "Pendiente",
  };
  if (list.some(o => o.id === nuevo.id)) throw new Error("El ID del pedido ya existe");
  const out = [nuevo, ...list];
  write(out);
  return out;
}

export function updateOrder(id, patch) {
  const list = read();
  const i = list.findIndex(o => o.id === id);
  if (i === -1) throw new Error("Pedido no encontrado");
  // si cambian ID, validar choque
  if (patch.id && patch.id !== id && list.some(o => o.id === patch.id)) {
    throw new Error("Ya existe un pedido con ese ID");
  }
  const updated = { ...list[i], ...patch };
  // normalizar
  updated.total = Number(updated.total || 0);
  updated.items = Array.isArray(updated.items) ? updated.items : String(updated.items || "").split(",").map(s=>s.trim()).filter(Boolean);
  list[i] = updated;
  write(list);
  return list;
}

export function deleteOrder(id) {
  const out = read().filter(o => o.id !== id);
  write(out);
  return out;
}

export function getOrderById(id) {
  return read().find(o => o.id === id) || null;
}

export function exportOrdersCSV(rows) {
  const data = rows?.length ? rows : read();
  const header = ["ID","Fecha","Cliente","Email","Artículos","Total","Estado"];
  const lines = [header, ...data.map(p => [
    p.id, p.fecha, p.cliente, p.email, (p.items || []).join(" | "), p.total, p.estado
  ])];
  const csv = lines.map(r => r.map(v => `"${String(v).replaceAll('"','""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type:"text/csv;charset=utf-8;" });
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = "pedidos.csv";
  a.click();
}

/** Helpers */
function genId() {
  const n = Math.floor(Math.random()*9000)+1000;
  return `NF-${n}`;
}
