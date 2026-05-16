import CardLogin from "./CardLogin";
import "./login.css";

function MainLogin() {
  const handleLogin = (email: string, password: string) => {
    console.log("Intento de login - Email:", email, "Password:", password); 
  };

  return (
    <main className="contenido">
      <CardLogin onLogin={handleLogin} />
    </main>
  );
}

export default MainLogin;