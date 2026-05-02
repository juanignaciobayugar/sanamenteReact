
import CardEnergia from "./CardEnergia";
import CardDolor from "./CardDolor";
import CardEstado from "./CardCuestionario";
import "./cuestionario.css"

interface MainCuestionarioProps {
  onEstadoSelect: (valor: string, imgSrc: string, index: number,variant?: string) => void;
  onDolorSelect: (valor: string, imgSrc: string, index: number, variant?: string) => void;
  onEnergiaSelect: (valor: string, imgSrc: string, index: number, variant?: string) => void;
}

function MainCuestionario({ onEstadoSelect, onDolorSelect, onEnergiaSelect }: MainCuestionarioProps) {
  return (
    <main className="contenido">
      <div className="contenidoPrincipal">
        <CardEstado onSelect={onEstadoSelect} />
        <CardEnergia onSelect={onEnergiaSelect} />
        <CardDolor onSelect={onDolorSelect} />
      </div>
    </main>
  );
}

export default MainCuestionario;