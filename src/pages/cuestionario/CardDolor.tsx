import Card from "./Card";

interface ButtonData {
  value: string;
  imgSrc: string;
}

interface CardDolorProps {
  onSelect?: (valor: string, imgSrc: string, index?: number, variant?: string) => void;
}

function CardDolor({ onSelect }: CardDolorProps) {
  const dolorButtons: ButtonData[]= [
    { value: "1", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/1.png" },
    { value: "2", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/2.png" },
    { value: "3", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/3.png" },
    { value: "4", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/4.png" },
    { value: "5", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/5.png" },
    { value: "6", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/6.png" },
    { value: "7", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/7.png" },
    { value: "8", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/8.png" },
    { value: "9", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/9.png" },
    { value: "10", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/10.png" },
    { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaDolor/dolor/nolose.png" },
  ];
const handleSelect = (valor: string, imgSrc: string, index?: number, variant?: string) => {
  localStorage.setItem(
    "ultimoDolor",
    JSON.stringify({ tipo: "dolor", valor, imgSrc, index, timestamp: Date.now() })
  );
  if (onSelect) onSelect(valor, imgSrc, index, variant);
};
  return (
    <Card
      title="¿Qué tan fuerte es el nivel de dolor que tengo?"
      imageSrc="../src/assets/imagenes/cuestionario/tarjetaDolor/tarjeta dolor.png"
      buttons={dolorButtons}
      variant="d" //
       onSelect={handleSelect}
    />
  );
};

export default CardDolor;