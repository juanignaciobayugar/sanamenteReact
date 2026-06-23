import { useEffect, useState } from "react"
import Swal from "sweetalert2";
import Avatar from "boring-avatars";
interface CardUserProfileProps {
  onLogout: () => void;

}

interface UserData {
usuarioId: number;
  nombreCompleto: string; // 👈 Cambiado (Coincide con tu backend)
  email: string;
  message: string;
}

function CardUserProfile({ onLogout }: CardUserProfileProps) {
  const [usuario, setUsuario] = useState<UserData | null>(null);
  const [cargando, setCargando] = useState(true);

// Tu lógica para obtener las cabeceras con el Bearer Token fresco
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token_jwt");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
      "Cache-Control": "no-cache, no-store, must-revalidate", // Agregadas acá para seguridad total
      "Pragma": "no-cache",
      "Expires": "0"
    };
  };
// Si manejás el token en un estado de React (lo ideal)
const [token] = useState<string | null>(localStorage.getItem("token_jwt"));

useEffect(() => {
  let componenteActivo = true;

  const obtenerPerfil = async () => {
    // Si no hay token en el estado, no hacemos la petición
    if (!token) {
      if (componenteActivo) setCargando(false);
      return; 
    }

    try {
      if (componenteActivo) setCargando(true);
      
      const respuesta = await fetch(`https://sanamentenestjs.onrender.com/auth/perfil`, {
        method: "GET",
        headers: getAuthHeaders(), 
      });

      if (!respuesta.ok) throw new Error("Token inválido o expirado");

      const datos = await respuesta.json();
      
      if (componenteActivo) {
        setUsuario(datos); 
      }
    } catch (error) {
      console.error("Error de autenticación:", error);
      if (componenteActivo) {
        setUsuario(null);
        localStorage.removeItem("token_jwt");
        onLogout();
      }
    } finally {
      if (componenteActivo) setCargando(false);
    }
  };

  obtenerPerfil();

  return () => {
    componenteActivo = false;
  };
  
// ✅ Ahora sí: React vigila la variable de estado 'token'. 
// Cuando el usuario se loguee y actualices este estado, el useEffect se ejecutará limpiamente.
}, [token]);

  const manejarCerrarSesion = async () => {
    const resultado = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se eliminarán tus credenciales de la sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4D8991",
      cancelButtonColor: "rgb(26, 51, 69)",
      confirmButtonText: "Sí, salir",
      cancelButtonText: "Cancelar"
    });

    if (resultado.isConfirmed) {
      // 1. Limpiamos por completo el localStorage (chau token_jwt)
      localStorage.clear(); 
      
      // 2. Avisamos al componente padre para que cambie la vista
      onLogout();

      await Swal.fire({
        title: "Sesión cerrada",
        text: "Has salido con éxito de Sanamente.",
        icon: "success",
        confirmButtonColor: "#4D8991"
      });
    }
  };

  if (cargando) {
    return (
      <div className="form-container" style={{ textAlign: "center" }}>
        <p style={{ color: "#4D8991", fontWeight: "bold" }}>Cargando perfil...</p>
      </div>
    );
  }


  return (
    <div className="form-container user-profile-container"style={{ textAlign: "center", marginTop: "30px" }}>
      <h2>Mi Perfil</h2>
      
      <div className="profile-details" style={{ textAlign: "center", margin: "20px 0" }}>
        {/* Foto de Perfil */}
<div style={{ 
    display: "inline-block",
    width: "110px", 
    height: "110px", 
    borderRadius: "50%", 
    border: "3px solid #4D8991",
    marginBottom: "15px",
    backgroundColor: "#f4f4f4",
    overflow: "hidden" /* Crucial para que el avatar no se salga del círculo */
  }}>
    <Avatar
      size={110}
      name={usuario?.nombreCompleto || "default"}
      variant="beam" 
      colors={["#b6e3f4", "#c0aade", "#e2f0d9", "#dbf2f2", "#4D8991"]}
    />
  </div>
        
        {/* Datos traídos del Backend */}
        <h3 style={{ color: "#333", margin: "5px 0", fontSize: "22px" }}>
          {usuario?.nombreCompleto || "Usuario"}
        </h3>
        <p style={{ color: "#666", fontSize: "14px", marginBottom: "25px" }}>
          {usuario?.email || "correo@ejemplo.com"}
        </p>
      </div>

      {/* Botón de Logout */}
      <button 
        onClick={manejarCerrarSesion} 
        style={{ backgroundColor: "#d9534f", marginTop: "10px" }}
      >
        Cerrar Sesión
      </button>
    </div>
  );
}

export default CardUserProfile;