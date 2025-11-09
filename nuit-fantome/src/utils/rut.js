// src/utils/rut.js
export function formatRut(raw = "") {
  const s = String(raw).replace(/[^0-9kK]/g, "").toUpperCase();
  if (!s) return "";
  const body = s.slice(0, -1);
  const dv = s.slice(-1);
  const withDots = body.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${withDots}-${dv}`;
}

export function validateRut(raw = "") {
  const txt = String(raw).replace(/[^0-9kK]/g, "").toUpperCase();
  if (txt.length < 2) return false;
  const body = txt.slice(0, -1);
  const dv = txt.slice(-1);
  let sum = 0, mul = 2;
  for (let i = body.length - 1; i >= 0; i--) {
    sum += parseInt(body[i], 10) * mul;
    mul = mul === 7 ? 2 : mul + 1;
  }
  const res = 11 - (sum % 11);
  const dvCalc = res === 11 ? "0" : res === 10 ? "K" : String(res);
  return dv === dvCalc;
}
