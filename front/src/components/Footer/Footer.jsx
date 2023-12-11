// eslint-disable-next-line no-unused-vars
import React from 'react'
import './footer.css'



function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-logo">
        <img src='./src/assets/solo-logo.png' alt='logo' />
        <p> © 2023 Equipo2. Todos los derechos reservados. </p>
      </div>
      <div className='side-right'>
        {/* <div className='footer-social-media'>
          <a href="https://twitter.com/home?lang=es" target="_blank" rel="noopener noreferrer">
            <img src='.\src\components\Footer\socialmediaimg\twitter.svg' alt='X' />
          </a>
          <a href="https://www.youtube.com/" target="_blank" rel="noopener noreferrer">
            <img src='./src/components/Footer/socialmediaimg/youtube.svg' alt='X' />
          </a>
          <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
            <img src='.\src\components\Footer\socialmediaimg\instagram.svg' alt='X' />
          </a>
          <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
            <img src='.\src\components\Footer\socialmediaimg\facebook.svg' alt='X' />
          </a>
        </div> */}
        <div className="footer-info">
          <strong>Contacto</strong>
          <p>equipo2@gmail.com</p>
          <p>11 9875-4987</p>
          <p>Echeverria 345, UY</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer