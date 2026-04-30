import CardSobreNosotros from "./CardSobreNostros";
import "./SobreNosotros.css"

function MainSobreNosotros() {
  return (
    <main className="contenido">
      <div className="section-box">
        <section className="sobre-cards">
          
          {/* 🟣 TARJETA 1 - ¿Quiénes somos? */}
          <CardSobreNosotros 
            icon="👥" 
            title="¿Quiénes somos?" 
            description="Somos un equipo dedicado a mejorar el bienestar diario a través del registro de emociones, dolor y energía." 
          />

          {/* 🔹 TARJETA 2  - Salud y bienestar */}
          <CardSobreNosotros 
            icon="❤️" 
            title="Salud y Bienestar" 
            description="Tu salud no es solo un diagnóstico. También es cómo dormís, cómo manejás el estrés, cómo se siente tu cuerpo y cómo te acompañás emocionalmente." 
          />

          {/* 🔹 TARJETA 3 - Evolución personal */}
          <CardSobreNosotros 
            icon="📈" 
            title="Evolución Personal" 
            description="Cada día cuenta. Visualizá tu progreso para reconocer tus mejores momentos y también los días difíciles." 
          />

          {/* 🔹 TARJETA 4  - Información */}
          <CardSobreNosotros 
            icon="📚" 
            title="Información" 
            description="Accedé a contenidos validados y pensados específicamente para vos. Comprender lo que te pasa es el primer paso para sentirte mejor." 
          />

          {/* 🔹 TARJETA 5  - Acompañamiento */}
          <CardSobreNosotros 
            icon="🤝" 
            title="Acompañamiento" 
            description="No estás solo/a. La app está diseñada para que te sientas acompañado/a con recordatorios y herramientas para compartir tu información." 
          />

          {/* 🟣 TARJETA 6 - Nuestra Misión */}
          <CardSobreNosotros 
            icon="✨" 
            title="Nuestra Misión" 
            description="Brindar soluciones digitales accesibles, humanas y personalizadas para gestionar tu salud con apoyo, seguridad y confianza." 
          />

        </section>
      </div>
    </main>
  );
}

export default MainSobreNosotros;