// src/data/newsletterData.js

// --- Inicialización ---
// Cargamos los datos guardados desde localStorage, o empezamos con un arreglo vacío
let subscribers = JSON.parse(localStorage.getItem("subscribers")) || [];

// --- Función: agregar nuevo suscriptor ---
export function addSubscriber(email) {
  const existe = subscribers.includes(email);

  if (existe) {
    return false; // Ya estaba registrado
  }

  subscribers.push(email);
  saveToLocalStorage(); // Guardamos el cambio
  console.log("Lista actual de suscriptores:", subscribers);
  return true;
}

// --- Función: obtener todos los suscriptores ---
export function getSubscribers() {
  return subscribers;
}

// --- Función: eliminar un suscriptor ---
export function removeSubscriber(email) {
  subscribers = subscribers.filter((e) => e !== email);
  saveToLocalStorage();
}

// --- Función: borrar todos los suscriptores ---
export function clearSubscribers() {
  subscribers = [];
  saveToLocalStorage();
}

// --- Guardar en localStorage ---
function saveToLocalStorage() {
  localStorage.setItem("subscribers", JSON.stringify(subscribers));
}
