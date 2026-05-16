import { useState, useEffect } from "react";

interface CardLoginProps {
  onLogin?: (email: string, password: string) => void;
}

function CardLogin(props: CardLoginProps) {
  // --- ESTADOS PARA LOS CAMPOS ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nombre, setNombre] = useState(""); 
  
  // --- ESTADOS NUEVOS (SOLO PARA REGISTRO) ---
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState<number | "">("");

  // --- ESTADOS DE CONTROL DE VISTA ---
  const [modo, setModo] = useState<"login" | "registro" | "exito">("login"); 
  const [error, setError] = useState("");

  // Cálculo automático de la edad basado en la fecha de nacimiento
  useEffect(() => {
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(fechaNacimiento);
      let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();

      // Ajuste si el cumple aún no pasó en el año actual
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edadCalculada--;
      }

      setEdad(edadCalculada >= 0 ? edadCalculada : 0);
    } else {
      setEdad("");
    }
  }, [fechaNacimiento]);

  // Función para limpiar todos los inputs
  const limpiarFormulario = () => {
    setEmail("");
    setPassword("");
    setNombre("");
    setFechaNacimiento("");
    setEdad("");
    setError("");
  };

  const manejarAccion = () => {
    setError("");

    if (modo === "login") {
      // Validación estándar de Login
      if (!email || !password) {
        setError("❌ Por favor, ingresa tu correo y contraseña");
        return;
      }
      
      if (props.onLogin) {
        props.onLogin(email, password);
      } else {
        console.log("Iniciando sesión con:", email);
        alert("¡Sesión iniciada!");
      }

    } else if (modo === "registro") {
      // Validación de Registro incluyendo los nuevos campos obligatorios
      if (!email || !password || !nombre || !fechaNacimiento) {
        setError("❌ Por favor completa todos los campos para registrarte");
        return;
      }
      
      console.log("Registrado con éxito:", { nombre, email, fechaNacimiento, edad });
      
      limpiarFormulario(); 
      setModo("exito"); 
    }
  };

  // Vista de éxito
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

  return (
    <section id="login">
      <div className="form-container">
        <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {/* CAMPOS EXCLUSIVOS DE REGISTRO */}
        {modo === "registro" && (
          <>
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
            />
            
            <div className="input-group-especial">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                max={new Date().toISOString().split("T")[0]}
                value={fechaNacimiento}
                onChange={(e) => setFechaNacimiento(e.target.value)}
              />
            </div>

            <div className="input-group-especial">
              <label>Edad (automática):</label>
              <input
                type="number"
                placeholder="Edad"
                value={edad}
                readOnly 
                style={{ backgroundColor: "#f4f4f4", cursor: "not-allowed" }}
              />
            </div>
          </>
        )}

        {/* CAMPOS COMUNES (LOGIN Y REGISTRO) */}
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
              limpiarFormulario();
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