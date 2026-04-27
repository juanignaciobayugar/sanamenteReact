import Header from "./components/Header.tsx";
import Nav from "./components/Nav.tsx";
import Footer from "./components/Footer.tsx";
import MainCuestionario from "./pages/cuestionario/prueba.tsx";
import "./pages/cuestionario/cuestionario.css"

function Central() {


  return (
    <>
      {/* Header (encabezado) / Navbar (barra de navegacion) */}
    <div className="central">
      <Header />
      <Nav />
      <MainCuestionario />
      <Footer />
    </div>
    </>
  )
}

export default Central