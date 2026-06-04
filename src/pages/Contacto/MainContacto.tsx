import React, { useState, useEffect } from 'react';
import CardContacto from "./CardContacto";
import "./Contacto.css";
import Swal from 'sweetalert2';

const MainContacto = () => {
  const [nombreCompleto, setNombreCompleto] = useState('');
  const [email, setEmail] = useState('');
  const [mensaje, setMensaje] = useState('');
  const [cargando, setCargando] = useState(false);
  const [isLogged, setIsLogged] = useState(false); // Para saber si está logueado

  // 1. Al cargar el componente, leemos el token y autocompletamos
  useEffect(() => {
    const token = localStorage.getItem('token_jwt');
    if (token) {
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const payload = JSON.parse(window.atob(base64));

        // Según tu consola, el payload tiene: { username: "juanibayugar@gmail.com", sub: 1 }
        if (payload.username) {
          setEmail(payload.username); // Autocompletamos el email con el username del token
        }

        // Si tu token también tuviera el nombre (ej: payload.nombre), lo pondríamos acá.
        // Como tu token actual no lo trae, podemos dejar que ponga su nombre a mano
        // o si lo tenés guardado en otro lado (ej: localStorage.getItem('nombre_usuario')) lo usás.
        const nombreGuardado = localStorage.getItem('nombre_usuario');
        if (nombreGuardado) setNombreCompleto(nombreGuardado);

        setIsLogged(true);
      } catch (error) {
        console.error("Error al decodificar el token:", error);
      }
    }
  }, []);

  const getAuthHeaders = () => {
    const token = localStorage.getItem('token_jwt');
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
    };
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
    return headers;
  };

  const getUsuarioIdDesdeToken = (): number | undefined => {
    const token = localStorage.getItem('token_jwt');
    if (!token) return undefined;
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const payload = JSON.parse(window.atob(base64));
      return payload.sub; // Tu ID viene como 'sub' en el JWT
    } catch (error) {
      return undefined;
    }
  };

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setCargando(true);

  // 1. Obtenemos el ID y nos aseguramos de que sea un número entero puro
  const idDelToken = getUsuarioIdDesdeToken();
  const usuarioId = idDelToken ? Number(idDelToken) : undefined;

  // 2. Armamos el payload asegurando que no viajen campos vacíos o extraños
  const bodyData: Record<string, any> = {
    nombreCompleto: nombreCompleto.trim(),
    email: email.trim(),
    mensaje: mensaje.trim(),
  };

  // Solo agregamos el usuarioId si es un número válido
  if (usuarioId && !isNaN(usuarioId)) {
    bodyData.usuarioId = usuarioId;
  }

  console.log("Enviando este JSON al backend:", bodyData); // Mirá esto en la consola antes del error

  try {
    const response = await fetch('http://localhost:3000/contacto', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(bodyData),
    });

    const resultado = await response.json();

    if (!response.ok) {
      throw new Error(resultado.message || 'Error al enviar el mensaje');
    }

    Swal.fire({
      title: '¡Mensaje enviado!',
      text: 'Muchas gracias por contactarte con Sanamente.',
      icon: 'success',
      confirmButtonColor: '#3f51b5',
      confirmButtonText: 'Aceptar'
    });

    setMensaje('');
    if (!isLogged) {
      setNombreCompleto('');
      setEmail('');
    }

  } catch (error: any) {
    Swal.fire({
      title: 'Error',
      text: error.message || 'Hubo un problema al conectar con el servidor.',
      icon: 'error',
      confirmButtonColor: '#d33',
      confirmButtonText: 'Cerrar'
    });
  } finally {
    setCargando(false);
  }
};

  return (
    <div className="pagina-contacto">

      <header className="contacto-header">
        <h2>Contacto</h2>
      </header>

      <section className="contact-container">

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
            // Opcional: si ya tenemos el nombre, lo podés bloquear para que no lo edite
            // disabled={isLogged && nombreCompleto !== ''} 
            />

            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              placeholder="Tu email..."
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isLogged} // Si está logueado, bloqueamos el email porque ya sabemos quién es
            />

            <label htmlFor="mensaje">Mensaje</label>
            <textarea
              id="mensaje"
              placeholder="Escribe tu mensaje aquí..."
              required
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
            ></textarea>

            <button type="submit" className="btn-enviar" disabled={cargando}>
              {cargando ? 'Enviando...' : 'Enviar mensaje'}
            </button>
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