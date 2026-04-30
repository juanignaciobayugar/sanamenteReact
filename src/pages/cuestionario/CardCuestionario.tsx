import React from "react";
import Card from "./Card";

const CardEstado: React.FC<{ onSelect?: (valor: string, imgSrc: string) => void }> = ({ onSelect }) => {
  const estadoButtons = [
    { value: "bien", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/bien.png" },
    { value: "regular", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/regular.png" },
    { value: "mal", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/mal.png" },
    { value: "estupendo", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/estupendo.png" },
    { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/nolose.png" },
  ];

  const handleSelect = (valor: string, imgSrc: string) => {
    localStorage.setItem(
      "ultimoEstado",
      JSON.stringify({ tipo: "estado", valor, imgSrc, timestamp: Date.now() })
    );
    if (onSelect) onSelect(valor, imgSrc);
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