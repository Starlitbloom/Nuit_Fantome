document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("registerForm");

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Inputs
        const emailInput = document.getElementById("email");
        const telefonoInput = document.getElementById("telefono");
        const cumpleanosInput = document.getElementById("cumpleanos");
        const passwordInput = document.getElementById("password");
        const confirmPasswordInput = document.getElementById("confirmPassword");

        // Error spans
        const emailError = document.getElementById("email-error");
        const telefonoError = document.getElementById("telefono-error");
        const cumpleanosError = document.getElementById("cumpleanos-error");
        const passwordError = document.getElementById("password-error");
        const confirmPasswordError = document.getElementById("confirmPassword-error");

        // Limpiar mensajes
        emailError.textContent = "";
        telefonoError.textContent = "";
        cumpleanosError.textContent = "";
        passwordError.textContent = "";
        confirmPasswordError.textContent = "";

        let valid = true;

        // Validar email
        const email = emailInput.value.trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!email) {
            emailError.textContent = "Por favor ingresa tu correo.";
            valid = false;
        } else if (!emailRegex.test(email)) {
            emailError.textContent = "Correo inválido.";
            valid = false;
        }

        // Validar teléfono
        const telefono = telefonoInput.value.trim();
        const telefonoRegex = /^\d{8,9}$/;
        if (!telefono) {
            telefonoError.textContent = "Por favor ingresa tu teléfono.";
            valid = false;
        } else if (!telefonoRegex.test(telefono)) {
            telefonoError.textContent = "Teléfono debe tener 8 o 9 dígitos.";
            valid = false;
        }

        // Validar cumpleaños
        const cumpleanos = cumpleanosInput.value.trim();
        if (!cumpleanos) {
            cumpleanosError.textContent = "Por favor ingresa tu fecha de cumpleaños.";
            valid = false;
        }

        // Validar contraseña
        const password = passwordInput.value.trim();
        if (!password) {
            passwordError.textContent = "Por favor ingresa tu contraseña.";
            valid = false;
        } else if (password.length < 6) {
            passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
            valid = false;
        }

        // Validar confirmación
        const confirmPassword = confirmPasswordInput.value.trim();
        if (!confirmPassword) {
            confirmPasswordError.textContent = "Confirma tu contraseña.";
            valid = false;
        } else if (password !== confirmPassword) {
            confirmPasswordError.textContent = "Las contraseñas no coinciden.";
            valid = false;
        }

        if (!valid) return;

        // Guardar usuario en localStorage
        let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
        // Revisar si ya existe el correo
        if (usuarios.some(u => u.email === email)) {
            emailError.textContent = "Este correo ya está registrado.";
            return;
        }

        usuarios.push({ email, telefono, cumpleanos, password });
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        alert("¡Cuenta creada con éxito! Ahora puedes iniciar sesión.");
        form.reset();

        // Redirigir a login
        window.location.href = "login.html";
    });

    // Toggle contraseña
    const toggleButtons = document.querySelectorAll(".toggle-password");
    toggleButtons.forEach(btn => {
        btn.addEventListener("click", function () {
            const input = this.parentElement.querySelector("input");
            if (input.type === "password") {
                input.type = "text";
                this.querySelector("i").classList.replace("bi-eye-fill", "bi-eye-slash-fill");
            } else {
                input.type = "password";
                this.querySelector("i").classList.replace("bi-eye-slash-fill", "bi-eye-fill");
            }
        });
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