import { useState, useEffect } from "react";
import CardLogin from "./CardLogin";
import CardUserProfile from "./CardUserProfile"; // Importamos la nueva tarjeta de perfil
import "./login.css";
import { useNavigate } from "react-router-dom"; 

interface MainLoginProps {
  onLogin: () => void; 
}

function MainLogin({ onLogin: onLoginCentral }: MainLoginProps) {
  const navigate = useNavigate(); 
  const [isAutenticado, setIsAutenticado] = useState(false);

  // Efecto inicial: Si el usuario ya tiene un token guardado, lo mandamos directo a la vista de perfil
  useEffect(() => {
    const token = localStorage.getItem("token_jwt");
    if (token) {
      setIsAutenticado(true);
    }
  }, []);
  
  // Se ejecuta cuando el CardLogin hace la petición POST y recibe el token con éxito
  const handleLogin = (token: string) => {
    console.log("¡Login exitoso! Token recibido en MainLogin:", token);
    
    setIsAutenticado(true); // Cambia el estado para renderizar el perfil

    if (onLoginCentral) {
      onLoginCentral();
    }
    
    // Redirección opcional automática al cuestionario tras loguearse
    navigate("/cuestionario"); 
  };

  // Se ejecuta cuando el usuario le da al botón "Cerrar sesión" de la tarjeta de perfil
  const handleLogout = () => {
    setIsAutenticado(false); // Volvemos a mostrar el formulario de Login/Registro
    navigate("/"); // Redirige a la raíz
  };

  return (
    <main className="contenido">
      {isAutenticado ? (
        /* VISTA USUARIO LOGUEADO */
        <CardUserProfile onLogout={handleLogout} />
      ) : (
        /* VISTA INICIAR SESIÓN / CREAR CUENTA */
        <CardLogin onLogin={handleLogin} />
      )}
    </main>
  );
}

export default MainLogin;