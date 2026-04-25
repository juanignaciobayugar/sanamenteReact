interface ButtonData {
  value: string;
  imgSrc: string;
}

interface CardProps {
  title: string;
  imageSrc: string;
  buttons: ButtonData[];
    variant?: string; //
}

const Card: React.FC<CardProps> = ({ title, imageSrc, buttons, variant }) => {
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
                className={`btn-img${variant ?? ""} btn-img${index + 1}${variant ?? ""} btnEstado`}
                data-valorestado={btn.value}
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