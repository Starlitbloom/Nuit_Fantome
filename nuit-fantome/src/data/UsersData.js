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

  // Validaciones: que no exista el mismo correo, rut o teléfono
  if (users.some(u => u.email.toLowerCase() === newUser.email.toLowerCase())) {
    throw new Error("Este correo ya está registrado.");
  }
  if (users.some(u => u.rut === newUser.rut)) {
    throw new Error("Este RUT ya está registrado.");
  }
  if (users.some(u => u.telefono === newUser.telefono)) {
    throw new Error("Este teléfono ya está registrado.");
  }

  users.unshift(newUser);
  saveUsers(users);
}

// Buscar usuario por correo
export function getUserByEmail(email) {
  const users = getUsers();
  return users.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Eliminar usuario
export function deleteUser(email) {
  let users = getUsers().filter(u => u.email.toLowerCase() !== email.toLowerCase());
  saveUsers(users);
}

// Actualizar usuario
export function updateUser(updatedUser) {
  let users = getUsers().map(u => (u.email === updatedUser.email ? updatedUser : u));
  saveUsers(users);
}