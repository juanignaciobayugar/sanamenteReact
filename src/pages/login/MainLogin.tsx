import CardLogin from "./CardLogin";
import "./login.css";
import { useNavigate } from "react-router-dom"; 

// Definimos las propiedades que MainLogin recibe desde Central.tsx
interface MainLoginProps {
 onLogin: () => void; 
}

function MainLogin({ onLogin: onLoginCentral }: MainLoginProps) {
  const navigate = useNavigate(); 
  
  // Manejador del login exitoso posterior a la validación de la tarjeta
  const handleLogin = (token: string) => {
    console.log("¡Login exitoso! Token recibido en MainLogin:", token);
    
    if (onLoginCentral) {
      onLoginCentral();
    }
    navigate("/cuestionario"); 
  };

  return (
    <main className="contenido">
      {/* Pasamos handleLogin que interactúa limpiamente con CardLogin */}
      <CardLogin onLogin={handleLogin} />
    </main>
  );
}

export default MainLogin;