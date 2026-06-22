import { useState, useEffect } from "react";
// CORRECCIÓN: Importación de SweetAlert2 para el manejo estético de las alertas corporativas
import Swal from "sweetalert2";

interface CardLoginProps {
 onLogin?: (token: string) => void;
}

function CardLogin(props: CardLoginProps) {
  // --- ESTADOS PARA LOS CAMPOS ---
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setNombre] = useState("");

  // --- Estados nuevos (Solo para registro) ---
  const [fechaNacimiento, setFechaNacimiento] = useState("");
  const [edad, setEdad] = useState<number | "">("");

  // --- Estados de control de vista ---
  const [modo, setModo] = useState<"login" | "registro" | "exito">("login");
  const [error, setError] = useState("");

  // Cálculo automático de la edad basado en la fecha de nacimiento
  useEffect(() => {
    if (fechaNacimiento) {
      const hoy = new Date();
      const fechaNac = new Date(fechaNacimiento);
      let edadCalculada = hoy.getFullYear() - fechaNac.getFullYear();
      const mes = hoy.getMonth() - fechaNac.getMonth();

      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edadCalculada--;
      }

      const edadFinal = edadCalculada >= 0 ? edadCalculada : 0;
      setEdad(edadFinal);

      if (edadFinal >= 18) {
        setError("");
      }
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

  const manejarAccion = async () => { 
    setError("");
    console.log("Modo actual:", fechaNacimiento, edad);
    if (modo === "login") {
      if (!email || !password) {
        setError("❌ Por favor, ingresa tu correo y contraseña");
        return;
      }

      if (typeof edad === "number" && edad < 18) {
        setError("❌ Lo sentimos, tenés que ser mayor de 18 años para registrarte en la plataforma.");
        return; 
      }

      try {
        const respuesta = await fetch("http://localhost:3000/auth/login", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), 
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.mensaje || "Error al iniciar sesión");
        }

        console.log("Login exitoso, token recibido:", datos.access_token);

// 1. Limpiamos cualquier rastro viejo por seguridad
      localStorage.removeItem("token_jwt");

        if (datos.access_token) {
          localStorage.setItem("token_jwt", datos.access_token);
        }


        // 3. 🚨 LA REDIRECCIÓN VA ACÁ ADENTRO
        // Coloca aquí tu función para cambiar de pantalla, por ejemplo:
        // navigate("/perfil"); o la prop que le avise al padre.

         else {
        console.error("El backend no envió 'access_token'. Datos recibidos:", datos);
      }

   
        // CORRECCIÓN: SweetAlert2 configurado con el color unificado #4D8991
        await Swal.fire({
          title: "¡Sesión iniciada!",
          text: "Ingresaste con éxito a Sanamente.",
          icon: "success",
          confirmButtonColor: "#4D8991",
          iconColor: "#4D8991"
        });

        if (props.onLogin) {
          props.onLogin(datos.access_token); 
        }

      } catch (err: any) {
        setError(`❌ ${err.message}`);
      }

    } else if (modo === "registro") {
      if (!email || !password || !name || !fechaNacimiento) {
        setError("❌ Por favor completa todos los campos para registrarte");
        return;
      }

      try {
        const respuesta = await fetch("http://localhost:3000/users", {
          method: "POST", 
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name,
            fechaNacimiento,
            email,
            password
          }),
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          throw new Error(datos.mensaje || "Error al registrar el usuario");
        }

        console.log("Registrado con éxito en el servidor:", datos);

        // CORRECCIÓN: Ventana de SweetAlert2 con el color #4D8991
        await Swal.fire({
          title: "¡Registro Exitoso!",
          text: "Tu cuenta de paciente ha sido creada con éxito.",
          icon: "success",
          confirmButtonColor: "#4D8991",
          iconColor: "#4D8991"
        });

        limpiarFormulario();
        setModo("exito");

      } catch (err: any) {
        setError(`❌ ${err.message}`);
      }
    }
  };

  // ==========================================================================
  // VISTA DE ÉXITO (TRAS REGISTRARSE)
  // ==========================================================================
  if (modo === "exito") {
    return (
      /* CORRECCIÓN: Sin estilos fijos para que reaccione al hover del archivo CSS */
      <div className="form-container">
        <h2>¡Gracias por registrarte!</h2>
        <p className="mensaje-exito" style={{ display: "block", color: "#4D8991", fontWeight: "bold" }}>
          Tu cuenta ha sido creada con éxito.
        </p>
        <button onClick={() => setModo("login")}>
          Volver al Login
        </button>
      </div>
    );
  }

  // ==========================================================================
  // VISTA PRINCIPAL (LOGIN / REGISTRO)
  // ==========================================================================
  return (
    <section id="login">
      {/* CORRECCIÓN: Dejamos el contenedor limpio de inline-styles para que funcione el efecto dinámico del CSS */}
      <div className="form-container">
        <h2>{modo === "login" ? "Iniciar sesión" : "Crear cuenta"}</h2>

        {/* CAMPOS EXCLUSIVOS DE REGISTRO */}
        {modo === "registro" && (
          <>
            <input
              type="text"
              placeholder="Nombre y Apellido"
              value={name}
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

        {/* Campos comunes (Login y registro) */}
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