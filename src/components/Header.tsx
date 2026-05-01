import "./tarjetaDinamica.css";

interface HeaderProps {
  estado: string;
  dolor: string;
  energia: string;
  estadoImg: string; // Nueva prop para la imagen del estado
  dolorImg: string; // Nueva prop para la imagen del dolor
  energiaImg: string; // Nueva prop para la imagen de energía 
  onClearEstado: () => void;
  onClearDolor: () => void;
  onClearEnergia: () => void;

}
//funcion para mostrar los valores dinamicos del segmento cuestionario en el header...
function Header({ estado, dolor, energia, estadoImg, dolorImg, energiaImg, onClearEstado, onClearDolor, onClearEnergia }: HeaderProps) {
  return (
    <header>
      <div id="tarjetaDinamica">
        <div className="Anim">
          <h4>Ánimo</h4>
          <div id="valorEstado">
           {estadoImg ? (
  <button className="btn-imge btnEstado">
    <img src={estadoImg} alt={estado} />
  </button>
) : "-"}
            {estado && <button onClick={onClearEstado}>✖</button>}
          </div>
        </div>

        <div className="Dolo">
          <h4>Dolor</h4>
          <div id="valorDolor">
      {dolorImg ? (
  <button className="btn-imgd btnEstado">
    <img src={dolorImg} alt={dolor} />
  </button>
) : "-"}
  {dolor && <button onClick={onClearDolor}>✖</button>}
          </div>
        </div>

        <div className="Energi">
          <h4>Energía</h4>
          <div id="valorEnergia">
           {energiaImg ? (
  <button className="btn-imgc btnEstado">
    <img src={energiaImg} alt={energia} />
  </button>
) : "-"}
            {energia && <button onClick={onClearEnergia}>✖</button>}
          </div>
        </div>
      </div>
    </header>
  );
}
export default Header;