import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainEstadistica from "./pages/estudioEstadistico/MainEstadistica.tsx";
import MainLogin from "./pages/login/MainLogin.tsx";
import MainSobreNosotros from "./pages/SobreNosotros/MainSobreNosotros.tsx";
import MainContacto from "./pages/Contacto/MainContacto.tsx";
import Main from "./pages/index/Main.tsx";
import MainCuestionario from "./pages/cuestionario/MainCuestionario.tsx";






function Central() {

  return (
    <BrowserRouter>
      <div className="central">
        <Header />
        <Nav />
        
        {/* El componente Routes cambiará su contenido según la URL */}
        <Routes>
          <Route path="/" element={<Main />} /> {/* O tu Home */}
          <Route path="/login" element={<MainLogin />} />
          <Route path="/cuestionario" element={<MainCuestionario />} />
          <Route path="/estadisticas" element={<MainEstadistica />} />
          <Route path="/contacto" element={<MainContacto />} />
          <Route path="/sobre-nosotros" element={<MainSobreNosotros />} />
          {/* Agrega aquí el resto de tus rutas */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Central