import { useState, useEffect } from "react";

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

      // Ajuste si el cumple aún no pasó en el año actual
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNac.getDate())) {
        edadCalculada--;
      }

      const edadFinal = edadCalculada >= 0 ? edadCalculada : 0;
      setEdad(edadFinal);

      // Lógica de control: Si el usuario cambia la fecha y ahora es mayor, 
      // limpiamos el error de forma automática para mejorar la experiencia.
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

  const manejarAccion = async () => { // Agregamos 'async' para poder usar 'await'
    setError("");
    console.log("Modo actual:", fechaNacimiento, edad);
    if (modo === "login") {
      // 1. Validación estándar de Login
      if (!email || !password) {
        setError("❌ Por favor, ingresa tu correo y contraseña");
        return;
      }

      // Filtro de edad: Bloqueo estricto si es menor de 18 años
      if (typeof edad === "number" && edad < 18) {
        setError("❌ Lo sentimos, tenés que ser mayor de 18 años para registrarte en la plataforma.");
        return; // Frena la ejecución, no permite avanzar al estado de éxito ni enviar a la API
      }

      // 2. AQUÍ SE HACE EL FETCH PARA EL LOGIN
      try {
        const respuesta = await fetch("http://localhost:3000/auth/login", {
          method: "POST", // Se usa POST para enviar credenciales de forma segura
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, password }), // Enviamos los datos
        });

        const datos = await respuesta.json();

        if (!respuesta.ok) {
          // Si el servidor responde con un error (ej: 401 contrasña incorrecta)
          throw new Error(datos.mensaje || "Error al iniciar sesión");
        }



        // Si todo sale bien:
        console.log("Login exitoso, token recibido:", datos.access_token);

        if (datos.access_token) {
          localStorage.setItem("token_jwt", datos.access_token);
        }

        // 2. Metemos el alert acá afuera para que aparezca SIEMPRE
        alert("¡Sesión iniciada con éxito! (Token guardado)");

        // 3. Después ejecutamos la prop que venía de arriba por si el resto de la app la necesita
        if (props.onLogin) {
          props.onLogin(datos.access_token); // Le pasamos el token en vez de la contraseña
        }

      } catch (err: any) {
        setError(`❌ ${err.message}`);
      }

    } else if (modo === "registro") {
      // 1. Validación de Registro
      if (!email || !password || !name || !fechaNacimiento) {
        setError("❌ Por favor completa todos los campos para registrarte");
        return;
      }

      // 2. AQUÍ SE HACE EL FETCH PARA EL REGISTRO
      try {
        const respuesta = await fetch("http://localhost:3000/users", {
          method: "POST", // POST para crear un nuevo recurso (usuario)
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

        // Si el registro fue exitoso:
        console.log("Registrado con éxito en el servidor:", datos);
        limpiarFormulario();
        setModo("exito");

      } catch (err: any) {
        setError(`❌ ${err.message}`);
      }
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
              value={name}
              onChange={(e) => setNombre(e.target.value)}
            />

            <div className="input-group-especial">
              <label>Fecha de Nacimiento:</label>
              <input
                type="date"
                // Mantiene el bloqueo nativo del calendario para no elegir fechas futuras
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