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

    let productos = []; // Muestra la lista de productos en el carrito

    // Función para agregar un producto
    function agregarProducto(producto) {
        // Revisar si ya está
        const existe = productos.find(p => p.id === producto.id);
        if (existe) {
            existe.cantidad++;
        } else {
            productos.push({...producto, cantidad: 1});
        }
        actualizarCarrito();
        mostrarDropdown(); // Muestra el dropdown al agregar
    }

    // Actualiza la UI del carrito
    function actualizarCarrito() {
        contador.textContent = productos.reduce((acc, p) => acc + p.cantidad, 0);

        carritoItems.innerHTML = "";
        let subtotal = 0;

        productos.forEach(p => {
            subtotal += p.precio * p.cantidad;
            carritoItems.innerHTML += `
                <div class="carrito-item">
                    <img src="${p.img}" alt="${p.nombre}">
                    <div class="carrito-info">
                        <p class="nombre">${p.nombre}</p>
                        <p class="precio">$${p.precio}</p>
                        <div class="cantidad">
                            <button class="menos">-</button>
                            <span>${p.cantidad}</span>
                            <button class="mas">+</button>
                        </div>
                    </div>
                    <i class="fas fa-trash"></i>
                </div>
            `;
        });

        subtotalEl.textContent = `$${subtotal}`;
        agregarEventosItems();
    }

    // Agrega eventos a los botones +, -, borrar
    function agregarEventosItems() {
        const botonesMas = carritoItems.querySelectorAll(".mas");
        const botonesMenos = carritoItems.querySelectorAll(".menos");
        const botonesTrash = carritoItems.querySelectorAll(".fa-trash");

        botonesMas.forEach((btn, i) => {
            btn.addEventListener("click", () => { productos[i].cantidad++; actualizarCarrito(); });
        });
        botonesMenos.forEach((btn, i) => {
            btn.addEventListener("click", () => { 
                if(productos[i].cantidad > 1) productos[i].cantidad--; 
                else productos.splice(i,1);
                actualizarCarrito(); 
            });
        });
        botonesTrash.forEach((btn, i) => {
            btn.addEventListener("click", () => { productos.splice(i,1); actualizarCarrito(); });
        });
    }

    // Mostrar/ocultar dropdown al hacer click en carrito
    carrito.addEventListener("click", function(e) {
        if(e.target.closest(".carrito-dropdown")) return; // no cerrar si se clickea dentro
        dropdown.style.display = (dropdown.style.display === "block") ? "none" : "block";
    });

    // Cerrar si se hace click fuera
    window.addEventListener("click", function(e) {
        if(!carrito.contains(e.target)) dropdown.style.display = "none";
    });

    // Función para mostrar dropdown
    function mostrarDropdown() {
        dropdown.style.display = "block";
    }

    // Ejemplo: agregar producto al carrito (puedes usar botones de tu listado de productos)
    // agregarProducto({id:1, nombre:"Cuaderno Fantôme", precio:5000, img:"assets/img/producto1.jpg"});
});
