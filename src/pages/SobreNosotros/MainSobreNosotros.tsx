import CardSobreNosotros from "./CardSobreNosotros"; // Importación limpia con la "o"
import "./SobreNosotros.css";

function MainSobreNosotros() {
  return (
    <main className="contenido">
      <div className="section-box">
        <section className="sobre-cards">
          
          {/* 👥 Tarjeta 1 - ¿Quiénes somos? (Azul/Celeste Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-users" 
            title="¿Quiénes somos?" 
            description="Somos un equipo dedicado a mejorar el bienestar diario a través del registro de emociones, dolor y energía." 
            clasePastel="txt-celeste-pastel"
          />

          {/* ❤️ Tarjeta 2 - Salud y bienestar (Rosa/Rojo Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-heart" 
            title="Salud y Bienestar" 
            description="Tu salud no es solo un diagnóstico. También es cómo dormís, cómo manejás el estrés, cómo se siente tu cuerpo y cómo te acompañás emocionalmente." 
            clasePastel="txt-rosa-pastel"
          />

          {/* 📈 Tarjeta 3 - Evolución personal (Verde Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-chart-line" 
            title="Evolución Personal" 
            description="Cada día cuenta. Visualizá tu progreso para reconocer tus mejores momentos y también los días difíciles." 
            clasePastel="txt-verde-pastel"
          />

          {/* 📚 Tarjeta 4 - Información (Amarillo Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-book" 
            title="Información" 
            description="Accedé a contenidos validados y pensados específicamente para vos. Comprender lo que te pasa es el primer paso para sentirte mejor." 
            clasePastel="txt-amarillo-pastel"
          />

          {/* 🤝 Tarjeta 5 - Acompañamiento (Violeta/Lila Pastel) */}
          <CardSobreNosotros 
            icon="fas fa-hands-helping" 
            title="Acompañamiento" 
            description="No estás solo/a. La app está diseñada para que te sientas acompañado/a con recordatorios y herramientas para compartir tu información." 
            clasePastel="txt-violeta-pastel"
          />

         {/* ✨ Tarjeta - Nuestra Misión (Naranja/Glow Pastel) */}
<CardSobreNosotros 
  icon="fas fa-star" // Cambiado a estrella clásica para asegurar compatibilidad total
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