import React from 'react';
import CardContacto from "./CardContacto";
import "./Contacto.css";
import Swal from 'sweetalert2';

const MainContacto = () => {

  // Manejador del envío del formulario con SweetAlert2
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Muchas gracias por contactarte con Sanamente.',
      icon: 'success',
      confirmButtonColor: '#3f51b5', // Color principal unificado
      confirmButtonText: 'Aceptar'
    });

    (e.target as HTMLFormElement).reset();
  };

  return (
    <div className="pagina-contacto">
      {/* Encabezado con el título */}
      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      <section className="contact-container">
        {/* Columna Izquierda: Formulario */}
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

        {/* Columna Derecha: Info y Redes */}
        <aside className="redes-container card">
          {/* MODIFICADO: Clases específicas icon-red para cada red social */}
          <CardContacto titulo="Seguinos">
            <ul className="redes-lista">
              <li>
                <a href="#">
                  <i className="fab fa-facebook icon-facebook"></i> Facebook
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-instagram icon-instagram"></i> Instagram
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-tiktok icon-tiktok"></i> TikTok
                </a>
              </li>
              <li>
                <a href="#">
                  <i className="fab fa-youtube icon-youtube"></i> YouTube
                </a>
              </li>
            </ul>
          </CardContacto>

          {/* MODIFICADO: Clases específicas icon-info para cada dato de contacto */}
          <CardContacto titulo="Información de contacto">
            <ul className="info-lista">
              <li>
                <i className="fas fa-envelope icon-email"></i> sanamente@gmail.com
              </li>
              <li>
                <i className="fab fa-whatsapp icon-whatsapp"></i> 2983 - 987654
              </li>
              <li>
                <i className="fas fa-location-dot icon-ubicacion"></i> En tus manos mediante la app
              </li>
              <li>
                <i className="fas fa-clock icon-reloj"></i> Disponible las 24 hs
              </li>
            </ul>
          </CardContacto>
        </aside>
      </section>
    </div>
  );
};

export default MainContacto;