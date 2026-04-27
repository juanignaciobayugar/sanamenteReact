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
}

const Card: React.FC<CardProps> = ({ title, imageSrc, buttons, variant }) => {
  const [ultimoEstado, setUltimoEstado] = useState<string | null>(null);

  // Recuperar al montar
  useEffect(() => {
    const guardado = localStorage.getItem("ultimoEstado");
    if (guardado) {
      const parsed = JSON.parse(guardado);
      if (parsed.tipo === "estado") {
        setUltimoEstado(parsed.valor);
      }
    }
  }, []);

  const handleClick = (valor: string) => {
    if (!ultimoEstado) {
      setUltimoEstado(valor);
      localStorage.setItem(
        "ultimoEstado",
        JSON.stringify({ tipo: "estado", valor, timestamp: Date.now() })
      );
    } else {
      alert(
        `Ya tenés un valor asignado de "Estado". Si deseas cambiar, desmarca la etiqueta en el segmento "mi día".`
      );
    }
  };

  const handleClear = () => {
    setUltimoEstado(null);
    localStorage.removeItem("ultimoEstado");
  };

  return (
    <div className="card">
      <div className="contenedor">
        <div className="imagen">
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
                className={`btn-img${variant ?? ""} btn-img${index + 1}${
                  variant ?? ""
                } btnEstado`}
                onClick={() => handleClick(btn.value)}
              >
                <img src={btn.imgSrc} alt={btn.value} />
              </button>
            ))}
          </div>

          {/* Mostrar el valor seleccionado y permitir borrarlo */}
          {ultimoEstado && (
            <div
              id="valorEstado"
              style={{ display: "block", cursor: "pointer" }}
              onClick={handleClear}
            >
              <p>Seleccionado: {ultimoEstado} (clic para borrar)</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;