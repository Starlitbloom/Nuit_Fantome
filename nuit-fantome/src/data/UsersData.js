// --- Carga inicial automática de usuarios precargados --- //
(function initDefaultUsers() {
  const users = JSON.parse(localStorage.getItem("nf_users_v1"));
  if (!users || users.length === 0) {
    const defaultUsers = [
      {
        nombre: "Maria",
        email: "maria@gmail.com",
        password: "maria123",
        rol: "admin",
        telefono: "+56 9 1234 5678",
        createdAt: new Date().toISOString(),
      },
      {
        nombre: "Rocio",
        email: "rocio@gmail.com",
        password: "rocio123",
        rol: "admin",
        telefono: "+56 9 8765 4321",
        createdAt: new Date().toISOString(),
      },
    ];
    localStorage.setItem("nf_users_v1", JSON.stringify(defaultUsers));
    console.log("Usuarios iniciales precargados 🩷");
  }
})();

// --- Funciones de gestión de usuarios --- //

// Obtener todos los usuarios del localStorage
export function getUsers() {
  return JSON.parse(localStorage.getItem("nf_users_v1")) || [];
}

// Guardar todos los usuarios en el localStorage
function saveUsers(users) {
  localStorage.setItem("nf_users_v1", JSON.stringify(users));
}

// Crear un nuevo usuario
export function addUser(newUser) {
  const users = getUsers();

  if (users.some((u) => u.email.toLowerCase() === newUser.email.toLowerCase())) {
    throw new Error("Este correo ya está registrado.");
  }
  if (users.some((u) => u.rut === newUser.rut)) {
    throw new Error("Este RUT ya está registrado.");
  }
  if (users.some((u) => u.telefono === newUser.telefono)) {
    throw new Error("Este teléfono ya está registrado.");
  }

  users.unshift(newUser);
  saveUsers(users);
}

// Buscar usuario por correo
export function getUserByEmail(email) {
  const users = getUsers();
  return users.find((u) => u.email.toLowerCase() === email.toLowerCase());
}

// Eliminar usuario
export function deleteUser(email) {
  let users = getUsers().filter(
    (u) => u.email.toLowerCase() !== email.toLowerCase()
  );
  saveUsers(users);
}

// Actualizar usuario
export function updateUser(updatedUser) {
  let users = getUsers().map((u) =>
    u.email === updatedUser.email ? updatedUser : u
  );
  saveUsers(users);
}
