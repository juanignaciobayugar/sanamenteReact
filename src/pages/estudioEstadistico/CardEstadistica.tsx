import React from "react";

interface CardInformeProps {
  srcImage: string;
  title: string;
  description: string;
  loremp: string;
}

const CardInforme: React.FC<CardInformeProps> = ({
  srcImage,
  title,
  description,
  loremp,
}) => {
  return (
    <div className="cardEstadistica">
      <div className="contieneInformeEstadistica">
        <div className="contenedorEstadistica">
          {/* Imagen de la tarjeta */}
          <div className="imagenEstadistica">
            <img src={srcImage} alt={title} />
          </div>
          <div className="contienePreguntaEstadistica">
            <div className="tituloEstadistica">
              <h4>{title}</h4>
            </div>
            <div className="textoExplicativo">
              <h5>{description}</h5>
            </div>
          </div>
        </div>
        <div className="loremp">
          <h4>{loremp}</h4>
        </div>
      </div>
    </div>
  );
};

export default CardInforme;