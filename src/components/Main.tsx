import Card from "./Card";
// import './Main.css'

function Main() {


  return (
    <main className="contenido">

      <div className="contenedor-portadaRelieve">
        <div className="contenedor-portada">
       

          <img className="portada" src="../src/assets/imagenes/index/foto portada.png" alt="Imagen principal" className="foto-principal"/>

          </div>
        <div className="relieveVerdePortada">
        </div>
      </div>
      <div className="contenidoPrincipal">
        <Card srcImage="../src/indexTarj/contacto.png" title="Contactanos" description="Dejanos tu opinion, y tu satisfaccion con el foro. Siempre nos da gusto escucharte." />

      </div>
    </main>
  )
}

export default Main