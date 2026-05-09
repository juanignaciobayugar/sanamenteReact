import "./tarjetaDinamica.css";


const FechaHoy = () => {
  const hoy = new Date().toLocaleDateString('es-AR', {
    day: 'numeric',
    month: 'long'
  });

  return <h4 id="diahoy">{hoy}</h4>;
};

interface HeaderProps {
  estado?: string;
  dolor?: string;
  energia?: string;
  estadoImg?: string;
  dolorImg?: string;
  energiaImg?: string;
  estadoIndex?: number;
  dolorIndex?: number;
  energiaIndex?: number;
  estadoVariant?: string;
  dolorVariant?: string;
  energiaVariant?: string;
  onClearEstado: () => void;
  onClearDolor: () => void;
  onClearEnergia: () => void;
}

function Header({
  estado,
  dolor,
  energia,
  estadoImg,
  dolorImg,
  energiaImg,
  estadoIndex,
  dolorIndex,
  energiaIndex,
  estadoVariant,
  dolorVariant,
  energiaVariant,
  onClearEstado,
  onClearDolor,
  onClearEnergia,
}: HeaderProps) {
  return (
    <header>
      <img src="..\src\assets\imagenes\index\logo.png" alt="Logo de la empresa" className="logo" />


      <div id="tarjetaDinamica">
        <div id="miDia" className="midia">
          <h4>Mi día</h4>
            <FechaHoy />
        </div>
        <div className="Anim">
          <div className="recuadroH4">
            <h4>Ánimo</h4>
          </div>
          <div id="valorEstado">
            {estadoImg ? (
              <button
                className={`btn-img${estadoVariant ?? ""} btn-img${(estadoIndex ?? 0) + 1}${estadoVariant ?? ""} btnEstado`}
                onClick={onClearEstado}
              >
                <img src={estadoImg} alt={estado} />
              </button>
            ) : "-"}
          </div>
        </div>

        <div className="Dolo">
          <div className="recuadroH4">
            <h4>Dolor</h4>
          </div>
          <div id="valorDolor">
            {dolorImg ? (
              <button
                className={`btn-img${dolorVariant ?? ""} btn-img${(dolorIndex ?? 0) + 1}${dolorVariant ?? ""} btnEstado`}
                onClick={onClearDolor}
              >
                <img src={dolorImg} alt={dolor} />
              </button>
            ) : (
              "-"
            )}
          </div>
        </div>

        <div className="Energi">
          <div className="recuadroH4">
            <h4>Energía</h4>
          </div>
          <div id="valorEnergia">
            {energiaImg ? (
              <button
                className={`btn-img${energiaVariant ?? ""} btn-img${(energiaIndex ?? 0) + 1}${energiaVariant ?? ""} btnEstado`}
                onClick={onClearEnergia}
              >
                <img src={energiaImg} alt={energia} />
              </button>
            ) : (
              "-"
            )}
          </div>
        </div>
      </div>


    </header>
  );
}

export default Header;