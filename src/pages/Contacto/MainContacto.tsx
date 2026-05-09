import React from 'react';
import CardContacto from "./CardContacto";
import "./Contacto.css";
import Swal from 'sweetalert2'; // 1. Importamos SweetAlert

const MainContacto = () => {

  // 2. Esta es la función que dispara el mensaje
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que la página se recargue
    
    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Muchas gracias por contactarte con Sanamente.',
      icon: 'success',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Aceptar'
    });

    (e.target as HTMLFormElement).reset(); // Limpia los campos después de enviar
  };

  return (
    /* 1. Contenedor Principal */
    <div className="pagina-contacto">
      
      {/* 2. Encabezado */}
      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      {/* 3. Sección de tarjetas */}
      <section className="contact-container">
        
        {/* --- Columna izquierda: Formulario de contacto --- */}
        <div className="form-container card">
          <h3>Envíanos tu mensaje</h3>
          {/* 3. Agregamos el onSubmit aquí */}
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

        {/* --- Columna derecha: Redes e Información --- */}
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
              <li><i className="fas fa-clock"></i> Disponible para vos las 24 hs</li>
            </ul>
          </CardContacto>

        </aside>

      </section>
    </div>
  );
};

export default MainContacto;