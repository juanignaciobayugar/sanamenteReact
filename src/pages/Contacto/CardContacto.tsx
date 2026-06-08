import React from 'react';

// Tipado de las propiedades del componente
interface CardContactoProps {
  titulo: string;
  children: React.ReactNode;
}

// Subcomponente para renderizar las secciones informativas de la derecha
const CardContacto = ({ titulo, children }: CardContactoProps) => {
  return (
    <div className="seccion-detalle-contacto">
      <h3>{titulo}</h3>
      {children}
    </div>
  );
};

export default CardContacto;