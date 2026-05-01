
interface ButtonData {
  value: string;
  imgSrc: string;
}

interface CardProps {
  title: string;
  imageSrc: string;
  buttons: ButtonData[];
  variant?: string;
  onSelect?: (valor: string, imgSrc: string, index: number, variant?: string) => void;
}


function Card({ title, imageSrc, buttons, variant, onSelect }: CardProps) {
  const handleClick = (btn: ButtonData, index: number) => {
    if (onSelect) {
      // ahora pasamos todo lo necesario para reconstruir el botón
      onSelect(btn.value, btn.imgSrc, index, variant);
    }
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
                onClick={() => { if (btn.value === "nolose") {
      // Abrir modal en vez de manejar como los demás
      console.log("Abrir modal para 'No lo sé'");
    } else {
     handleClick(btn, index);
    }
  }}
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