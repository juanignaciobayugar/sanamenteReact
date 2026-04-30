// import './Card.css'

// Card.tsx
import React from "react";

interface CardProps {
  srcImage: string;       // URL o ruta de la imagen
  title: string;          // título de la tarjeta
  description: string;    // texto explicativo
}

const Card: React.FC<CardProps> = ({ srcImage, title, description }) => {
  return (
    <div className="cardIndex">
      <div className="contenedorIndex">
        {/* Imagen de la tarjeta */}
        <div className="imagenIndex">
          <img src={srcImage} alt={title} />
        </div>
        <div className="contienePreguntaIndex">
          <div className="tituloIndex">
            <h4>{title}</h4>
          </div>
          <div className="textoExplicativoIndex">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;