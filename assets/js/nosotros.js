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