import CardInforme from "./CardEstadistica";
import "./informeEstadistico.css"
import  { useState, useEffect } from 'react';
// import Card from "./Card";
// import './Main.css'

interface PeriodStats {
  estadoEmocionalPredominante: string;
  promedioEnergia: number;
  promedioDolor: number;
  totalRegistros: number;
}

interface DashboardStats {
  
  semanal: PeriodStats;
  mensual: PeriodStats;
}
function MainEstadistica() {

  // 1. Inicializamos el estado en null para saber cuándo está cargando
 const [stats, setStats] = useState<DashboardStats | null>(null);
 const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        // Recuperamos el token que guardaste al hacer login (ej. en localStorage)
        const token = localStorage.getItem('token_jwt'); 

        const response = await fetch('http://localhost:3000/statistics/dashboard', {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        if (!response.ok) {
          throw new Error('Error al obtener las estadísticas');
        }

        const data = await response.json();
        setStats(data); // Guardamos el JSON completo en el estado
      } catch (err) {
        setError((err as Error).message);
      }
    };

    fetchStats();
  }, []);

  // 2. Render de carga o error
  if (error) return <p>Error: {error}</p>;
  if (!stats) return <p>Cargando estadísticas...</p>;

  // 3. LA MAGIA: Desestructuramos el objeto stats para usarlos fácil en el return
  const { semanal, mensual } = stats;




  // 1. Lógica para el Estado de Ánimo (Valores: Estupendo, Bien, Regular, Mal)
const obtenerTextoAnimo = (estado: string): string => {
  switch (estado) {
    case 'Estupendo':
      return "¡Qué gran semana! Te has sentido con una actitud increíble y una estabilidad emocional excelente. ¡A seguir así!";
    case 'Bien':
      return "Una semana bastante positiva. Tus emociones se mantuvieron estables y lograste transitar los días con tranquilidad.";
    case 'Regular':
      return "Esta semana tus emociones estuvieron un poco inestables. Es normal tener días grises, prioriza tu descanso.";
    case 'Mal':
      return "Ha sido una semana difícil a nivel emocional. No te presiones, sé amable contigo mismo y busca apoyo si lo necesitas.";
    default:
      return "No hay suficientes datos esta semana para evaluar tu estado de ánimo.";
  }
};

// 2. Lógica para la Energía (Escala 1 al 12)
const obtenerTextoEnergia = (promedio: number): string => {
  if (promedio >= 9) {
    return "Tus niveles de energía estuvieron al máximo. Has tenido la fuerza necesaria para completar todas tus actividades con éxito.";
  } else if (promedio >= 6) {
    return "Energía moderada. Lograste mantener un buen ritmo, administrando tus 'cucharas' de forma equilibrada durante la semana.";
  } else if (promedio >= 3) {
    return "Tus niveles de energía estuvieron bajos. Una semana de mucha batería consumida, es momento de recargar.";
  } else {
    return "Energía crítica. Has operado con lo justo. Prioriza el descanso absoluto y evita sobreesfuerzos.";
  }
};

// 3. Lógica para el Dolor (Escala 1 al 10 - ¡Acá el puntaje bajo es el mejor!)
const obtenerTextoDolor = (promedio: number): string => {
  if (promedio <= 3) {
    return "¡Excelente semana! Tus niveles de dolor se mantuvieron mínimos, permitiéndote mayor comodidad en tu día a día.";
  } else if (promedio <= 6) {
    return "Dolor moderado. Has tenido algunas molestias presentes, pero se mantuvieron en un rango controlable.";
  } else if (promedio <= 8) {
    return "Nivel de dolor alto. Esta semana el impacto físico fue severo. Recuerda seguir tus pautas de alivio.";
  } else {
    return "Dolor crónico/intenso. Una semana sumamente compleja a nivel físico. No dudes en consultar con tu especialista.";
  }
};

  // 1. Lógica para el Estado de Ánimo (Valores: Estupendo, Bien, Regular, Mal)
const obtenerTextoAnimoMensual = (estado: string): string => {
  switch (estado) {
    case 'Estupendo':
      return "¡Qué gran semana! Te has sentido con una actitud increíble y una estabilidad emocional excelente. ¡A seguir así!";
    case 'Bien':
      return "Una semana bastante positiva. Tus emociones se mantuvieron estables y lograste transitar los días con tranquilidad.";
    case 'Regular':
      return "Esta semana tus emociones estuvieron un poco inestables. Es normal tener días grises, prioriza tu descanso.";
    case 'Mal':
      return "Ha sido una semana difícil a nivel emocional. No te presiones, sé amable contigo mismo y busca apoyo si lo necesitas.";
    default:
      return "No hay suficientes datos esta semana para evaluar tu estado de ánimo.";
  }
};

// 2. Lógica para la Energía (Escala 1 al 12)
const obtenerTextoEnergiaMensual = (promedio: number): string => {
  if (promedio >= 9) {
    return "Tus niveles de energía estuvieron al máximo. Has tenido la fuerza necesaria para completar todas tus actividades con éxito.";
  } else if (promedio >= 6) {
    return "Energía moderada. Lograste mantener un buen ritmo, administrando tus 'cucharas' de forma equilibrada durante la semana.";
  } else if (promedio >= 3) {
    return "Tus niveles de energía estuvieron bajos. Una semana de mucha batería consumida, es momento de recargar.";
  } else {
    return "Energía crítica. Has operado con lo justo. Prioriza el descanso absoluto y evita sobreesfuerzos.";
  }
};

// 3. Lógica para el Dolor (Escala 1 al 10 - ¡Acá el puntaje bajo es el mejor!)
const obtenerTextoDolorMensual = (promedio: number): string => {
  if (promedio <= 3) {
    return "¡Excelente semana! Tus niveles de dolor se mantuvieron mínimos, permitiéndote mayor comodidad en tu día a día.";
  } else if (promedio <= 6) {
    return "Dolor moderado. Has tenido algunas molestias presentes, pero se mantuvieron en un rango controlable.";
  } else if (promedio <= 8) {
    return "Nivel de dolor alto. Esta semana el impacto físico fue severo. Recuerda seguir tus pautas de alivio.";
  } else {
    return "Dolor crónico/intenso. Una semana sumamente compleja a nivel físico. No dudes en consultar con tu especialista.";
  }
};




  return (
    <main className="contenido">
       <div className="contenidoPrincipal">

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/3.png"
        title="Tu informe del nivel de dolor"
        description={`Ultima semana: ${semanal.promedioDolor} de 10 / Mensual: ${mensual.promedioDolor} de 10`}
        loremp={obtenerTextoDolor(semanal.promedioDolor)}
        LorempMensual={obtenerTextoDolorMensual(mensual.promedioDolor)}
      />

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/2.png"
        title="Tu informe del estado de Ánimo"
        description={`Ultima semana: ${semanal.estadoEmocionalPredominante} / Mensual: ${mensual.estadoEmocionalPredominante}`}
        loremp={obtenerTextoAnimo(semanal.estadoEmocionalPredominante)}
        LorempMensual={obtenerTextoAnimoMensual(mensual.estadoEmocionalPredominante)}
      />


        <CardInforme
        srcImage="../src/assets/imagenes/estadistica/1.png"
        title="Tú informe de la Energía"
        description={`Ultima semana: ${semanal.promedioEnergia} de 12 / Mensual: ${mensual.promedioEnergia} de 12`}
        loremp={obtenerTextoEnergia(semanal.promedioEnergia)}
        LorempMensual={obtenerTextoEnergiaMensual(mensual.promedioEnergia)}
      />


</div>
    </main>
  );
}

export default MainEstadistica;