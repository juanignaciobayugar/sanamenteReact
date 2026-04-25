import CardLogin from "./CardLogin"

// import './Main.css'

function MainLogin() {
  // Podés pasarle la prop onLogin si querés enganchar lógica
  const handleLogin = (email: string, password: string) => {
    console.log("Login desde Main:", email, password);
    // acá más adelante podés llamar al backend
  };

  return (
    <main className="contenido">
      <CardLogin onLogin={handleLogin} />
    </main>
  );
}

export default MainLogin