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

/* Menu desplegable */
function actualizarContador() {
    const contador = document.getElementById("contador");
    const total = productos.reduce((acc, p) => acc + p.cantidad, 0);
    contador.textContent = total;
}

/* Efecto parallax */
window.addEventListener("scroll", function() {
  let scrollPos = window.scrollY;
  document.querySelector(".fondo-img").style.transform = `translateY(${scrollPos * 0.5}px)`;
});

/* Lista de productos */
const productos = [
    { id:"washi02", categoria:"Cintas / Washi", nombre: "Washi tape ilustrada “Vida diaria”", precio: "$3.490", img: "assets/img/washi-vida-diaria.jpg" },
    { id:"cua03", categoria:"Cuadernos & Libretas", nombre: "Cuaderno ilustrado A5 – Pinturas", precio: "$4.990", img: "assets/img/cuaderno-pinturas.jpg" },
    { id:"est01", categoria:"Estuches", nombre: "Estuche Sanrio (set 4)", precio: "$8.990", img: "assets/img/estuche-kuromi.jpg" },
    { id:"post02", categoria:"Notas adhesivas", nombre: "Notas adhesivas Kuromi / My Melody", precio: "$2.990", img: "assets/img/postit-kuromi-mymelody.jpg" },
    { id:"bol01", categoria:"Bolígrafos", nombre: "Bolígrafos Sakura gel (pack)", precio: "$9.990", img: "assets/img/sakura-boligrafos.jpg" },
    { id:"tij01", categoria:"Tijeras", nombre: "Tijeras My Melody", precio: "$6.990", img: "assets/img/tijeras-my-melody.jpg" },
    { id:"set01", categoria:"Sets", nombre: "Set papelería “Gato Rosado”", precio: "$10.990", img: "assets/img/set-gato-rosado.jpg" },
    { id:"set02", categoria:"Sets", nombre: "Set papelería “Gato Azul”", precio: "$10.990", img: "assets/img/set-gato-azul.jpg" }
];

const contenedor = document.getElementById("productos-container");

// Generar productos dinámicamente con enlaces a su ID en producto.html
productos.forEach(producto => {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
            <img src="${producto.img}" alt="${producto.nombre}">
            <p class="categoria">${producto.categoria}</p>
            <h3>${producto.nombre}</h3>
            <p class="precio">${producto.precio}</p>
    `;
    div.addEventListener("click", () => {
        window.location.href = `producto.html?id=${producto.id}`;
    });
      
    contenedor.appendChild(div);
});

