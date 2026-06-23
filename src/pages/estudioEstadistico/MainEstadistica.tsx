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

        const response = await fetch('https://sanamentenestjs.onrender.com/statistics/dashboard', {
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
      return "Has logrado mantenerte muy optimista esta semana, lo habras notado en todas las cosas que andan bien, tus progresos son esperanzadores y de seguir asi, vas a lograr grandes cosas. ¡A seguir así! en corto plazo veras los frutos de tu esfuerzo.";
    case 'Bien':
      return "Es muy positivo tu esado actual, vas por buen camino, has logrado mantenerte estabale que no es poca cosa, podras funcionar bien en tu entorno cotidiano";
    case 'Regular':
      return "Esta semana falto un poco para sentirte bien, hay que ajustar algunas cosas, tal vez la carga, los descansos, o el entorno, tambien es normal tener picos nada es tan lineal, asi que a seguir adelante, vamos por un bien la proxima semana.";
    case 'Mal':
      return "Ha estado dificil esta semana, es normal tener frustracion y sentir que las cosas no van bien, hay que tomar medidas para salir de este estado, hacerme preguntas como ¿que cosas son las que me estan afectando? ¿que herramientas tengo en mi alcance para mejorar mi estado? ¿que puedo ajustar?, te animo a seguir adelante.";
    default:
      return "No hay suficientes datos esta semana para evaluar tu estado de ánimo.";
  }
};

// 2. Lógica para la Energía (Escala 1 al 12)
const obtenerTextoEnergia = (promedio: number): string => {
  if (promedio >= 9) {
    return "Tus niveles de energía estuvieron al máximo. Has tenido la fuerza necesaria para completar todas tus actividades con éxito.";
  } else if (promedio >= 6) {
    return "Energía moderada. Lograste mantener un buen ritmo, administrando tus 'cucharadas' de forma equilibrada durante toda la semana.";
  } else if (promedio >= 3) {
    return "Tus niveles de energía estuvieron bajos. Una semana de mucho desgaste, es momento de recargar.";
  } else {
    return "Energía crítica. Has operado con lo justo y te has sobreexigido. Prioriza el descanso absoluto y evita sobreesfuerzos.";
  }
};

// 3. Lógica para el Dolor (Escala 1 al 10 - ¡Acá el puntaje bajo es el mejor!)
const obtenerTextoDolor = (promedio: number): string => {
  if (promedio <= 3) {
    return "¡Excelente semana! Tus niveles de dolor se mantuvieron bajos, permitiéndote mayor comodidad en tu día a día.";
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
      return "¡Tus mes ha sido excelente! Has mantenido un estado de animo muy alto, lo cual habla bien de tu entorno, tus capacidades de gestion y tus actividades, estas haciendo un excelente trabajo.";
    case 'Bien':
      return "Un mes bastante positivo. Tus emociones se mantuvieron estables y lograste transitar los días con tranquilidad lo que seguro lo ves en todas las cosas que andan bien, suerte y a seguir.";
    case 'Regular':
      return "Un mes regular. Has tenido momentos de variabilidad emocional, pero has logrado mantener un equilibrio general bajo. Con un poco de esfuerzo y algun ajuste en el descanso o tal vez en la gestion de las actividades podrias ir pasando a un <bien>.";
    case 'Mal':
      return "Un mes complicado, con bastante sufrimiento emocional, es momento de hacer ese ajuste que sale del registro diario, animo y a seguir por aca.";
    default:
      return "No hay suficientes datos esta semana para evaluar tu estado de ánimo.";
  }
};

// 2. Lógica para la Energía (Escala 1 al 12)
const obtenerTextoEnergiaMensual = (promedio: number): string => {
  if (promedio >= 9) {
    return "Este mes has logrado el nivel mas alto posible de energia, un rendmiento asombromso, pudiendo mantener un alto nivel de actividad.";
  } else if (promedio >= 6) {
    return "Tus niveles de energia este mes han estado bien, correctas para lograr un buen desempeño, has descansado bien y te has mantenido equilibrado, ¡en hora buena!.";
  } else if (promedio >= 3) {
    return "Tus niveles de energia han estado un poco mas bajo de lo normal, es momento de prestar atencion y tomar medidas en el esfuerzo diario y el descanso.";
  } else {
    return "Has estado andando con muy poca energia, no rendiendo bien, y es correcto reflexionar sobre porque esta pasando, sera el descanso? seran las emociones? algo en mi entorno no esta bien? o tal vez es algo solo pasajero y estare atento... animo que todo pasa.";
  }
};

// 3. Lógica para el Dolor (Escala 1 al 10 - ¡Acá el puntaje bajo es el mejor!)
const obtenerTextoDolorMensual = (promedio: number): string => {
  if (promedio <= 3) {
    return "Que bueno este mes! No has tenido dolores signifantes, tus niveles de dolor se mantuvieron muy por lo bajo, a seguir disfrutando de esta calidad de vida.";
  } else if (promedio <= 6) {
    return "Este mes has tenido algun dolor, a estar atento a cuando duele, o que cosas hago cuando duele, pero en general esta muy bien, es normal sentir un poco de dolor, caminar la vida trae dolor es lo lindo de esto, siempre que no nos paralice a seguir andando.";
  } else if (promedio <= 8) {
    return "tus dolores este mes han estado un poco altos, se hicieron sentir estuvieron persistentes durante el mes, algo te estan queriendo decir, hay que prestar atencion a que es lo que duele y que ajustes realizar para mejorar.";
  } else {
    return "Dolor intenso, este mes han sufrido mucho, es hora de hacer una visita al médico, contar lo que esta pasando y llevar los registros para que pueda ayudarte.";
  }
};




  return (
    <main className="contenido">
       <div className="contenidoPrincipal">

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/3.png"
        title="Tú informe del nivel de dolor"
        description={`Ultima semana: ${semanal.promedioDolor} de 10 / Ultimo Mes: ${mensual.promedioDolor} de 10`}
        loremp={obtenerTextoDolor(semanal.promedioDolor)}
        LorempMensual={obtenerTextoDolorMensual(mensual.promedioDolor)}
      />

  <CardInforme
        srcImage="../src/assets/imagenes/estadistica/2.png"
        title="Tú informe del estado de Ánimo"
        description={`Ultima semana: ${semanal.estadoEmocionalPredominante} / Ultimo Mes: ${mensual.estadoEmocionalPredominante}`}
        loremp={obtenerTextoAnimo(semanal.estadoEmocionalPredominante)}
        LorempMensual={obtenerTextoAnimoMensual(mensual.estadoEmocionalPredominante)}
      />


        <CardInforme
        srcImage="../src/assets/imagenes/estadistica/1.png"
        title="Tú informe del estado de Energía"
        description={`Ultima semana: ${semanal.promedioEnergia} de 12 / Ultimo Mes: ${mensual.promedioEnergia} de 12`}
        loremp={obtenerTextoEnergia(semanal.promedioEnergia)}
        LorempMensual={obtenerTextoEnergiaMensual(mensual.promedioEnergia)}
      />


</div>
    </main>
  );
}

export default MainEstadistica;