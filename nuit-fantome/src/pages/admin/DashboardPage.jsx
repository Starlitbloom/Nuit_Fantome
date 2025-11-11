import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Chart from "chart.js/auto";
import "../../assets/css/dashboard.css";

export default function DashboardPage() {
  const chartRef = useRef(null);
  const chartInstance = useRef(null);
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  // Obtener el usuario actual desde localStorage (Se ejecuta solo al renderizar, no en el useEffect)
  const usuario = JSON.parse(localStorage.getItem("usuarioActual") || "{}");

  useEffect(() => {
    try {
      // Utilizamos la variable 'usuario' que ya se cargó arriba
      
      // Redirigir si no es admin
      if (!usuario || usuario.rol !== "admin") {
        navigate("/login");
        return;
      }

      document.title = "Dashboard Admin";

      // Destruir gráfico previo si ya existe
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }

      if (chartRef.current) {
        const ctx = chartRef.current.getContext("2d");
        chartInstance.current = new Chart(ctx, {
          type: "line",
          data: {
            labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"],
            datasets: [
              {
                label: "Actividad",
                data: [120, 150, 180, 300, 500, 450, 600, 800, 700, 650, 400, 300],
                borderColor: "#7c3aed",
                tension: 0.3,
                fill: false,
              },
            ],
          },
          options: { responsive: true },
        });
      }
    } catch (err) {
      console.error("⚠️ Error en Dashboard:", err);
      setError(err.message);
    }
  }, [navigate, usuario]); // Dependencia 'usuario' agregada por si cambia

  if (error) {
    return (
      <div className="main" style={{ padding: "2rem", color: "white" }}>
        <h2>⚠️ Error en Dashboard</h2>
        <p>{error}</p>
      </div>
    );
  }

  return (
    <div className="wrapper">
      <aside className="sidebar">
        <div className="logo">
          {/* Asegúrate de que esta ruta sea correcta */}
          <img src="/assets/img/logo.png" alt="Logo Empresa" /> 
        </div>
        <h2>Admin</h2>
        <ul>
          <li className="active">
            <Link to="/admin/dashboard">
              <i className="fa fa-chart-line"></i>Dashboard
            </Link>
          </li>
          <li>
            <Link to="/admin/productos">
              <i className="fa fa-box"></i>Productos
            </Link>
          </li>
          <li>
            <Link to="/admin/pedidos">
              <i className="fa fa-shopping-cart"></i>Pedidos
            </Link>
          </li>
          <li>
            <Link to="/admin/usuarios">
              <i className="fa fa-users"></i>Usuarios
            </Link>
          </li>
          <li>
            <a href="/" target="_blank" rel="noreferrer">
              <i className="fa fa-globe"></i>Ver sitio
            </a>
          </li>
        </ul>
        <div className="spark s1"></div>
        <div className="spark s2"></div>
        <div className="spark s3"></div>
        <div className="spark s4"></div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="left">
            <h1>{`Bienvenido, ${usuario.nombre || "Usuario"}!`}</h1>
          </div>
          <div className="right">
            <i className="fa fa-bell"></i>
          </div>
        </div>

        <div className="container">
          <div className="cards">
            <div className="card">
              <h3>12,345</h3>
              <p>Visitas</p>
              <span className="positivo">+5%</span>
            </div>
            <div className="card">
              <h3>320</h3>
              <p>Pedidos</p>
              <span className="negativo">-2%</span>
            </div>
            <div className="card">
              <h3>$1.200.000</h3>
              <p>Ingresos</p>
              <span className="positivo">+12%</span>
            </div>
            <div className="card">
              <h3>980</h3>
              <p>Usuarios</p>
              <span className="positivo">+10%</span>
            </div>
          </div>

          <div className="perfil-ingresos">
            <div className="perfil-card">
              {/* AQUÍ SE MUESTRA LA IMAGEN DEL USUARIO ACTUAL */}
              <img
                src={usuario.img || "/assets/img/avatar-placeholder.png"}
                alt="Usuario"
              />
              <div className="perfil-info">
                <h2>{usuario.nombre || "Usuario"}</h2>
                <p>
                  <b>Fecha Registro: </b>
                  <span>
                    {usuario.createdAt
                      ? new Date(usuario.createdAt).toLocaleDateString("es-CL")
                      : "-"}
                  </span>
                </p>
                <p>
                  <b>Email: </b>
                  <span>{usuario.email || "usuario@email.com"}</span>
                </p>
                <p>
                  <b>Teléfono: </b>
                  <span>{usuario.telefono || "-"}</span>
                </p>
              </div>
              <Link to="/admin/usuarios">
                <i className="fa fa-edit editar"></i>
              </Link>
            </div>

            <div className="ingresos-card">
              <p>Ingresos</p>
              <h2>$1.200.000</h2>
              <span className="positivo">+12%</span>
            </div>
          </div>

          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>Cliente</th>
                  <th>Producto</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>001</td>
                  <td>María López</td>
                  <td>Agenda 2025</td>
                  <td>Pendiente</td>
                </tr>
                <tr>
                  <td>002</td>
                  <td>Carlos Díaz</td>
                  <td>Planner Digital</td>
                  <td>Completado</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="grafico">
            <div className="grafico-header">
              <h3>Actividad</h3>
              <div className="selector">
                <button className="active">Día</button>
                <button>Semana</button>
                <button>Mes</button>
                <button>Año</button>
              </div>
            </div>
            <canvas ref={chartRef} height="100"></canvas>
          </div>
        </div>
      </main>
    </div>
  );
}