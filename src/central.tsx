import img1 from "/assets/imagenes/cuestionario/no lo se d-e/no lo se 3.png";
import img2 from "/assets/imagenes/cuestionario/no lo se d-e/no lo se 2.png";
import img3 from "/assets/imagenes/cuestionario/no lo se d-e/no lo se 1.png";
import img4 from "/assets/imagenes/cuestionario/no lo se d-e/no lo se 4.png";
import img6 from "/assets/imagenes/cuestionario/no lo se d-e/no lo se 6.png";
import { RutaProtegida } from "./components/RutaProtegida.tsx"; // El guardia que creamos recién

import { BrowserRouter, Routes, Route, } from "react-router-dom";
import { useState, useEffect } from "react";
import Header from "./components/Header";
import Nav from "./components/Nav";
import Footer from "./components/Footer";
import MainEstadistica from "./pages/estudioEstadistico/MainEstadistica.tsx";
import MainLogin from "./pages/login/MainLogin.tsx";
import MainSobreNosotros from "./pages/SobreNosotros/MainSobreNosotros.tsx";
import MainContacto from "./pages/Contacto/MainContacto.tsx";
import Main from "./pages/index/Main.tsx";
import MainCalendario from "./pages/Calendario/MainCalendario.tsx";
import MainCuestionario from "./pages/cuestionario/MainCuestionario.tsx";
import ModalEstado from "./pages/cuestionario/ModalEstado.tsx";
import ModalEnergia from "./pages/cuestionario/ModalEnergia.tsx";
import ModalDolor from "./pages/cuestionario/ModalDolor.tsx";

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

  const [showModalEstado, setShowModalEstado] = useState(false);
  const [showModalEnergia, setShowModalEnergia] = useState(false);
  const [showModalDolor, setShowModalDolor] = useState(false);

  const [estado, setEstado] = useState<string>("");
  const [dolor, setDolor] = useState<string>("");
  const [energia, setEnergia] = useState<string>("");

  const [estadoImg, setEstadoImg] = useState<string>(""); // Nuevo estado para la imagen del estado
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
  const estadosdata = [
    {
      image: img2,
      text: "Hoy me siento bien de animo, estoy optimista, siento que puedo con mis cosas, le encuentro lo positivo a todo"
    }, {
      image: img3,
      text: "Hoy no me siento tan bien, me falto un poco para estar contento, si bien puedo hacer mis cosas, no me estoy divirtiendo, ni estoy en mis mejores días"
    }, {
      image: img4,
      text: "Hoy no puedo con mí día, por más que intento y trato, no estoy contento, me falta buena voluntad, va a costar y tendré que poner un esfuerzo considerado de mi parte para llevar el día adelante"
    }, {
      image: img1,
      text: "Hoy me siento mejor que nunca, estoy enérgico, estoy contento, tengo ganas de hacer y puedo practicar mi creatividad con estusiasmo, estoy dispuesto a realizar todo lo que me propongo"
    },
  ];



  const estadoButtons = [
    { value: "1", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/bien.png" },
    { value: "2", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/regular.png" },
    { value: "3", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/mal.png" },
    { value: "4", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/estupendo.png" },

  ];

  const estadosdataE = [
    {
      image: img4,
      text: "Muy poca energía, apenas podré hacer algo o lo indispensable del dia, tendre que priorizar lo necesario"
    }, {
      image: img3,
      text: "Un poco de energía, puedo realizar mis tareas indispensables sin agobiarme, si intento hacer de más, podría tener algún inconveniente o empezar mal el día de mañana"
    }, {
      image: img2,
      text: "Tengo mucha energía, podría hacer todo lo que quiero sin problemas, siempre siendo consciente de mis limitaciones para empezar bien mañana"
    }, {
      image: img1,
      text: "Es dificil que suceda, pero hoy me siento mejor que nunca puedo hacer eso que tan imposible se me hacia en otro momento, siempre siendo consciente de mis limitaciones"
    },
  ];


  const energiaButtons = [
    { value: "1", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/1.png" },
    { value: "2", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/2.png" },
    { value: "3", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/3.png" },
    { value: "4", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/4.png" },
    { value: "5", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/5.png" },
    { value: "6", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/6.png" },
    { value: "7", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/7.png" },
    { value: "8", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/8.png" },
    { value: "9", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/9.png" },
    { value: "10", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/10.png" },
    { value: "11", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/11.png" },
    { value: "12", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/12.png" },
  ];

  const estadosdataD = [
    {
      image: img1,
      text: "Sin ningun dolor, solo una molestia, nada me impide continuar con mis actividades"
    }, {
      image: img2,
      text: "Tengo molestias, esporadicamente se va atenuando, y empiezo a preocuparme"
    }, {
      image: img3,
      text: "Dolor considerable, se prolonga en el tiempo, me fastidia y parece imposible continuar con mis actividades"
    }, {
      image: img6,
      text: "Imposible continuar, estoy incapacitado para todo tipo de actividades"
    },
  ];

  const dolorButtons = [{ value: "1", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/1.png" },
  { value: "2", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/2.png" },
  { value: "3", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/3.png" },
  { value: "4", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/4.png" },
  { value: "5", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/5.png" },
  { value: "6", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/6.png" },
  { value: "7", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/7.png" },
  { value: "8", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/8.png" },
  { value: "9", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/9.png" },
  { value: "10", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/10.png" },
  ]

  const [estaLogueado, setEstaLogueado] = useState<boolean>(!!localStorage.getItem("token_jwt"));

  return (
    <BrowserRouter>
      <div className="central">
        <Header
          estaLogueado={estaLogueado} // 🔥 AGREGÁ ESTA LÍNEA ACÁ ARRIBA DE TODO DEL HEADER
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

  <Route
  path="/login"
  element={
    <MainLogin
      onLogin={() => {
        setEstaLogueado(true); // Prende el Header
      }}
      onLogout={() => {
        setEstaLogueado(false); // 👈 ¡ESTO APAGA EL HEADER AL INSTANTE!
      }}
    />
  }
/>

          <Route element={<RutaProtegida />}>
            <Route
              path="/cuestionario"
              element={
                <MainCuestionario
                  onEstadoSelect={(valor, imgSrc, index, variant) => {
                    if (valor === "nolose") {
                      // acá abrís el modal de Estado
                      setShowModalEstado(true);
                    } else {
                      setEstado(valor);
                      setEstadoImg(imgSrc);
                      setEstadoIndex(index);
                      if (variant) setEstadoVariant(variant);

                      localStorage.setItem(
                        "ultimoEstado",
                        JSON.stringify({ tipo: "estado", valor, imgSrc, index, variant, timestamp: Date.now() })
                      );
                    }
                  }}
                  onDolorSelect={(valor, imgSrc, index, variant) => {
                    if (valor === "nolose") {
                      // acá abrís el modal de Dolor
                      setShowModalDolor(true);
                    } else {

                      setDolor(valor);
                      setDolorImg(imgSrc);
                      setDolorIndex(index);
                      if (variant) setDolorVariant(variant);

                      localStorage.setItem(
                        "ultimoDolor",
                        JSON.stringify({ tipo: "dolor", valor, imgSrc, index, variant, timestamp: Date.now() })
                      );
                    }
                  }}
                  onEnergiaSelect={(valor, imgSrc, index, variant) => {
                    if (valor === "nolose") {
                      // acá abrís el modal de Energía
                      setShowModalEnergia(true);
                    } else {
                      setEnergia(valor);
                      setEnergiaImg(imgSrc);
                      setEnergiaIndex(index);
                      if (variant) setEnergiaVariant(variant);

                      localStorage.setItem(
                        "ultimoEnergia",
                        JSON.stringify({ tipo: "energia", valor, imgSrc, index, variant, timestamp: Date.now() })
                      );
                    }
                  }}
                />
              }
            />
            <Route path="/estadisticas" element={<MainEstadistica />} />
            <Route path="/contacto" element={<MainContacto />} />
            <Route path="/sobre-nosotros" element={<MainSobreNosotros />} />
            <Route path="Calendario" element={<MainCalendario />} />
          </Route> //cierro ruta protegida, todo lo que esté adentro de esto, va a necesitar el token para ser accedido
          {/* Agrega aquí el resto de tus rutas */}
        </Routes>
        {/* Modales */}
        {showModalEstado && (
          <ModalEstado
            buttons={estadoButtons}
            estadosdata={estadosdata}
            onSelect={(valor, imgSrc, index, variant) => {
              // 1. INSTANTÁNEO: Actualizamos la pantalla y cerramos el modal YA
              setEstado(valor);
              setEstadoImg(imgSrc);
              setEstadoIndex(index);
              if (variant) setEstadoVariant(variant);

              localStorage.setItem(
                "ultimoEstado",
                JSON.stringify({ tipo: "estado", valor, imgSrc, index, variant, timestamp: Date.now() })
              );

              setShowModalEstado(false); // El modal se cierra al toque

              // 2. EN SEGUNDO PLANO: Le avisamos al backend con tu endpoint real
              // Validamos que el valor no sea "nolose" si es que en el modal también existe esa opción
       
              if (valor !== "nolose") {
                const token = localStorage.getItem('token_jwt');
                if (!token) return;

                // Armamos el objeto EXACTAMENTE igual al JSON de Postman
                const bodyPayload = {
                  fecha: new Date().toISOString().split('T')[0], // "2026-05-24"

                  estadoEmocional: Number(valor)                 // Tu puntaje (ej: 4)
                };
                fetch("https://sanamentenestjs.onrender.com/daily-records/save-click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                  body: JSON.stringify(bodyPayload)
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log("✅ Respuesta del servidor en el Front:", data);
                  })
                  .catch(err => console.error("❌ Error al guardar desde el Front:", err));
              }
            }}
            onClose={() => setShowModalEstado(false)}
            variant="e"
          />
        )}

        {showModalEnergia && (
          <ModalEnergia
            buttons={energiaButtons} // Asegúrate de tener esta variable definida
            estadosdataE={estadosdataE} // Pasamos los datos de estadosdataE al modal
            onSelect={(valor, imgSrc, index, variant) => {
              setEnergia(valor);
              setEnergiaImg(imgSrc);
              setEnergiaIndex(index);
              if (variant) setEnergiaVariant(variant);
              localStorage.setItem("ultimoEnergia", JSON.stringify({ tipo: "energia", valor, imgSrc, index, variant, timestamp: Date.now() }));
              setShowModalEnergia(false);

              if (valor !== "nolose") {
                const token = localStorage.getItem('token_jwt');
                if (!token) return;



                // Armamos el objeto EXACTAMENTE igual al JSON de Postman
                const bodyPayload = {
                  fecha: new Date().toISOString().split('T')[0], // "2026-05-24"
                  // 1
                  estadoEnergia: Number(valor)                 // Tu puntaje (ej: 4)
                };
                fetch("https://sanamentenestjs.onrender.com/daily-records/save-click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                  body: JSON.stringify(bodyPayload)
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log("✅ Respuesta del servidor en el Front:", data);
                  })
                  .catch(err => console.error("❌ Error al guardar desde el Front:", err));
              }
            }}
            onClose={() => setShowModalEnergia(false)}
            variant="c"
          />
        )}

        {showModalDolor && (
          <ModalDolor
            buttons={dolorButtons} // Reutilizamos los botones de estado para el dolor, ajusta si necesitas otros
            estadosdataD={estadosdataD} // Pasamos los datos de estadosdataD al modal
            onSelect={(valor, imgSrc, index, variant) => {
              setDolor(valor);
              setDolorImg(imgSrc);
              setDolorIndex(index);
              if (variant) setDolorVariant(variant);
              localStorage.setItem("ultimoDolor", JSON.stringify({ tipo: "dolor", valor, imgSrc, index, variant, timestamp: Date.now() }));
              setShowModalDolor(false);

              if (valor !== "nolose") {
                const token = localStorage.getItem('token_jwt');
                if (!token) return;



                // Armamos el objeto EXACTAMENTE igual al JSON de Postman
                const bodyPayload = {
                  fecha: new Date().toISOString().split('T')[0], // "2026-05-24"

                  estadoDolor: Number(valor)                 // Tu puntaje (ej: 4)
                };
                fetch("https://sanamentenestjs.onrender.com/daily-records/save-click", {
                  method: "POST",
                  headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token}` },
                  body: JSON.stringify(bodyPayload)
                })
                  .then(res => res.json())
                  .then(data => {
                    console.log("✅ Respuesta del servidor en el Front:", data);
                  })
                  .catch(err => console.error("❌ Error al guardar desde el Front:", err));
              }


            }}
            onClose={() => setShowModalDolor(false)}
            variant="d"
          />
        )}
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default Central