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

interface RegistroCuestionario {
  tipo: "estado" | "dolor" | "energia";
  valor: string;
  imgSrc: string;
  index: number;
  variant: string;  
  timestamp: number;
}

function Central() {
  // ✅ Estados para los valores dinámicos
  const [estado, setEstado] = useState<string>("");
  const [dolor, setDolor] = useState<string>("");
  const [energia, setEnergia] = useState<string>("");

  const  [estadoImg, setEstadoImg] = useState<string>(""); // Nuevo estado para la imagen del estado
  const [dolorImg, setDolorImg] = useState<string>(""); // Nuevo estado para la imagen del dolor
  const [energiaImg, setEnergiaImg] = useState<string>(""); // Nuevo estado para la imagen de energía 

    const [estadoIndex, setEstadoIndex] = useState<number>();
  const [dolorIndex, setDolorIndex] = useState<number>();
  const [energiaIndex, setEnergiaIndex] = useState<number>();

  const [estadoVariant, setEstadoVariant] = useState<string>("");
  const [dolorVariant, setDolorVariant] = useState<string>("");
  const [energiaVariant, setEnergiaVariant] = useState<string>("");

  // ✅ Al montar, recuperar lo que haya en localStorage
useEffect(() => {
  const guardadoEstado = localStorage.getItem("ultimoEstado");
  if (guardadoEstado) {
    const parsed: RegistroCuestionario = JSON.parse(guardadoEstado);
    if (parsed.tipo === "estado") setEstado(parsed.valor);
    setEstadoImg(parsed.imgSrc);
    setEstadoIndex(parsed.index);
    setEstadoVariant(parsed.variant);
  }

  const guardadoDolor = localStorage.getItem("ultimoDolor");
  if (guardadoDolor) {
    const parsed: RegistroCuestionario = JSON.parse(guardadoDolor);
    if (parsed.tipo === "dolor")
    setDolor(parsed.valor);
    setDolorImg(parsed.imgSrc);
    setDolorIndex(parsed.index);
    setDolorVariant(parsed.variant);
  }

  const guardadoEnergia = localStorage.getItem("ultimoEnergia");
  if (guardadoEnergia) {
    const parsed: RegistroCuestionario = JSON.parse(guardadoEnergia);
    if (parsed.tipo === "energia") setEnergia(parsed.valor);
    setEnergiaImg(parsed.imgSrc);
    setEnergiaIndex(parsed.index);
    setEnergiaVariant(parsed.variant);
  }
}, []);

  return (
    <BrowserRouter>
      <div className="central">
        <Header
          estado={estado}
          estadoImg={estadoImg}
          estadoIndex={estadoIndex}
          estadoVariant={estadoVariant}
          dolor={dolor}
          dolorImg={dolorImg}
          dolorIndex={dolorIndex}
          dolorVariant={dolorVariant}
          energia={energia}
          energiaImg={energiaImg}
          energiaIndex={energiaIndex}
          energiaVariant={energiaVariant}
          onClearEstado={() => {
            setEstado("");
            setEstadoImg("");
            setEstadoIndex(undefined);
            setEstadoVariant("");
            localStorage.removeItem("ultimoEstado");
          }}
          onClearDolor={() => {
            setDolor("");
            setDolorImg("");
            setDolorIndex(undefined);
            setDolorVariant("");
            localStorage.removeItem("ultimoDolor");
          }}
          onClearEnergia={() => {
            setEnergia("");
            setEnergiaImg("");
            setEnergiaIndex(undefined);
            setEnergiaVariant("");
            localStorage.removeItem("ultimoEnergia");
          }}
        />

        <Nav />

        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<MainLogin />} />
          <Route
            path="/cuestionario"
            element={
              <MainCuestionario
                onEstadoSelect={(valor, imgSrc, index, variant) => {
                  setEstado(valor);
                  setEstadoImg(imgSrc);
                  setEstadoIndex(index);
                  if (variant) setEstadoVariant(variant);

                  localStorage.setItem(
                    "ultimoEstado",
                    JSON.stringify({ tipo: "estado", valor, imgSrc, index, variant, timestamp: Date.now() })
                  );
                }}
                onDolorSelect={(valor, imgSrc, index, variant) => {
                  setDolor(valor);
                  setDolorImg(imgSrc);
                  setDolorIndex(index);
                  if (variant) setDolorVariant(variant);

                  localStorage.setItem(
                    "ultimoDolor",
                    JSON.stringify({ tipo: "dolor", valor, imgSrc, index, variant, timestamp: Date.now() })
                  );
                }}
                onEnergiaSelect={(valor, imgSrc, index, variant) => {
                  setEnergia(valor);
                  setEnergiaImg(imgSrc);
                  setEnergiaIndex(index);
                  if (variant) setEnergiaVariant(variant);

                  localStorage.setItem(
                    "ultimoEnergia",
                    JSON.stringify({ tipo: "energia", valor, imgSrc, index, variant, timestamp: Date.now() })
                  );
                }}
              />
            }
          />
          <Route path="/estadisticas" element={<MainEstadistica />} />
          <Route path="/contacto" element={<MainContacto />} />
          <Route path="/sobre-nosotros" element={<MainSobreNosotros />} />
          <Route path="/calendario" element={<div>Calendario</div>} />
          {/* Agrega aquí el resto de tus rutas */}
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Central