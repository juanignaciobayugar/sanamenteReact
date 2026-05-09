import "./Modal.css";

interface ButtonData {
  value: string;
  imgSrc: string;
}

interface ModalProps {
  onSelect: (valor: string, imgSrc: string, index: number, variant?: string) => void;
  onClose: () => void;
  variant?: string;
  buttons: ButtonData[];
  estadosdata?: { text: string; image: string }[]; // Puedes ajustar el tipo según lo que realmente sea
}


export default function ModalEstado({ buttons, onSelect, onClose, variant, estadosdata}: ModalProps) {
console.log("Datos de estadosdata recibidos en ModalEstado:", estadosdata);



console.log("esta llegnado al modal estado");
  return (
    <div id="modal-estado" className="modal">
      <div className="modal-content">
        <span onClick={onClose} className="close">&times;</span>
        <div className="cards-container">
          {buttons.map((btn, i) => (
     
            <div key={i} className="cardEmergente">
              <div className="contenedor">
              <div className="imagenEmergente">
                <img src={estadosdata?.[i]?.image} alt={btn.value} width={100} />
              </div>
              <div className="contienePreguntaEmergente">
                <div className="tituloEmergente">
                  <h4>
                    {estadosdata?.[i]?.text}
                  </h4>
                </div>
                <button
                  className={`btn-img${variant ?? ""} btn-img${i + 1}${variant ?? ""} btnEstado`}
                  onClick={() => onSelect(btn.value, btn.imgSrc, i, variant)}
                >
                  <img src={btn.imgSrc} alt={btn.value} width={100} />
                </button>
              </div>
              </div>
            </div>
          ))}

        </div>
      </div>
    </div>
  );
}