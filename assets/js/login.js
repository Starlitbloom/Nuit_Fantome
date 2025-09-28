document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    // Limpiar mensajes anteriores
    emailError.textContent = "";
    passwordError.textContent = "";
    passwordError.style.color = "rgb(94, 25, 163)"; // color original

    let valid = true;

    // Validar correo
    const allowedDomains = ["gmail.com", "duocuc.cl", "profesor.duocuc.cl"];
    const emailParts = email.split("@");
    const domain = emailParts[1] || "";

    if (!email) {
      emailError.textContent = "Por favor ingresa tu correo.";
      valid = false;
    } else if (email.length > 100) {
      emailError.textContent = "El correo no puede superar 100 caracteres.";
      valid = false;
    } else if (emailParts.length !== 2 || !allowedDomains.includes(domain)) {
      emailError.textContent = "Correo no válido";
      valid = false;
    }

    // Validar contraseña
    if (!password) {
      passwordError.textContent = "Por favor ingresa tu contraseña.";
      valid = false;
    } else if (password.length < 4 || password.length > 10) {
      passwordError.textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
      valid = false;
    }

    if (!valid) return;

    // Obtener usuarios desde localStorage
    const usuarios = JSON.parse(localStorage.getItem("nf_users_v1")) || [];


    // Buscar usuario
    const usuario = usuarios.find(u => u.email === email);

    if (!usuario) {
      emailError.textContent = "Correo no registrado.";
      return;
    }

    if (usuario.password !== password) {
      passwordError.textContent = "Contraseña incorrecta.";
      return;
    }

    // Guardar usuario actual en localStorage
    localStorage.setItem("usuarioActual", JSON.stringify(usuario));

    passwordError.textContent = "¡Inicio de sesión exitoso!";
    passwordError.style.color = "purple";

    // Redirigir a index.html después de 1 segundo
    setTimeout(() => {
      if (usuario.rol.trim().toLowerCase() === "administrador") {
        window.location.href = "./admin/dashboard.html";
      } else {
        window.location.href = "./index.html";
      }
    }, 1000);
  });

});

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