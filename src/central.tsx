import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useState,useEffect } from "react";
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
  // ✅ Estados para los valores dinámicos
  const [estado, setEstado] = useState<string>("");
  const [dolor, setDolor] = useState<string>("");
  const [energia, setEnergia] = useState<string>("");

  const  [estadoImg, setEstadoImg] = useState<string>(""); // Nuevo estado para la imagen del estado
  const [dolorImg, setDolorImg] = useState<string>(""); // Nuevo estado para la imagen del dolor
  const [energiaImg, setEnergiaImg] = useState<string>(""); // Nuevo estado para la imagen de energía 


  // ✅ Al montar, recuperar lo que haya en localStorage
  useEffect(() => {
    const guardadoEstado = localStorage.getItem("ultimoEstado");
    if (guardadoEstado) {
      const parsed = JSON.parse(guardadoEstado);
      if (parsed.tipo === "estado") setEstado(parsed.valor);
      setEstadoImg(parsed.imgSrc); // Recuperar la imagen del estado
    }

    const guardadoDolor = localStorage.getItem("ultimoDolor");
    if (guardadoDolor) {
      const parsed = JSON.parse(guardadoDolor);
      if (parsed.tipo === "dolor") setDolor(parsed.valor);
      setDolorImg(parsed.imgSrc); 
    }

    const guardadoEnergia = localStorage.getItem("ultimoEnergia");
    if (guardadoEnergia) {
      const parsed = JSON.parse(guardadoEnergia);
      if (parsed.tipo === "energia") setEnergia(parsed.valor);
      setEnergiaImg(parsed.imgSrc);
    }
  }, []);
  return (
    <BrowserRouter>
      <div className="central">
        // Header con valores dinámicos
       <Header
        estado={estado}
        dolor={dolor}
        energia={energia}
        estadoImg={estadoImg}
         dolorImg={dolorImg}     
         energiaImg={energiaImg}
        onClearEstado={() => {
          setEstado("");
          localStorage.removeItem("ultimoEstado");
        }}
        onClearDolor={() => {
          setDolor("");
          localStorage.removeItem("ultimoDolor");
        }}
        onClearEnergia={() => {
          setEnergia("");
          localStorage.removeItem("ultimoEnergia");
        }}
      />
        <Nav />

        <Routes>
        
        <Route path="/" element={<Main />} /> {/* O tu Home */}
        <Route path="/login" element={<MainLogin />} />
          <Route
            path="/cuestionario"
            element={
              <MainCuestionario
                onEstadoSelect={setEstado}
                onDolorSelect={setDolor}
                onEnergiaSelect={setEnergia}            
                />
                }
                
          />
<Route path="/estadisticas" element={<MainEstadistica />} />
<Route path="/contacto" element={<MainContacto />} />
          <Route path="/sobre-nosotros" element={<MainSobreNosotros />} />

          {/* resto de rutas */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Central;