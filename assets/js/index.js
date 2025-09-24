/* Slider */
let currentIndex = 0;
const slides = document.querySelectorAll(".slide");
const dots = document.querySelectorAll(".dot");

function showSlide(index) {
  if (index >= slides.length) currentIndex = 0;
  else if (index < 0) currentIndex = slides.length - 1;
  else currentIndex = index;

  // Con esto se mueve el contenedor
  document.querySelector(".slides").style.transform = 
    `translateX(-${currentIndex * 100}%)`;

  // Se van actualizando los puntos
  dots.forEach((dot, i) => {
    dot.classList.toggle("active", i === currentIndex);
  });
}

document.querySelector(".prev").addEventListener("click", () => showSlide(currentIndex - 1));
document.querySelector(".next").addEventListener("click", () => showSlide(currentIndex + 1));
dots.forEach((dot, i) => dot.addEventListener("click", () => showSlide(i)));

// Se hace un auto-slide cada 5s
setInterval(() => showSlide(currentIndex + 1), 5000);

/* Menu desplegable */
    document.addEventListener("DOMContentLoaded", function () {
        const btnAcceder = document.querySelector(".btn-acceder");
        const dropdown = document.querySelector(".dropdown-content");

        btnAcceder.addEventListener("click", function () {
            dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
        });

        // Se cierra el menú si se hace click fuera
        window.addEventListener("click", function (e) {
            if (!e.target.matches(".btn-acceder")) {
                if (dropdown.style.display === "block") {
                    dropdown.style.display = "none";
                }
            }
        });
    });

/* Carrito de compras */
document.addEventListener("DOMContentLoaded", function() {
    const carrito = document.getElementById("carrito");
    const dropdown = document.getElementById("carritoDropdown");
    const contador = document.getElementById("contador");
    const carritoItems = document.getElementById("carritoItems");
    const subtotalEl = document.getElementById("subtotal");
    const mensajeAgregado = document.getElementById("mensajeAgregado");
    const faltanteEnvio = document.getElementById("faltanteEnvio");
    const envioGratis = document.getElementById("envioGratis");

    const MIN_ENVIO_GRATIS = 24990; // Umbral para envío gratis
    let productos = []; // Lista de productos en el carrito

    // ------------------------------------
    // Función para agregar un producto
    // ------------------------------------
    function agregarProducto(producto) {
        const existe = productos.find(p => p.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            productos.push({...producto, cantidad: 1});
        }
        actualizarCarrito();
        mostrarDropdown();
        mostrarMensajeAgregado();
    }

    // ------------------------------------
    // Actualiza la UI del carrito
    // ------------------------------------
    function actualizarCarrito() {
        contador.textContent = productos.reduce((acc, p) => acc + p.cantidad, 0);

        carritoItems.innerHTML = ""; // limpiar antes de agregar
        let subtotal = 0;

        productos.forEach(p => {
            subtotal += p.precio * p.cantidad;

            const item = document.createElement("div");
            item.classList.add("carrito-item");

            item.innerHTML = `
                <img src="${p.img}" alt="${p.nombre}">
                <div class="carrito-detalle">
                    <div class="carrito-info">
                        <span class="nombre">${p.nombre}</span>
                        <span class="precio">$${p.precio}</span>
                    </div>
                    <div class="carrito-actions">
                        <div class="cantidad">
                            <button class="menos">-</button>
                            <span>${p.cantidad}</span>
                            <button class="mas">+</button>
                        </div>
                        <i class="fas fa-trash"></i>
                    </div>
                </div>
            `;
            carritoItems.appendChild(item);
        });

        subtotalEl.textContent = `$${subtotal}`;
        agregarEventosItems();
        actualizarEnvioGratis(subtotal);
    }

    // ------------------------------------
    // Eventos de botones +, -, borrar
    // ------------------------------------
    function agregarEventosItems() {
        const botonesMas = carritoItems.querySelectorAll(".mas");
        const botonesMenos = carritoItems.querySelectorAll(".menos");
        const botonesTrash = carritoItems.querySelectorAll(".fa-trash");

        botonesMas.forEach((btn, i) => {
            btn.addEventListener("click", () => { 
                productos[i].cantidad++; 
                actualizarCarrito(); 
            });
        });
        botonesMenos.forEach((btn, i) => {
            btn.addEventListener("click", () => { 
                if(productos[i].cantidad > 1) productos[i].cantidad--; 
                else productos.splice(i,1);
                actualizarCarrito(); 
            });
        });
        botonesTrash.forEach((btn, i) => {
            btn.addEventListener("click", () => { 
                productos.splice(i,1); 
                actualizarCarrito(); 
            });
        });
    }

    // ------------------------------------
    // Mostrar/ocultar dropdown
    // ------------------------------------
    carrito.addEventListener("click", function(e) {
        if(e.target.closest(".carrito-dropdown")) return; // no cerrar si se clickea dentro
        dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
    });

    window.addEventListener("click", function(e) {
        if(!carrito.contains(e.target)) dropdown.style.display = "none";
    });

    function mostrarDropdown() {
        dropdown.style.display = "block";
    }

    // ------------------------------------
    // Mensaje de producto agregado
    // ------------------------------------
    function mostrarMensajeAgregado() {
        mensajeAgregado.style.display = "block";
        setTimeout(() => {
            mensajeAgregado.style.display = "none";
        }, 2500);
    }

    // ------------------------------------
    // Actualiza aviso de envío gratis
    // ------------------------------------
    function actualizarEnvioGratis(subtotal) {
        if (subtotal >= MIN_ENVIO_GRATIS) {
            envioGratis.textContent = "🎉 ¡Ya tienes envío gratis!";
            envioGratis.style.background = "#e6ffe9";
            envioGratis.style.color = "#2d8a45";
        } else {
            const faltante = MIN_ENVIO_GRATIS - subtotal;
            faltanteEnvio.textContent = `$${faltante}`;
            envioGratis.style.background = "#f9f3e7";
            envioGratis.style.color = "#b98b2b";
        }
    }

    // ------------------------------------
    // Ejemplo: agregar un producto para probar
    // ------------------------------------
    // agregarProducto({id:1, nombre:"Cuaderno Fantôme", precio:5000, img:"assets/img/producto1.jpg"});
});
