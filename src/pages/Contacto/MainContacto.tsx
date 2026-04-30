import CardContacto from "./CardContacto";
import "./Contacto.css";


const MainContacto = () => {
  return (
    /* 1. Contenedor  Principal: Envuelve todo para dar margen y centrar en la pantalla */
    <div className="pagina-contacto">
      
      {/* 2. Encabezado: Al estar fuera del flex, se queda arriba de todo el ancho */}
      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      {/* 3. Sección de tarjetas: Aquí activamos el Flexbox para las dos columnas */}
      <section className="contact-container">
        
        {/* --- Columna izquierda: Formulario de contacto --- */}
        <div className="form-container card">
          <h3>Envíanos tu mensaje</h3>
          <form className="contact-form">
            <label htmlFor="nombre">Nombre completo</label>
            <input type="text" id="nombre" placeholder="Tu nombre..." required />

            <label htmlFor="email">Correo electrónico</label>
            <input type="email" id="email" placeholder="Tu email..." required />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea id="mensaje" placeholder="Escribe tu mensaje aquí..." required></textarea>

            {/* El botón ahora será azul gracias al CSS que pegue */}
            <button type="submit" className="btn-enviar">Enviar mensaje</button>
          </form>
        </div>

        {/* --- Columna derecha: Redes e Información en una única tarjeta blanca --- */}
        <aside className="redes-container card">
          
          {/* Sub-sección de Redes */}
          <CardContacto titulo="Seguinos">
            <ul className="redes-lista">
              <li><a href="#"><i className="fab fa-facebook"></i> Facebook</a></li>
              <li><a href="#"><i className="fab fa-instagram"></i> Instagram</a></li>
              <li><a href="#"><i className="fab fa-tiktok"></i> TikTok</a></li>
              <li><a href="#"><i className="fab fa-youtube"></i> YouTube</a></li>
            </ul>
          </CardContacto>

          {/* Sub-sección de Info (dentro de la misma tarjeta) */}
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