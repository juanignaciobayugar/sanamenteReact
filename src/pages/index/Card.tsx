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
    <div className="card">
      <div className="contenedor">
        {/* Imagen de la tarjeta */}
        <div className="imagen">
          <img src={srcImage} alt={title} />
        </div>
        <div className="contienePregunta">
          <div className="titulo">
            <h4>{title}</h4>
          </div>
          <div className="textoExplicativo">
            <p>{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;