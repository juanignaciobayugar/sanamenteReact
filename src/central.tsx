import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainEstadistica from "./pages/estudioEstadistico/MainEstadistica.tsx"
import "./pages/login/login.css";
import MainLogin from "./pages/login/MainLogin.tsx";

function Central() {


  return (
    <>
      {/* Header (encabezado) / Navbar (barra de navegacion) */}
    <div className="central">
      <Header />
      <Nav />
      <MainLogin />
      <Footer />
    </div>
    </>
  )
}

export default Central