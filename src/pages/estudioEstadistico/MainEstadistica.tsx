import CardInforme from "./CardEstadistica";

// import Card from "./Card";
// import './Main.css'

function MainEstadistica() {
  return (
    <main className="contenido">
       <div className="contenidoPrincipal">

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/3.png"
        title="Tu informe del nivel de dolor"
        description="Tu promedio semanal de dolor general es 5"
        loremp="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eos tenetur natus aliquid enim sequi facilis deleniti ea at recusandae saepe esse, vitae similique doloribus voluptatum hic sit, pariatur nisi!"
      />

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/2.png"
        title="Tu informe del estado de Ánimo"
        description="Tu promedio semanal de ánimo general es BUENO"
        loremp="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eos tenetur natus aliquid enim sequi facilis deleniti ea at recusandae saepe esse, vitae similique doloribus voluptatum hic sit, pariatur nisi!"
      />


        <CardInforme
        srcImage="../src/assets/imagenes/estadistica/1.png"
        title="Tú informe de la Energía"
        description="Tu promedio semanal general de Energía es 7"
        loremp="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, eos tenetur natus aliquid enim sequi facilis deleniti ea at recusandae saepe esse, vitae similique doloribus voluptatum hic sit, pariatur nisi!"
      />




</div>
    </main>
  );
}

export default MainEstadistica;