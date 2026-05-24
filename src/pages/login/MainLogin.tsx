import CardLogin from "./CardLogin";
import "./login.css";
import { useNavigate } from "react-router-dom"; // 👈 Agregá este import

// 1. Definimos las propiedades que MainLogin recibe desde Central.tsx
interface MainLoginProps {
  onLogin: () => void; // La función que maneja el estado del Header
}

// 2. Recibimos la prop y le ponemos 'onLoginCentral' para que no se pise con nada
function MainLogin({ onLogin: onLoginCentral }: MainLoginProps) {
const navigate = useNavigate(); // 👈 Lo usamos acá adentro
  // 3. Modificamos handleLogin para que acepte el 'token' que tu Card envía reales.
  // Tu Card maneja el email y el password adentro de forma interna, 
  // así que acá solo nos interesa reaccionar cuando el login ya fue exitoso.
  const handleLogin = (token: string) => {
    console.log("¡Login exitoso! Token recibido en MainLogin:", token);
    
    // 4. 🔥 Le avisamos a Central que el login se completó con éxito
    // Esto va a hacer que el Header cambie en el acto.
    if (onLoginCentral) {
      onLoginCentral();
      
    }
    navigate("/cuestionario"); // 🚀 Redirige desde acá sin romper el Router
  };

  return (
    <main className="contenido">
      {/* Pasamos handleLogin que ahora calza perfecto con lo que CardLogin espera */}
      <CardLogin onLogin={handleLogin} />
    </main>
  );
}

export default MainLogin;