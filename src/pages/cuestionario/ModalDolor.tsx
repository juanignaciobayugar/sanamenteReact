interface ButtonDataD {
    value: string;
    imgSrc: string;
}

interface ModalProps {
    onSelect: (valor: string, imgSrc: string, index: number, variant?: string) => void;
    onClose: () => void;
    variant?: string;
    buttons: ButtonDataD[]; // Aquí llegan los 12
    estadosdataD?: { text: string; image: string }[]; // Aquí llegan los 4
}

export default function ModalEstado({ buttons, onSelect, onClose, variant, estadosdataD }: ModalProps) {
    return (
        <div id="modal-estado" className="modal">
            <div className="modal-content">
                <span onClick={onClose} className="close">&times;</span>
                <div className="cards-container">

                    {/* Mapeamos sobre los 4 estados para crear las 4 tarjetas */}
                    {estadosdataD?.map((estado, i) => {

                        // Calculamos qué 3 botones le tocan a esta tarjeta
                        // i=0 => slice(0,3) | i=1 => slice(3,6) | i=2 => slice(6,9) | i=3 => slice(9,12)
                        const inicio = i * 3;
                        const botonesGrupo = buttons.slice(inicio, inicio + 3);

                        return (
                            <div key={i} className="cardEmergente">
                                <div className="contenedor">

                                    {/* Cabecera de la tarjeta */}
                                    <div className="imagenEmergente">
                                        <img src={estado.image} alt={estado.text} width={100} />
                                    </div>

                                    <div className="contienePreguntaEmergente">
                                        <div className="tituloEmergente">
                                            <h4>{estado.text}</h4>
                                        </div>

                                        {/* Contenedor interno para los 3 botones */}
                                        <div className="botonesEmergentes">
                                            {botonesGrupo.map((btn, indexInterno) => {
                                                // El índice real en el arreglo original de 12
                                                const indiceOriginal = inicio + indexInterno;

                                                return (
                                                    <button
                                                        key={indiceOriginal}
                                                        // Cambiamos ${i + 1} por ${indiceOriginal + 1}
                                                        className={`btn-img${variant ?? ""} btn-img${indiceOriginal + 1}${variant ?? ""} btnEstado`}
                                                        onClick={() => onSelect(btn.value, btn.imgSrc, indiceOriginal, variant)}
                                                    >
                                                        <img src={btn.imgSrc} alt={btn.value} width={80} />
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    </div>

                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}