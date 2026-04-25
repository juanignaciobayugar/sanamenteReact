import Card from "./Card";
// import './Main.css'

function Main() {


  return (
    <main className="contenido">

      <div className="contenedor-portadaRelieve">
        <div className="contenedor-portada">
       
          <img className="portada foto-principal" src="../src/assets/imagenes/index/foto portada.png" alt="Imagen principal"/>

          </div>
        <div className="relieveVerdePortada">
        </div>
      </div>
      <div className="contenidoPrincipal">

            <Card srcImage="../src/assets/imagenes/index/main/almanaque.png" title="Calendario Dinámico" description="Administra tus actividades y mirá tus registros. De forma facil y sencilla anota todo lo que necesites." />
                <Card srcImage="../src/assets/imagenes/index/main/energia.png" title="Mejora Tú Energía" description="Medí tus cucharadas de energía diaria con informes semanales y mensuales." />
                    <Card srcImage="../src/assets/imagenes/index/main/revista.png" title="Revista Informativa" description="Enterate de novedades, temas de salud general, dietas y meditaciones: Te ayudamos a mejorar tus habitos." />
        <Card srcImage="..\src\assets\imagenes\index\main\contacto.png" title="Contactanos" description="Dejanos tu opinion, y tu satisfaccion con el foro. Siempre nos da gusto escucharte." />
                          <Card srcImage="..\src\assets\imagenes\index\main\dolor.png" title="Tú dolor" description="Podes registrar tu dolor y tu estado de ánimo general. Recibi tu informe claro para llevarle a tu médico especialista." />

      </div>
    </main>
  )
}

export default Main