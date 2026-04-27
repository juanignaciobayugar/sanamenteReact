import React from 'react';

interface CardContactoProps {
  titulo: string;
  children: React.ReactNode;
}

const CardContacto = ({ titulo, children }: CardContactoProps) => {
  return (
    <div className="seccion-detalle-contacto">
      <h3>{titulo}</h3>
      {children}
    </div>
  );
};

export default CardContacto;