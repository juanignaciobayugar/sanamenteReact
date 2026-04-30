
import CardEnergia from "./CardEnergia";
import CardDolor from "./CardDolor";
import CardEstado from "./CardCuestionario";
import "./cuestionario.css"

function MainCuestionario({ onEstadoSelect, onDolorSelect, onEnergiaSelect }: {
  onEstadoSelect: (valor: string, imgSrc: string) => void;
  onDolorSelect: (valor: string, imgSrc: string) => void;
  onEnergiaSelect: (valor: string, imgSrc: string) => void;
}) {
  return (
    <main className="contenido">
       <div className="contenidoPrincipal">

    <CardEstado onSelect={onEstadoSelect}/>
    <CardEnergia onSelect={onEnergiaSelect} />
    <CardDolor onSelect={onDolorSelect} />

</div>
    </main>
  );
}

export default MainCuestionario;