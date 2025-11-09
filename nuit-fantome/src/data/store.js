const CART_KEY = "nf_cart";
const ORDERS_KEY = "nf_orders";

export function getCart() {
  try { return JSON.parse(localStorage.getItem(CART_KEY)) || []; } catch { return []; }
}
export function setCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items || []));
}
export function clearCart() {
  localStorage.removeItem(CART_KEY);
}

function readOrders() {
  try { return JSON.parse(localStorage.getItem(ORDERS_KEY)) || {}; } catch { return {}; }
}
function writeOrders(obj) {
  localStorage.setItem(ORDERS_KEY, JSON.stringify(obj));
}
export function createOrder(order) {
  const id = Date.now().toString();
  const all = readOrders();
  all[id] = { id, ...order, createdAt: new Date().toISOString() };
  writeOrders(all);
  return id;
}
export function getOrderById(id) {
  const all = readOrders();
  return all[id] || null;
}

export function calcTotals(cart) {
  const subtotal = cart.reduce((acc, i) => acc + i.precio * i.cantidad, 0);
  const envio = 0;
  const total = subtotal + envio;
  return { subtotal, envio, total };
}
