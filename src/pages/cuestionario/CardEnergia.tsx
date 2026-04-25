import React from "react";
import Card from "./Card";

const CardEnergia: React.FC = () => {
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
    { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaEnergia/cucharadas-energia/NO LO SE.png" },
  ];

  return (
    <Card
      title="¿Cuántas cucharadas de energía tengo para el día de hoy?"
      imageSrc="../src/assets/imagenes/cuestionario/tarjetaEnergia/tarjetaEnergia.png"
      buttons={energiaButtons}
      variant="c"
    />
  );
};

export default CardEnergia;