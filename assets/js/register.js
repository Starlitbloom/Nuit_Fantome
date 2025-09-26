document.addEventListener("DOMContentLoaded", function() {

  const form = document.getElementById("registerForm");

  // Inputs
  const emailInput = document.getElementById("email");
  const telefonoInput = document.getElementById("telefono");
  const cumpleInput = document.getElementById("cumpleanos");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("confirmPassword");

  // Mensajes de error
  const emailError = document.getElementById("email-error");
  const telefonoError = document.getElementById("telefono-error");
  const cumpleError = document.getElementById("cumpleanos-error");
  const passwordError = document.getElementById("password-error");
  const confirmPasswordError = document.getElementById("confirmPassword-error");

  form.addEventListener("submit", function(event) {
    event.preventDefault();

    // Limpiar errores
    emailError.textContent = "";
    telefonoError.textContent = "";
    cumpleError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";

    let valid = true;

    const email = emailInput.value.trim();
    const telefono = telefonoInput.value.trim();
    const cumple = cumpleInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Validaciones
    if (!email) {
      emailError.textContent = "Por favor ingresa tu correo.";
      valid = false;
    } else if (!emailRegex.test(email)) {
      emailError.textContent = "Correo inválido.";
      valid = false;
    }

    if (!telefono) {
      telefonoError.textContent = "Por favor ingresa tu teléfono.";
      valid = false;
    } else if (!/^\d{8,9}$/.test(telefono)) {
      telefonoError.textContent = "El teléfono debe tener 8 o 9 dígitos.";
      valid = false;
    }

    if (!cumple) {
      cumpleError.textContent = "Por favor ingresa tu cumpleaños.";
      valid = false;
    }

    if (!password) {
      passwordError.textContent = "Por favor ingresa tu contraseña.";
      valid = false;
    } else if (password.length < 6) {
      passwordError.textContent = "La contraseña debe tener al menos 6 caracteres.";
      valid = false;
    }

    if (!confirmPassword) {
      confirmPasswordError.textContent = "Por favor confirma tu contraseña.";
      valid = false;
    } else if (password !== confirmPassword) {
      confirmPasswordError.textContent = "Las contraseñas no coinciden.";
      valid = false;
    }

    if (!valid) return;

    // Guardar usuario en localStorage
    let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    // Verificar si el email ya existe
    if (usuarios.some(u => u.email === email)) {
      emailError.textContent = "Este correo ya está registrado.";
      return;
    }

    usuarios.push({ email, telefono, cumple, password });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    alert("¡Usuario registrado correctamente!");
    form.reset();
  });
});
