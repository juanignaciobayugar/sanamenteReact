import React, { useState, useEffect } from "react";

interface ButtonData {
  value: string;
  imgSrc: string;
}

interface CardProps {
  title: string;
  imageSrc: string;
  buttons: ButtonData[];
  variant?: string;
  onSelect?: (valor: string, imgSrc: string) => void;
}

const Card: React.FC<CardProps> = ({ title, imageSrc, buttons, variant, onSelect }) => {
  const [ultimoEstado, setUltimoEstado] = useState<string | null>(null);

  useEffect(() => {
    const guardado = localStorage.getItem("ultimoEstado");
    if (guardado) {
      const parsed = JSON.parse(guardado);
      if (parsed.tipo === "estado") {
        setUltimoEstado(parsed.valor);
      }
    }
  }, []);

const handleClick = (valor: string, imgSrc: string) => {
  if (onSelect) {
    onSelect(valor, imgSrc);
  }
};

  const handleClear = () => {
    setUltimoEstado(null);
    localStorage.removeItem("ultimoEstado");
    if (onSelect) onSelect("", "");
  };

  return (
    <div className="cardCuestionario">
      <div className="contenedorCuestionario">
        <div className="imagenCuestionario">
          <img src={imageSrc} alt={title} />
        </div>
        <div className="contienePregunta">
          <div className="titulo">
            <h4>{title}</h4>
          </div>
          <div className="botones">
            {buttons.map((btn, index) => (
              <button
                key={index}
                className={`btn-img${variant ?? ""} btn-img${index + 1}${variant ?? ""} btnEstado`}
                onClick={() => handleClick(btn.value, btn.imgSrc)}
              >
                <img src={btn.imgSrc} alt={btn.value} />
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;