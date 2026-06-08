import React, { useEffect, useState } from "react"
import Swal from "sweetalert2";

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

  // Tu lógica para obtener las cabeceras con el Bearer Token
  const getAuthHeaders = () => {
    const token = localStorage.getItem("token_jwt");
    return {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    };
  };

  // Traer los datos del perfil desde el backend al montar el componente
  useEffect(() => {
    const obtenerPerfil = async () => {
      try {
        // AJUSTA ESTA URL: Poné la ruta de tu backend que devuelva el perfil del usuario logueado
        // Normalmente es algo como http://localhost:3000/auth/me o http://localhost:3000/users/profile
        const respuesta = await fetch("http://localhost:3000/auth/perfil", {
          method: "GET",
          headers: getAuthHeaders(),
        });

        if (!respuesta.ok) {
          throw new Error("No se pudo obtener el perfil o el token expiró");
        }

        const datos = await respuesta.json();
        setUsuario(datos); // Guardamos { name, email, ... } en el estado
      } catch (error) {
        console.error("Error de autenticación:", error);
        // Si el token no sirve, hacemos logout automático para limpiar la app
        localStorage.clear();
        onLogout();
      } finally {
        setCargando(false);
      }
    };

    obtenerPerfil();
  }, []);

  const manejarCerrarSesion = async () => {
    const resultado = await Swal.fire({
      title: "¿Cerrar sesión?",
      text: "Se eliminarán tus credenciales de la sesión actual.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#4D8991",
      cancelButtonColor: "#d33",
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

// 📍 ACÁ VA EL AVATAR DINÁMICO (Justo antes del return principal)
  const avatarUrl = usuario?.nombreCompleto 
    ? `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(usuario.nombreCompleto)}`
    : "https://api.dicebear.com/7.x/bottts/svg?seed=default";

  return (
    <div className="form-container user-profile-container">
      <h2>Mi Perfil</h2>
      
      <div className="profile-details" style={{ textAlign: "center", margin: "20px 0" }}>
        {/* Foto de Perfil */}
        <img 
          src={avatarUrl} 
          alt="Avatar de usuario" 
          style={{ 
            width: "110px", 
            height: "110px", 
            borderRadius: "50%", 
            border: "3px solid #4D8991",
            marginBottom: "15px",
            backgroundColor: "#f4f4f4"
          }} 
        />
        
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