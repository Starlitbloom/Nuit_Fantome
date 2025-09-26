document.addEventListener("DOMContentLoaded", function() {

  const usuarios = [
    { email: "usuario1@ejemplo.com", password: "1234" },
    { email: "usuario2@ejemplo.com", password: "abcd" }
  ];

  const form = document.getElementById("login-form");
  const emailInput = document.getElementById("email");
  const passwordInput = document.getElementById("password");
  const emailError = document.getElementById("email-error");
  const passwordError = document.getElementById("password-error");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Limpiar mensajes anteriores
    emailError.textContent = "";
    passwordError.textContent = "";

    let valid = true;

    // Validaciones
    if (!email) {
      emailError.textContent = "Por favor ingresa tu correo.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Correo inválido.";
      valid = false;
    }

    if (!password) {
      passwordError.textContent = "Por favor ingresa tu contraseña.";
      valid = false;
    }

    if (!valid) return;

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

    passwordError.textContent = "¡Inicio de sesión exitoso!";
    passwordError.style.color = "green";

    // Aquí podrías redirigir a otra página:
    // window.location.href = "home.html";
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