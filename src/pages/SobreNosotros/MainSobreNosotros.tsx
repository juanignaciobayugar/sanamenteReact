import CardSobreNosotros from "./CardSobreNosotros";
import "./SobreNosotros.css";

function MainSobreNosotros() {
  return (
    <main className="contenido">
      {/* Caja contenedora para centrar la sección */}
      <div className="section-box">
        {/* Grilla que distribuye las tarjetas en 1 o 2 columnas según la pantalla */}
        <section className="sobre-cards">
          
          {/* 👥 Tarjeta 1 - ¿Quiénes somos? (Ícono Celeste Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-users" 
            title="¿Quiénes somos?" 
            description="Somos un equipo dedicado a mejorar el bienestar diario a través del registro de emociones, dolor y energía." 
            clasePastel="txt-celeste-pastel"
          />

          {/* ❤️ Tarjeta 2 - Salud y bienestar (Ícono Rosa/Rojo Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-heart" 
            title="Salud y Bienestar" 
            description="Tu salud no es solo un diagnóstico. También es cómo dormís, cómo manejás el estrés, cómo se siente tu cuerpo y cómo te acompañás emocionalmente." 
            clasePastel="txt-rosa-pastel"
          />

          {/* 📈 Tarjeta 3 - Evolución personal (Ícono Verde Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-chart-line" 
            title="Evolución Personal" 
            description="Cada día cuenta. Visualizá tu progreso para reconocer tus mejores momentos y también los días difíciles." 
            clasePastel="txt-verde-pastel"
          />

          {/* 📚 Tarjeta 4 - Información (Ícono Amarillo Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-book" 
            title="Información" 
            description="Accedé a contenidos validados y pensados específicamente para vos. Comprender lo que te pasa es el primer paso para sentirte mejor." 
            clasePastel="txt-amarillo-pastel"
          />

          {/* 🤝 Tarjeta 5 - Acompañamiento (Ícono Violeta/Lila Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-hands-helping" 
            title="Acompañamiento" 
            description="No estás solo/a. La app está diseñada para que te sientas acompañado/a con recordatorios y herramientas para compartir tu información." 
            clasePastel="txt-violeta-pastel"
          />

          {/* ✨ Tarjeta 6 - Nuestra Misión (Ícono Naranja Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-star" 
            title="Nuestra Misión" 
            description="Brindar soluciones digitales accesibles, humanas y personalizadas para gestionar tu salud con apoyo, seguridad y confianza." 
            clasePastel="txt-naranja-pastel"
          />

        </section>
      </div>
    </main>
  );
}

export default MainSobreNosotros;