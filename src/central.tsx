import Header from "./components/Header";
import Nav from "./components/Nav";
import Main from "./components/Main";
import Footer from "./components/Footer";


function Central() {


  return (
    <>
      {/* Header (encabezado) / Navbar (barra de navegacion) */}
    <div className="central">
      <Header />
      <Nav />
      <Main />
      <Footer />
    </div>
    </>
  )
}

export default Central