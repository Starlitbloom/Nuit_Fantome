import React, { useState, useEffect, useMemo } from "react";
import "../../assets/css/usuario.css"; // Archivo donde están tus estilos generales
import { Link, useNavigate } from "react-router-dom";
// Simulación de funciones de datos (asumiendo que UsersData.js existe y funciona)
import {
  getUsers,
  addUser,
  deleteUser,
  updateUser,
  getUserByEmail,
} from "../../data/UsersData.js";

// Importar librería XLSX (SheetJS)
import * as XLSX from "xlsx"; 

const FormularioUsuario = ({ onSubmit, titulo, vista, formData, handleChange, previewUrl, handleFileChange}) => (
    <div className="container">
      <form className="form" onSubmit={onSubmit} autoComplete="off">
        <h2 style={{marginTop: 0}}>{titulo}</h2>
        <div className="grid2">

          {/* 1. Identificación */}
          <div className="section-title">Identificación</div><div className="divider"></div>
          
          <div>
            <label>RUT</label>
            <input className="input" name="rut" value={formData.rut} onChange={handleChange} required placeholder="Ej: 12345678-K" />
            <div className="help">No se permiten RUT repetidos.</div>
          </div>
          
          <div>
            <label>Correo electrónico</label>
            <input className="input" type="email" name="email" value={formData.email} onChange={handleChange} required disabled={vista === "editar"} placeholder="ejemplo@dominio.cl"/>
            <div className="help">No se permiten correos repetidos.</div>
          </div>

          {/* 2. Datos personales */}
          <div className="section-title">Datos personales</div><div className="divider"></div>
          
          <div>
            <label>Nombre</label>
            <input className="input" type="text" name="nombre" value={formData.nombre} onChange={handleChange} required/>
          </div>
          
          <div>
            <label>Apellido</label>
            <input className="input" name="apellido" value={formData.apellido} onChange={handleChange} required />
          </div>
          
          <div>
            <label>Teléfono</label>
            <input className="input" type="text" name="telefono" value={formData.telefono} onChange={handleChange} placeholder="56912345678"/>
          </div>
          
          <div>
            <label>Cumpleaños</label>
            <input className="input" name="birthday" type="date" value={formData.birthday} onChange={handleChange} />
          </div>

          {/* 3. Dirección (SIMPLIFICADA) */}
          <div className="section-title">Dirección</div><div className="divider"></div>

          <div>
            <label>Región</label>
            <select className="input" name="region" value={formData.region} onChange={handleChange}>
              <option value="">Selecciona una región</option>
              <option value="RM">Región Metropolitana</option>
              <option value="VII">Maule</option>
              {/* Añade más regiones según sea necesario */}
            </select>
          </div>
          
          <div>
            <label>Comuna</label>
            <select className="input" name="comuna" value={formData.comuna} onChange={handleChange}>
              <option value="">Selecciona una comuna</option>
              {/* Lógica simple para poblar comunas */}
              {formData.region === 'RM' && <option value="SCL">Santiago</option>}
              {formData.region === 'VII' && <option value="Talca">Talca</option>}
            </select>
          </div>
          
          <div style={{gridColumn:'1/-1'}}>
            <label>Dirección</label>
            <input className="input" name="direccion" value={formData.direccion} onChange={handleChange} placeholder="Calle, número, depto..."/>
          </div>

          {/* 4. Seguridad */}
          <div className="section-title">Seguridad</div><div className="divider"></div>

          <div>
            <label>Contraseña {vista === "editar" && '(dejar vacío para mantener)'}</label>
            <input className="input" type="password" name="password" value={formData.password} onChange={handleChange} required={vista === "nuevo"} placeholder="4-10 caracteres"/>
          </div>
          
          <div>
            <label>Confirmar contraseña</label>
            <input className="input" name="confirmPassword" type="password" required={vista === "nuevo"} placeholder={vista === "editar" ? "Confirmar si cambias" : "Repetir contraseña"}/>
          </div>

          {/* 5. Rol & estado */}
          <div className="section-title">Rol & estado</div><div className="divider"></div>

          <div>
            <label>Rol</label>
            <select name="rol" className="input" value={formData.rol} onChange={handleChange} required>
              <option value="cliente">Cliente</option>
              <option value="vendedor">Vendedor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          
          <div>
            <label>Activo</label><br/>
            <label>
              <input 
                type="checkbox" 
                name="activo" 
                checked={formData.activo} 
                onChange={handleChange} 
              /> Usuario activo
            </label>
          </div>

          {/* 6. Imagen & descripción (NO IMPLEMENTADA LA SUBIDA REAL) */}
          <div className="section-title">Imagen & descripción</div><div className="divider"></div>
          
          <div>
            <label>Imagen (URL o sube archivo)</label>
            <input className="input" name="img" value={formData.img} onChange={handleChange} placeholder="../assets/img/avatar.png" />
            <div className="help">Pega una ruta o sube una imagen (tendrá prioridad).</div>
            <div style={{marginTop:'8px', display:'flex', gap:'10px', alignItems:'center', flexWrap:'wrap'}}>
              <input type="file" accept="image/*" className="btn-ghost" style={{padding:'8px'}} onChange={handleFileChange}/>
              {/* NOTA: Usamos un placeholder si no hay imagen, o la URL guardada */}
              <img className="preview" alt="Vista previa" src={formData.img || 'https://via.placeholder.com/120?text=Avatar'} style={{width:'120px', height: '120px', objectFit:'cover', borderRadius:'8px'}} /> 
            </div>
          </div>
          
          <div style={{gridColumn:'1/-1'}}>
            <label>Descripción / notas</label>
            <textarea className="input" name="desc" rows="3" value={formData.desc} onChange={handleChange} placeholder="Notas internas"></textarea>
          </div>

          {/* Botones de acción */}
          <div className="title tools" style={{gridColumn:'1/-1', marginTop:'10px'}}>
            <button className="btn" type="submit">
              <i className="fa-solid fa-floppy-disk"></i> Guardar
            </button>
            <button className="btn-ghost" type="button" onClick={() => setVista("mostrar")}>
              Cancelar
            </button>
          </div>
        </div>
      </form>
    </div>
  );

export default function UsuarioPage() {
  const [usuarios, setUsuarios] = useState([]);
  const [vista, setVista] = useState("mostrar");
  const [formData, setFormData] = useState({
    rut: "",
    nombre: "",
    apellido: "",
    email: "",
    password: "",
    telefono: "",
    birthday: "",
    region: "",
    comuna: "",
    direccion: "",
    img: "",
    desc: "",
    activo: true,
    rol: "cliente",
  });
  // NUEVOS ESTADOS PARA FILTROS Y MODALES
  const [filtros, setFiltros] = useState({
    q: "", // Buscador (qInput)
    rol: "", // rolFilter
    orden: "recientes", // ordenSel
    seleccionados: [], // Para la exportación
  });
  const [modalVisible, setModalVisible] = useState(null); // 'ver' o 'clave'
  const [usuarioDetalle, setUsuarioDetalle] = useState(null); // Usuario a ver en el modal
  const [previewUrl, setPreviewUrl] = useState('');
  const [mensaje, setMensaje] = useState("");
  const [error, setError] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    try {
      const usuarioActual = JSON.parse(
        localStorage.getItem("usuarioActual") || "{}"
      );
      if (!usuarioActual || usuarioActual.rol !== "admin") {
        navigate("/login");
        return;
      }

      document.title = "Gestión de Usuarios";
      setUsuarios(getUsers());
    } catch (err) {
      console.error("⚠️ Error en UsuarioPage:", err);
      setError("Error al cargar datos o verificar la sesión.");
    }
  }, [navigate]);

  // cerrar mensajes
  const handleCloseToast = () => setMensaje("");

  // manejar inputs (función genérica que funciona con los campos nuevos)
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };
  
  // NUEVA FUNCIÓN: Manejar el input de archivo y convertir a Base64
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // 1. Crea la URL temporal para la VISTA PREVIA INMEDIATA (solo visible ahora)
      const urlTemporal = URL.createObjectURL(file);
      setPreviewUrl(urlTemporal);

      // 2. Usa FileReader para convertir el archivo a Base64 para persistencia
      const reader = new FileReader();
      reader.onloadend = () => {
        // Este es el string Base64 (la "URL permanente" simulada)
        const base64String = reader.result; 
        
        // 3. Guarda el string Base64 en el formData.img
        setFormData(prev => ({ 
          ...prev, 
          img: base64String // <--- AHORA GUARDA EL BASE64
        }));
      };
      // Inicia la lectura del archivo
      reader.readAsDataURL(file); 
      
    } else {
      // Limpiar vista previa y formData si no hay archivo
      setPreviewUrl('');
      setFormData(prev => ({ ...prev, img: '' }));
    }
  };
  // Manejar inputs de filtro
  const handleFiltroChange = (e) => {
    const { name, value } = e.target;
    setFiltros({ ...filtros, [name]: value });
  };

  // Limpiar filtros
  const handleLimpiarFiltros = () => {
    setFiltros({ q: "", rol: "", orden: "recientes", seleccionados: [] });
  };

  // agregar usuario
  const handleAgregar = (e) => {
    e.preventDefault();
    try {
      if (!formData.password) throw new Error("La contraseña es obligatoria.");

      const nuevoUsuario = {
        ...formData,
        createdAt: new Date().toISOString(),
      };
      addUser(nuevoUsuario);
      setUsuarios(getUsers());
      setMensaje("✅ Usuario agregado correctamente");
      setFormData({ // Resetear form
        rut: "", nombre: "", apellido: "", email: "", password: "",
        telefono: "", birthday: "", region: "", comuna: "",
        direccion: "", img: "", desc: "", activo: true, rol: "cliente",
      });
      setVista("mostrar");
    } catch (err) {
      setMensaje(`⚠️ ${err.message}`);
    }
  };

  // editar usuario
  const handleEditar = (email) => {
    const usuario = getUserByEmail(email);
    if (usuario) {
      setFormData({
        rut: usuario.rut || "",
        nombre: usuario.nombre,
        apellido: usuario.apellido || "",
        email: usuario.email,
        password: "", // Nunca cargar password
        telefono: usuario.telefono,
        birthday: usuario.birthday || "",
        region: usuario.region || "",
        comuna: usuario.comuna || "",
        direccion: usuario.direccion || "",
        img: usuario.img || "",
        desc: usuario.desc || "",
        activo: usuario.activo === undefined ? true : usuario.activo,
        rol: usuario.rol,
      });
      setVista("editar");
    } else {
      setMensaje("⚠️ Usuario no encontrado.");
    }
  };

  // guardar cambios
  const handleGuardarEdicion = (e) => {
    e.preventDefault();
    try {
      if (!formData.email) throw new Error("Email inválido.");
      // NOTA: En un caso real, validar si se cambió la contraseña
      updateUser(formData);
      setUsuarios(getUsers());
      setMensaje("✅ Usuario actualizado correctamente");
      setVista("mostrar");
    } catch (err) {
      setMensaje(`⚠️ ${err.message}`);
    }
  };

  // eliminar usuario
  const handleEliminar = (email) => {
    if (window.confirm("¿Seguro que deseas eliminar este usuario?")) {
      deleteUser(email);
      setUsuarios(getUsers());
      setMensaje("🗑️ Usuario eliminado");
    }
  };

  // VER USUARIO (Abre Modal)
  const handleVer = (email) => {
    const usuario = getUserByEmail(email);
    if (usuario) {
      setUsuarioDetalle(usuario);
      setModalVisible('ver');
    } else {
      setMensaje("⚠️ Usuario no encontrado.");
    }
  };

  // Lógica de Exportación
  const handleExportar = () => {
    if (filtros.seleccionados.length === 0) {
      setMensaje("⚠️ Selecciona al menos un usuario para exportar.");
      return;
    }
    // Abre el modal de contraseña
    setModalVisible('clave');
  };
  // Lógica para exportar un único usuario desde el modal de Ver
  const handleExportarUnico = (email) => {
    // 1. Sobreescribe la selección de filtros con solo el email de este usuario
    setFiltros({ ...filtros, seleccionados: [email] });
    
    // 2. Cierra el modal de Ver y abre el modal de confirmación de clave
    setModalVisible('clave');
    // La función handleConfirmarClave manejará la exportación de 'seleccionados'
  };

  // Lógica de confirmación de clave para exportar
  const handleConfirmarClave = () => {
    const inputClave = document.getElementById('inputClave');
    const clave = inputClave ? inputClave.value : '';

    if (clave !== "admin123") { // CLAVE DURA SIMULADA
      setMensaje("⚠️ Contraseña incorrecta.");
      if (inputClave) inputClave.value = ''; // Limpiar input si es incorrecta
      return;
    }
      
    const usuariosAExportar = usuarios.filter(u => filtros.seleccionados.includes(u.email));
    
    // Realizar la exportación con XLSX
    try {
        const dataParaExportar = usuariosAExportar.map(u => ({
          RUT: u.rut || 'N/A',
          Nombre: u.nombre,
          Apellido: u.apellido || 'N/A',
          Email: u.email,
          Teléfono: u.telefono || 'N/A',
          Rol: u.rol,
          Estado: u.activo ? 'Activo' : 'Inactivo',
          Fecha_Creacion: u.createdAt ? new Date(u.createdAt).toLocaleDateString() : 'N/A',
        }));

        const ws = XLSX.utils.json_to_sheet(dataParaExportar);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "Usuarios");
        XLSX.writeFile(wb, "usuarios_exportados.xlsx");

        setMensaje("💾 Usuarios exportados correctamente.");
    } catch (err) {
        console.error("Error al exportar con XLSX:", err);
        setMensaje("⚠️ Error al crear el archivo de exportación. Asegúrate de que la librería 'xlsx' esté instalada.");
    }
    
    setFiltros({ ...filtros, seleccionados: [] });
    setModalVisible(null);
    if (inputClave) inputClave.value = ''; // Limpiar input
  };

  // Manejar selección de checkbox
  const handleToggleSeleccion = (email) => {
    setFiltros(prev => {
      if (prev.seleccionados.includes(email)) {
        return { ...prev, seleccionados: prev.seleccionados.filter(e => e !== email) };
      } else {
        return { ...prev, seleccionados: [...prev.seleccionados, email] };
      }
    });
  };

  // Manejar seleccionar/deseleccionar todos
  const handleToggleSeleccionarTodos = (e) => {
    if (e.target.checked) {
      const todosLosEmails = usuariosFiltradosYOrdenados.map(u => u.email);
      setFiltros({ ...filtros, seleccionados: todosLosEmails });
    } else {
      setFiltros({ ...filtros, seleccionados: [] });
    }
  };


  // Lógica combinada de Filtrado y Ordenamiento
  const usuariosFiltradosYOrdenados = useMemo(() => {
    let resultado = [...usuarios];
    
    // 1. Filtrar por búsqueda
    if (filtros.q) {
      const q = filtros.q.toLowerCase();
      resultado = resultado.filter(u => 
        (u.rut || '').toLowerCase().includes(q) ||
        u.nombre.toLowerCase().includes(q) ||
        (u.apellido || '').toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q)
      );
    }

    // 2. Filtrar por rol
    if (filtros.rol) {
      resultado = resultado.filter(u => u.rol === filtros.rol);
    }
    
    // 3. Ordenar
    if (filtros.orden === 'az') {
      resultado.sort((a, b) => a.nombre.localeCompare(b.nombre));
    } else if (filtros.orden === 'za') {
      resultado.sort((a, b) => b.nombre.localeCompare(a.nombre));
    } else if (filtros.orden === 'recientes') {
      resultado.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    return resultado;
  }, [usuarios, filtros.q, filtros.rol, filtros.orden]);


  // --- Componentes Auxiliares ---

  // ESTILO PARA EL FONDO DEGRADADO DE LA SIDEBAR
  // Nota: Los valores 'var(--card)', 'var(--primary)', etc. deben estar definidos en tu CSS
  const sidebarStyle = {
    width: '240px',
    background: `
      radial-gradient(1200px 600px at 10% -20%, rgba(124,58,237,.28), transparent 60%),
      radial-gradient(900px 500px at 90% 10%, rgba(167,139,250,.22), transparent 60%),
      linear-gradient(180deg, rgba(255,255,255,.04), rgba(255,255,255,0)),
      var(--card)
    `,
    color: 'var(--ink)',
    display: 'flex',
    flexDirection: 'column',
    position: 'relative',
  };


  const Sidebar = () => (
    <div className="sidebar" style={sidebarStyle}>
      <div className="logo">
        {/* Asume que la ruta '../assets/img/logo.png' es correcta */}
        <img src="../assets/img/logo.png" alt="Logo" />
      </div>
      <h2>Panel de Admin</h2>
      <ul>
        <li><Link to="/admin/dashboard"><i className="fa fa-chart-line"></i>Dashboard</Link></li>
        <li><Link to="/admin/productos"><i className="fa fa-box"></i>Productos</Link></li>
        <li><Link to="/admin/pedidos"><i className="fa fa-shopping-cart"></i>Pedidos</Link></li>
        <li className="active"><Link to="/admin/usuarios"><i className="fa fa-users"></i>Usuarios</Link></li>
        <li><a href="/" target="_blank" rel="noreferrer"><i className="fa fa-globe"></i>Ver sitio</a></li>
      </ul>
      {/* Estrellas flotantes (requieren la clase .spark y @keyframes float en el CSS) */}
      <div className="spark s1"></div>
      <div className="spark s2"></div>
      <div className="spark s3"></div>
      <div className="spark s4"></div>
    </div>
  );

  const TopBar = () => (
    <div className="topbar">
      <div className="left"><h1>Bienvenido!</h1></div>
      <div className="right">
        <i className="fa-regular fa-bell"></i>
        <i className="fa fa-user-cog"></i>
      </div>
    </div>
  );

  const QuickAccessCards = () => (
    <section className="actions">
      <article className="qcard">
        <div className="qicon"><i className="fa-solid fa-plus"></i></div>
        <div>
          <h3>Nuevo usuario</h3>
          <p>Crea un usuario con datos completos.</p>
        </div>
        <button className="btn sm" onClick={() => setVista("nuevo")}>Ir</button>
      </article>
      <article className="qcard">
        <div className="qicon"><i className="fa-regular fa-pen-to-square"></i></div>
        <div>
          <h3>Editar usuario</h3>
          <p>Editar datos existentes.</p>
        </div>
        <button className="btn sm" onClick={() => setVista("mostrar")}>Ir</button>
      </article>
      <article className="qcard">
        <div className="qicon"><i className="fa-regular fa-eye"></i></div>
        <div>
          <h3>Mostrar usuarios</h3>
          <p>Ver, filtrar y administrar usuarios.</p>
        </div>
        <button className="btn sm" onClick={() => setVista("mostrar")}>Ir</button>
      </article>
    </section>
  );

  const MostrarUsuarios = () => (
    <div className="container">
      {/* Sección de Filtros */}
      <section className="filters">
        <input 
          id="q" 
          name="q" 
          className="input" 
          placeholder="Buscar por RUT, nombre, apellido o correo…" 
          value={filtros.q} 
          onChange={handleFiltroChange} 
        />
        <select 
          id="rolFilter" 
          name="rol" 
          className="input" 
          style={{maxWidth:"200px"}} 
          value={filtros.rol} 
          onChange={handleFiltroChange}
        >
          <option value="">Todos los roles</option>
          <option value="admin">Admin</option>
          <option value="cliente">Cliente</option>
          <option value="vendedor">Vendedor</option>
        </select>
        <select 
          id="orden" 
          name="orden" 
          className="input" 
          style={{maxWidth:"200px"}} 
          value={filtros.orden} 
          onChange={handleFiltroChange}
        >
          <option value="recientes">Orden: Recientes</option>
          <option value="az">Nombre A → Z</option>
          <option value="za">Nombre Z → A</option>
        </select>
        <button id="clear" className="btn-ghost" onClick={handleLimpiarFiltros}>Limpiar</button>
        <button 
            className="btn-ghost" 
            onClick={handleExportar} 
            disabled={filtros.seleccionados.length === 0}
        >
          <i className="fa-solid fa-file-export"></i> Exportar seleccionados ({filtros.seleccionados.length})
        </button>
      </section>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>
                  <input 
                      type="checkbox" 
                      id="seleccionarTodos" 
                      onChange={handleToggleSeleccionarTodos}
                      checked={usuariosFiltradosYOrdenados.length > 0 && filtros.seleccionados.length === usuariosFiltradosYOrdenados.length}
                      disabled={usuariosFiltradosYOrdenados.length === 0} 
                  />
              </th>
              <th>RUT</th>
              <th>Nombre</th>
              <th>Apellido</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {usuariosFiltradosYOrdenados.length === 0 ? (
              <tr>
                <td colSpan="8" className="empty">No hay usuarios registrados que coincidan con los filtros.</td>
              </tr>
            ) : (
              usuariosFiltradosYOrdenados.map((u) => (
                <tr key={u.email}>
                  <td>
                    <input 
                        type="checkbox" 
                        className="usuarioCheck" 
                        checked={filtros.seleccionados.includes(u.email)}
                        onChange={() => handleToggleSeleccion(u.email)}
                    />
                  </td>
                  <td>{u.rut || "N/A"}</td>
                  <td>
                      {/* Avatar de 20px */}
                      <img 
                          src={u.img || 'https://via.placeholder.com/20?text=A'} 
                          alt="Avatar" 
                          style={{
                              width: '20px', 
                              height: '20px', 
                              borderRadius: '50%', 
                              objectFit: 'cover', 
                              marginRight: '8px'
                          }}
                      />
                      {u.nombre}
                  </td>
                  <td>{u.apellido || "N/A"}</td>
                  <td>{u.email}</td>
                  <td>
                    {/* El badge debe considerar los 3 roles: admin, cliente, vendedor */}
                    <span className={`badge ${u.rol === "admin" ? "b-ok" : u.rol === "vendedor" ? "b-off" : "b-default"}`}>
                      {u.rol}
                    </span>
                  </td>
                  <td>
                    <span className={`badge ${u.activo ? "b-ok" : "b-off"}`}>
                      {u.activo ? 'Activo' : 'Inactivo'}
                    </span>
                  </td>
                  <td className="actions-col">
                    <button className="btn-ghost sm" onClick={() => handleVer(u.email)}>
                      <i className="fa-regular fa-eye"></i> Ver
                    </button>
                    <button className="btn sm btn-ghost" onClick={() => handleEditar(u.email)}>
                      <i className="fa fa-edit"></i> Editar
                    </button>
                    <button className="btn-text-danger" onClick={() => handleEliminar(u.email)}>
                      <i className="fa fa-trash"></i> Eliminar
                    </button>
                  </td>

                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );

  


  // --- Modales ---

  const ModalVerUsuario = ({ usuario, onClose }) => {
    if (!usuario) return null;
    return (
      <div className={`modal ${modalVisible === 'ver' ? 'open' : ''}`} aria-hidden={modalVisible !== 'ver'}>
        <div className="box" style={{maxWidth: '450px'}}>
          <header>
            <h3 style={{margin:0}}>Detalle del usuario: **{usuario.nombre} {usuario.apellido}**</h3>
            <button className="close" onClick={onClose}><i className="fa-solid fa-xmark"></i> Cerrar</button>
          </header>
          <div id="contenidoModal" style={{marginTop:'10px'}}>
            <div className="form" style={{padding: '10px', display:'flex', flexDirection:'column', gap: '8px'}}>
                <img className="preview" src={usuario.img || 'https://via.placeholder.com/120?text=Avatar'} alt="Avatar" style={{alignSelf:'center', marginBottom: '10px', width:'120px', height: '120px', objectFit:'cover', borderRadius:'8px'}}/>
                <p><strong>RUT:</strong> {usuario.rut || 'N/A'}</p>
                <p><strong>Email:</strong> {usuario.email}</p>
                <p><strong>Teléfono:</strong> {usuario.telefono || 'N/A'}</p>
                <p><strong>Cumpleaños:</strong> {usuario.birthday || 'N/A'}</p>
                <p><strong>Rol:</strong> <span className={`badge ${usuario.rol === "admin" ? "b-ok" : usuario.rol === "vendedor" ? "b-off" : "b-default"}`}>{usuario.rol}</span></p>
                <p><strong>Estado:</strong> <span className={`badge ${usuario.activo ? "b-ok" : "b-off"}`}>{usuario.activo ? 'Activo' : 'Inactivo'}</span></p>
                <p><strong>Dirección:</strong> {usuario.direccion || 'N/A'} ({usuario.comuna || 'N/A'}, {usuario.region || 'N/A'})</p>
                <p><strong>Descripción/Notas:</strong> {usuario.desc || 'Sin notas'}</p>
            </div>
            {/* INSERTA ESTE BLOQUE DE BOTONES */}
            <div className="title tools" style={{justifyContent: 'flex-start', margin: '15px 10px 0'}}>
                {/* Botón Editar: Usamos la función handleEditar para cambiar la vista */}
                <button 
                    className="btn-ghost" 
                    onClick={() => { onClose(); handleEditar(usuario.email); }}
                >
                    <i className="fa-regular fa-pen-to-square"></i> Editar
                </button>

                {/* Botón Eliminar: Usamos el estilo de texto rojo que definimos antes */}
                <button 
                    className="btn-text-danger-modal" 
                    onClick={() => { onClose(); handleEliminar(usuario.email); }}
                >
                    <i className="fa fa-trash"></i> Eliminar
                </button>
                
                {/* Botón Exportar: Puedes usar un botón fantasma si es una acción secundaria */}
                <button 
                    className="btn-ghost"
                    onClick={() => { onClose(); handleExportarUnico(usuario.email); }} // Necesitas una nueva función
                >
                    <i className="fa-solid fa-file-export"></i> Exportar
                </button>
            </div>
            {/* FIN DEL BLOQUE DE BOTONES */}
          </div>
        </div>
      </div>
    );
  };
  
  const ModalClaveExportar = ({ onClose, onConfirm }) => (
    <div className={`modal ${modalVisible === 'clave' ? 'open' : ''}`} aria-hidden={modalVisible !== 'clave'}>
      <div className="box" style={{maxWidth: '350px'}}>
        <header>
          <h3 style={{margin:0}}>Confirmar contraseña</h3>
          <button className="close" id="cerrarModalClave" onClick={onClose}><i className="fa-solid fa-xmark"></i> Cerrar</button>
        </header>
        <div style={{marginTop:'10px',display:'flex',flexDirection:'column',gap:'10px'}}>
          <input type="password" id="inputClave" placeholder="Ingresa tu contraseña" className="input"/>
          <button className="btn-ghost" id="confirmarClave" onClick={onConfirm}>Confirmar</button>
          <div className="help" style={{textAlign: 'center'}}>Clave para probar: **admin123**</div>
        </div>
      </div>
    </div>
  );


  // --- Renderizado Principal ---

  return (
    <div className="wrapper">
      <Sidebar />
      <main className="main">
        <TopBar />
        
        {/* Contenedor de Alertas */}
        {mensaje && (
          <div className="container">
            <div className="alert">
                {mensaje}
                <button className="btn-ghost sm" onClick={handleCloseToast} style={{marginLeft:'auto'}}><i className="fa-solid fa-xmark"></i></button>
            </div>
          </div>
        )}
        
        <div className="container">
            {/* Título y Botones de Navegación */}
            <div className="title">
              <h1>Gestión de usuarios</h1>
              <div className="tools">
                <button id="btnTopNuevo" className={`btn ${vista === "nuevo" ? 'tab-active' : ''}`} onClick={() => setVista("nuevo")}>
                    <i className="fa-solid fa-user-plus"></i> Nuevo usuario
                </button>
                <button id="btnTopMostrar" className={`btn-ghost ${vista === "mostrar" ? 'tab-active' : ''}`} onClick={() => setVista("mostrar")}>
                    <i className="fa-regular fa-eye"></i> Mostrar
                </button>
                <button id="btnTopEditar" className={`btn-ghost ${vista === "editar" ? 'tab-active' : ''}`} onClick={() => setVista("editar")}>
                    <i className="fa-regular fa-pen-to-square"></i> Editar
                </button>
              </div>
            </div>
            
            <QuickAccessCards />
        </div>

        {/* Vistas Condicionales */}
        {vista === "mostrar" && <MostrarUsuarios />}
        {vista === "nuevo" && (
          <FormularioUsuario onSubmit={handleAgregar} titulo="Crear nuevo usuario" vista="nuevo" formData={formData} handleChange={handleChange} previewUrl={previewUrl} handleFileChange={handleFileChange}/>
        )}
        {vista === "editar" && (
          <FormularioUsuario onSubmit={handleGuardarEdicion} titulo={`Editar usuario: ${formData.email}`} vista="editar" formData={formData} handleChange={handleChange} previewUrl={previewUrl} handleFileChange={handleFileChange}/>
        )}
      </main>

      {/* RENDER DE MODALES */}
      <ModalVerUsuario 
        usuario={usuarioDetalle} 
        onClose={() => setModalVisible(null)} 
      />
      <ModalClaveExportar 
        onClose={() => setModalVisible(null)} 
        onConfirm={handleConfirmarClave}
      />
      
    </div>
  );
}
