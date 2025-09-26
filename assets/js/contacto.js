document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("contactForm");
  const asunto = document.getElementById("asunto");
  const dynamicArea = document.getElementById("dynamicArea");

  // Crear contenedor de mensaje de éxito debajo del formulario
  let successMsg = document.createElement("div");
  successMsg.id = "successMsg";
  successMsg.style.color = "green";
  successMsg.style.fontWeight = "600";
  successMsg.style.marginTop = "12px";
  successMsg.style.textAlign = "center";
  form.appendChild(successMsg);

  // Función para limpiar área dinámica
  function clearDynamic() {
    dynamicArea.innerHTML = "";
  }

  // Función para crear campo con label + input + error span
  function createField(id, label, type = "text", placeholder = "") {
    const wrapper = document.createElement("div");
    wrapper.classList.add("field");

    const lbl = document.createElement("label");
    lbl.setAttribute("for", id);
    lbl.textContent = label;

    const input = document.createElement("input");
    input.type = type;
    input.id = id;
    input.name = id;
    input.placeholder = placeholder;

    const error = document.createElement("div");
    error.classList.add("error-msg");
    error.id = `${id}Error`;

    wrapper.appendChild(lbl);
    wrapper.appendChild(input);
    wrapper.appendChild(error);

    return wrapper;
  }

  // Manejar el cambio de asunto
  asunto.addEventListener("change", () => {
    clearDynamic();
    successMsg.textContent = ""; // limpiar mensaje de éxito al cambiar asunto
    switch (asunto.value) {
      case "estado":
        dynamicArea.appendChild(
          createField("pedido", "N° de pedido (950000XXXXX)", "text", "Ingrese su número de pedido")
        );
        break;

      case "cambio":
        dynamicArea.appendChild(
          createField("ticket", "Ticket de compra", "text", "Ingrese su número de ticket")
        );
        dynamicArea.appendChild(
          createField("producto", "Producto a cambiar", "text", "Ingrese el nombre del producto")
        );
        break;

      case "devolucion":
      case "cancelar":
        dynamicArea.appendChild(
          createField("ticket", "Ticket de compra", "text", "Ingrese su número de ticket")
        );
        break;

      case "experiencia":
        dynamicArea.appendChild(
          createField("comentario", "Cuéntanos tu experiencia", "text", "Escribe tu comentario")
        );
        break;
    }

    // Siempre agregamos correo y mensaje al final
    dynamicArea.appendChild(
      createField("correo", "Correo electrónico", "email", "ejemplo@correo.com")
    );
    dynamicArea.appendChild(createField("mensaje", "Mensaje", "text", "Escribe tu mensaje"));
  });

  // Validaciones
  function validateField(id, message, condition) {
    const input = document.getElementById(id);
    const error = document.getElementById(`${id}Error`);
    if (!input) return true; // si no existe el campo, no validar

    if (condition(input.value)) {
      error.textContent = "";
      return true;
    } else {
      error.textContent = message;
      return false;
    }
  }

  // Validar formulario al enviar
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    successMsg.textContent = ""; // limpiar mensaje anterior

    let valid = true;

    // Error de asunto como mensaje debajo
    const asuntoError = document.getElementById("asuntoError");
    if (!asuntoError) {
      const error = document.createElement("div");
      error.classList.add("error-msg");
      error.id = "asuntoError";
      asunto.insertAdjacentElement("afterend", error);
    }
    const error = document.getElementById("asuntoError");
    if (asunto.value === "") {
      error.textContent = "Por favor selecciona un asunto";
      return;
    } else {
      error.textContent = "";
    }

    // Reglas según asunto
    if (document.getElementById("pedido")) {
      valid &&= validateField("pedido", "Por favor ingresa un número de pedido", (v) => v.trim() !== "");
    }
    if (document.getElementById("ticket")) {
      valid &&= validateField("ticket", "Por favor ingresa un número de ticket", (v) => v.trim() !== "");
    }
    if (document.getElementById("producto")) {
      valid &&= validateField("producto", "Por favor ingresa el producto", (v) => v.trim() !== "");
    }
    if (document.getElementById("comentario")) {
      valid &&= validateField("comentario", "Por favor ingresa tu comentario", (v) => v.trim() !== "");
    }

    valid &&= validateField(
      "correo",
      "Por favor ingresa un correo válido",
      (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)
    );

    valid &&= validateField(
      "mensaje",
      "Por favor ingresa un mensaje",
      (v) => v.trim() !== ""
    );

    if (valid) {
      successMsg.textContent = "Formulario enviado correctamente ✅";
      form.reset();
      clearDynamic();
    }
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