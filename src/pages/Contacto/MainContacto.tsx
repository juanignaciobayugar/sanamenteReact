import React from 'react';
import CardContacto from "./CardContacto";
import "./Contacto.css";
import Swal from 'sweetalert2';

const MainContacto = () => {

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Muchas gracias por contactarte con Sanamente.',
      icon: 'success',
      confirmButtonColor: '#3f51b5', // Color unificado
      confirmButtonText: 'Aceptar'
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pagina-contacto">
      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      <section className="contact-container">
        {/* Formulario */}
        <div className="form-container card">
          <h3>Envíanos tu mensaje</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Tu nombre..." required />

            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="Tu email..." required />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>

            <button type="submit" className="btn-enviar">Enviar mensaje</button>
          </form>
        </div>

        {/* Info y Redes */}
        <aside className="redes-container card">
          <CardContacto titulo="Seguinos">
            <ul className="redes-lista">
              <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="#"><i className="fab fa-tiktok"></i> TikTok</a></li>
              <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
            </ul>
          </CardContacto>

          <CardContacto titulo="Información de contacto">
            <ul className="info-lista">
              <li><i className="fas fa-envelope"></i> sanamente@gmail.com</li>
              <li><i className="fab fa-whatsapp"></i> 2983 - 987654</li>
              <li><i className="fas fa-location-dot"></i> En tus manos mediante la app</li>
              <li><i className="fas fa-clock"></i> Disponible las 24 hs</li>
            </ul>
          </CardContacto>
        </aside>
      </section>
    </div>
  );
};

export default MainContacto;