import React from 'react';
import { Link } from 'react-router-dom';
import './BackToAdminPanelButton.css'; // Asegúrate de importar tu archivo de estilos

function BackToAdminPanelButton() {
  return (
    <div className="back-button">
      <Link to="/administracion">
        Panel de Administración
      </Link>
    </div>
  );
}

export default BackToAdminPanelButton;