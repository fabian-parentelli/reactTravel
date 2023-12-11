import React from "react";
import "./AdminPanel.css";
import { Link } from "react-router-dom";

function AdmiPanel() {
  return (
    <div>
      <div className="mensaje-movil">
        <p>Esta página solo está disponible para computadoras de escritorio.</p>
      </div>
      <div className="admin-panel">
        <h1 className="panel-title">Panel de Administración</h1>
        <div>
          <Link to="/administracion/productos/crear">
            <button className="action-button">Agregar productos</button>
          </Link>
          <Link to="/administracion/productos">
            <button className="action-button">Listado de productos</button>
          </Link>
          
          <Link to="/ListUsers">
            <button className="action-button">Listado de usuarios</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default AdmiPanel;
