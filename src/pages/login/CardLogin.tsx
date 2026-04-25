import { useState } from "react";

interface CardLoginProps {
  onLogin?: (email: string, password: string) => void;
}

function CardLogin(props: CardLoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const iniciarSesion = () => {
    if (!email || !password) {
      setError("❌ Usuario o contraseña incorrectos");
      return;
    }
    setError("");
    // Si se pasó la prop onLogin, la ejecutamos
    if (props.onLogin) {
      props.onLogin(email, password);
    } else {
      console.log("Login con:", email, password);
    }
  };

  return (
    <section id="login">
      <div className="form-container">
        <h2>Iniciar sesión</h2>

        <input
          type="email"
          id="emailLogin"
          placeholder="Correo electrónico"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          id="passwordLogin"
          placeholder="Contraseña"
          required
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button onClick={iniciarSesion}>Ingresar</button>

        <p>
          ¿No tienes cuenta?{" "}
          <a href="register.html">Crear cuenta</a>
        </p>

        {error && (
          <p className="mensaje-error" id="loginError">
            {error}
          </p>
        )}
      </div>
    </section>
  );
}

export default CardLogin;