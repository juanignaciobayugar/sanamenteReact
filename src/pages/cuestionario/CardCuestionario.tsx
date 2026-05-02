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
    { value: "bien", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/bien.png" },
    { value: "regular", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/regular.png" },
    { value: "mal", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/mal.png" },
    { value: "estupendo", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/estupendo.png" },
    { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/nolose.png" },
  ];

  const handleSelect = (valor: string, imgSrc: string, index: number, variant?: string) => {
    localStorage.setItem(
      "ultimoEstado",
      JSON.stringify({ tipo: "estado", valor, imgSrc,index, timestamp: Date.now() })
    );
    if (onSelect) onSelect(valor, imgSrc, index, variant);
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