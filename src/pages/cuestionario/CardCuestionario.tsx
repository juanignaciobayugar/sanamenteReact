import Card from "./Card";
interface ButtonData {
  value: string;
  imgSrc: string;
}

interface CardEstadoProps {
  onSelect?: (valor: string, imgSrc: string, index: number, variant?: string) => void;
}

function CardEstado({ onSelect }: CardEstadoProps) {
  const estadoButtons: ButtonData[] = [
    { value: "1", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/bien.png" },
    { value: "2", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/regular.png" },
    { value: "3", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/mal.png" },
    { value: "4", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/estupendo.png" },
    { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/nolose.png" },
  ];


const handleSelect = (valor: string, imgSrc: string, index: number, variant?: string) => {
  if (valor !== "nolose") {
    // 1. INSTANTÁNEO: Primero guardamos en LocalStorage y actualizamos la pantalla
    localStorage.setItem(
      "ultimoEstado",
      JSON.stringify({ tipo: "estado", valor, imgSrc, index, timestamp: Date.now() })
    );
        // Ejecutamos el onSelect de inmediato para que aparezca el ícono YA
    if (onSelect) onSelect(valor, imgSrc, index, variant);
// ==========================================
    // 2. EN SEGUNDO PLANO: Tu lógica que funciona perfecto
    // ==========================================
    const token = localStorage.getItem('token_jwt');
    if (!token) {
      console.warn("No se encontró el token JWT");
      return; 
    }

   // Armamos el objeto EXACTAMENTE igual al que te funcionó
    const bodyPayload = {
      fecha: new Date().toISOString().split('T')[0],
      estadoEmocional: Number(valor)
    };

    // Disparamos la petición al backend en segundo plano
    fetch("https://sanamentenestjs.onrender.com/daily-records/save-click", {
      method: "POST",
      headers: { "Content-Type": "application/json","Authorization": `Bearer ${token}` },
      body: JSON.stringify(bodyPayload)
    })
    .then(res => {
      if (!res.ok) throw new Error("Error en respuesta de servidor");
      return res.json();
    })
    .then(data => {
      console.log("✅ Respuesta del servidor (CardCuestionario):", data);
    })
    .catch(err => {
      console.error("❌ Error silencioso al guardar desde CardCuestionario:", err);
    });
    // ==========================================

  } else {
    // Si entra por el "nolose", también ejecuta el onSelect rápido
    if (onSelect) onSelect(valor, imgSrc, index, variant);
  }
};

  return (
    <Card
      title="Mi estado de ánimo hoy está:"
      imageSrc="../src/assets/imagenes/cuestionario/tarjetaAnimo/Sin título-1.png"
      buttons={estadoButtons}
      variant="e"
      onSelect={handleSelect}
    />
  );
};

export default CardEstado;