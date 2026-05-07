import { useState } from "react";

interface CardLoginProps {
  onLogin?: (email: string, password: string) => void;
}

function CardLogin(props: CardLoginProps) {
  // --- ESTADOS PARA LOS CAMPOS ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); 
  
  // --- Estados de control de vista ---
  const [modo, setModo] = useState<"login" | "registro" | "exito">("login"); 
  const [error, setError] = useState("");

  // Función para limpiar todos los inputs
  const limpiarFormulario = () => {
    setEmail("");
    setPassword("");
    setNombre("");
    setError("");
  };

  const manejarAccion = () => {
    setError("");

    if (modo === "login") {
      // Validación para el Login
      if (!email || !password) {
        setError("❌ Por favor, ingresa tu correo y contraseña");
        return;
      }
      
      if (props.onLogin) {
        props.onLogin(email, password);
      } else {
        console.log("Iniciando sesión con:", email);
        alert("¡Sesión iniciada! (Checkeá la consola)");
      }

    } else if (modo === "registro") {
      // Validación para el Registro
      if (!email || !password || !nombre) {
        setError("❌ Por favor completa todos los campos para registrarte");
        return;
      }
      
      console.log("Registrado con éxito:", { nombre, email });
      
      // Importante: Limpieza los datos antes de ir a la pantalla de éxito
      // Así, cuando el usuario vuelva al login, los campos estarán vacíos.
      limpiarFormulario(); 
      setModo("exito"); 
    }
  };

  // 1. Vista de éxito (Agradecimiento)
  if (modo === "exito") {
    return (
      <div className="form-container">
        <h2>¡Gracias por registrarte!</h2>
        <p className="mensaje-exito" style={{ display: "block", color: "green" }}>
          Tu cuenta ha sido creada con éxito.
        </p>
        <button onClick={() => setModo("login")}>Volver al Login</button>
      </div>
    );
  }

  // 2. Vista de formulario (Login o Registro)
  return (
    <section id="login">
      <div className="form-container">
        <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {modo === "registro" && (
          <input
            type="text"
            placeholder="Nombre y Apellido"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
        )}

        <input
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={manejarAccion}>
          {modo === "login" ? "Ingresar" : "Registrarme"}
        </button>

        <p style={{ marginTop: "15px" }}>
          {modo === "login" ? "¿No tienes cuenta? " : "¿Ya tienes cuenta? "}
          <span 
            className="link-simulado" 
            style={{ color: "#4CAF50", cursor: "pointer", textDecoration: "underline" }}
            onClick={() => {
              limpiarFormulario(); // Limpiamos al cambiar de pestaña para evitar confusiones
              setModo(modo === "login" ? "registro" : "login");
            }}
          >
            {modo === "login" ? "Crear cuenta" : "Inicia sesión"}
          </span>
        </p>

        {error && <p className="mensaje-error" style={{ display: "block", color: "red" }}>{error}</p>}
      </div>
    </section>
  );
}

export default CardLogin;