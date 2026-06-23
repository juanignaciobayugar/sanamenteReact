import React, { useState, useEffect } from 'react';
import CardContacto from "./CardContacto";
import "./Contacto.css"; 
import Swal from 'sweetalert2';

const MainContacto = () => {
  // --- Estados del componente ---
  // Guardan la información que el usuario escribe en el formulario
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  
  // Estado para controlar el spinner o bloqueo del botón mientras se procesa el envío
  const [cargando, setCargando] = useState(false);
  
  // Estado para saber si el usuario inició sesión (así bloqueamos el campo de email)
  const [isLogged, setIsLogged] = useState(false);

  // --- Efecto para cargar la página (ComponentDidMount) ---
  useEffect(() => {
    // Buscamos el token JWT guardado en el navegador
    const token = localStorage.getItem('token_jwt');
    
    if (token) {
      try {
        // El token viene dividido por puntos (Header.Payload.Signature). Agarramos el Payload (posición 1)
        const base64Url = token.split('.')[1];
        // Reemplazamos caracteres especiales de la codificación URL a Base64 estándar
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        // Decodificamos el string Base64 y lo transformamos en un objeto legible de JS
        const payload = JSON.parse(window.atob(base64));

        // Si el payload tiene el campo 'username' (que es el email), lo autocompletamos en el formulario
        if (payload.username) {
          setEmail(payload.username); 
        }

        // Buscamos el nombre real del usuario guardado en el localStorage para precargarlo
        const nombreGuardado = localStorage.getItem('nombre_usuario');
        if (nombreGuardado) setNombreCompleto(nombreGuardado);

        // Como encontramos un token válido, seteamos el estado de logueado en true
        setIsLogged(true);
      } catch (error) {
        console.error("Error al decodificar el token del usuario:", error);
      }
    }
  }, []); // El array vacío asegura que este código corra una sola vez al renderizar

  // --- Función para generar cabeceras de autenticación ---
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token_jwt');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    // Si el usuario está logueado, le inyectamos el Bearer Token para que el backend lo autorice
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  // --- Función extractora del ID del usuario ---
  const getUsuarioIdDesdeToken = (): number | undefined => {
    const token = localStorage.getItem('token_jwt');
    if (!token) return undefined;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.sub; // Retorna el 'sub' (Subject), que suele ser el ID único del usuario en la base de datos
    } catch (error) {
      return undefined;
    }
  };

  // --- Función manejadora del envío del formulario ---
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Evitamos que la página se recargue por defecto al enviar el formulario
    setCargando(true);  // Activamos el estado de carga para bloquear el botón

    // Intentamos recuperar el ID del usuario si es que está registrado
    const idDelToken = getUsuarioIdDesdeToken();
    const usuarioId = idDelToken ? Number(idDelToken) : undefined;

    // Estructuramos el objeto con los datos que espera recibir nuestro backend en la API de contacto
    const bodyData: Record<string, any> = {
      nombreCompleto: nombreCompleto.trim(), // .trim() elimina espacios vacíos molestos al principio y final
      email: email.trim(),
      mensaje: mensaje.trim(),
    };

    // Si detectamos un usuario logueado, sumamos su ID al cuerpo del JSON
    if (usuarioId && !isNaN(usuarioId)) {
      bodyData.usuarioId = usuarioId;
    }

    try {
      // Realizamos la petición HTTP POST hacia el servidor local de la app
      const response = await fetch('https://sanamentenestjs.onrender.com/contacto', {
        method: 'POST',
        headers: getAuthHeaders(), // Pasamos las cabeceras dinámicas (con o sin Token)
        body: JSON.stringify(bodyData), // Convertimos el objeto JS a un String JSON plano
      });

      const resultado = await response.json();

      // Si el servidor responde con un código de error (4xx o 5xx), disparamos la excepción
      if (!response.ok) {
        throw new Error(resultado.message || 'Error al enviar el mensaje');
      }

      // Alerta de éxito con SweetAlert2 configurada con la paleta Malva Lavanda
      Swal.fire({
        title: '¡Mensaje enviado!',
        text: 'Muchas gracias por contactarte con Sanamente.',
        icon: 'success',
        confirmButtonColor: '#B39DDB', 
        confirmButtonText: 'Aceptar'
      });

      // Limpiamos la caja del mensaje para que quede vacía después de enviar
      setMensaje('');
      
      // Si el usuario es un visitante (no está logueado), también le limpiamos los campos de arriba
      if (!isLogged) {
        setNombreCompleto('');
        setEmail('');
      }

    } catch (error: any) {
      // Alerta de error en caso de que falle la API o se caiga el servidor
      Swal.fire({
        title: 'Error',
        text: error.message || 'Hubo un problema al conectar con el servidor.',
        icon: 'error',
        confirmButtonColor: '#d33',
        confirmButtonText: 'Cerrar'
      });
    } finally {
      setCargando(false); // Desactivamos el estado de carga para volver a habilitar el formulario
    }
  };

  // --- Renderizado deol componente interfax gráfica(HTML/JSX) ---
  return (
    <div className="pagina-contacto">

      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      <section className="contact-container">

        {/* Columna Izquierda: Formulario de Entrada de datos */}
        <div className="form-container card">
          <h3>Envíanos tu mensaje</h3>
          <form className="contact-form" onSubmit={handleSubmit}>
            
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              placeholder="Tu nombre..."
              required
              value={nombreCompleto}
              onChange={(e) => setNombreCompleto(e.target.value)}
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email" 
              id="email"
              placeholder="Tu email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLogged} // Si está logueado, se bloquea el input para que no ponga un mail ajeno
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>

            {/* Botón del envío blindado:
              Usamos la propiedad 'ref' de React que nos permite inyectar estilos directamente en el 
              elemento nativo del DOM del navegador mediante JavaScript. Al usar '.setProperty' con el 
              atributo 'important', evitamos que frameworks como Bootstrap o estados heredados (como :disabled) 
              pisen nuestro diseño Malva Lavanda (#B39DDB) con letra gris (#616161).
            */}
            <button 
              type="submit" 
              className="btn-enviar" 
              disabled={cargando}
              style={{ backgroundColor: '#B39DDB', color: '#616161' }}
              ref={(el) => {
                if (el) {
                  el.style.setProperty('color', '#616161', 'important');
                  el.style.setProperty('background-color', '#B39DDB', 'important');
                }
              }}
            >
              {cargando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
          </form>
        </div>

        {/* Columna Derecha: Tarjetas de Información Complementaria y Redes */}
        <aside className="redes-container card">
          {/* Tarjeta 1: Enlaces ficticios a Redes Sociales usando FontAwesome Icons */}
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

          {/* Tarjeta 2: Datos institucionales del portal Sanamente */}
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