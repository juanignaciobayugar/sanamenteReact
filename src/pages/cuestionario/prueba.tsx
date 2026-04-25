import Card from "./Card";
import CardEnergia from "./CardEnergia";
import CardDolor from "./CardDolor";
// import './Main.css'

function MainCuestionario() {
  return (
    <main className="contenido">
       <div className="contenidoPrincipal">
      <Card
        title="Mi estado de ánimo hoy está:"
        imageSrc="../src/assets/imagenes/cuestionario/tarjetaAnimo/Sin título-1.png"
        buttons={[
          { value: "bien", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/bien.png" },
          { value: "regular", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/regular.png" },
          { value: "mal", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/mal.png" },
          { value: "estupendo", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/estupendo.png" },
          { value: "nolose", imgSrc: "../src/assets/imagenes/cuestionario/tarjetaAnimo/estado animo/nolose.png" },
        ]}

      />


    <CardEnergia />

    <CardDolor />

</div>
    </main>
  );
}

export default MainCuestionario;