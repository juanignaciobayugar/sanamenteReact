import { useState, useEffect } from 'react';
import CardCalendario from './CardCalendario';
import './Calendario.css';

const MainCalendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // Estado que almacena las notas organizadas por fecha clave
  const [events, setEvents] = useState<any>({});

  // Efecto inicial para traer todas las notas del backend autenticado
  useEffect(() => {
    const cargarNotasDesdeBackend = async () => {
      const token = localStorage.getItem('token_jwt'); 
      if (!token) return;

      try {
        const response = await fetch('https://sanamentenestjs.onrender.com/calendar-notes', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) throw new Error('Error al pedir las notas');
        const notasBackend = await response.json(); 

        // Formateamos el array plano del backend a un objeto estructurado por fechas: { "2026-06-01": [...] }
        const notasFormateadas: any = {};
        
        notasBackend.forEach((nota: any) => {
          if (!notasFormateadas[nota.date]) {
            notasFormateadas[nota.date] = [];
          }
          notasFormateadas[nota.date].push({
            id: nota.id,           
            text: nota.contenido,   
            hour: nota.creadoEn || nota.creado_en 
          });
        });

        // Guardamos las notas estructuradas en el estado de React
        setEvents(notasFormateadas);

      } catch (error) {
        console.error("Hubo un problema al sincronizar el calendario con el backend:", error);
      }
    };

    cargarNotasDesdeBackend();
  }, []); 

  // Cálculos de fechas para armar la grilla del mes actual
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  
  // Día de la semana en el que empieza el mes (0: Domingo, 1: Lunes, etc.)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Cantidad total de días que tiene el mes actual
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Función para cambiar de mes (Atrás: -1, Adelante: 1)
  const changeMonth = (dir: number) => {
    const newDate = new Date(currentDate.setMonth(currentDate.getMonth() + dir));
    setCurrentDate(newDate);
  };

  // Array de nombres para la cabecera de la grilla
  const diasSemana = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];

  // Generamos los bloques del mes
  const renderDays = () => {
    const totalBlocks = [];

    // Bloques vacíos para los días del mes anterior
    for (let i = 0; i < firstDayIndex; i++) {
      totalBlocks.push(<div key={`empty-${i}`} className="day-empty"></div>);
    }

    // Renderizado de los días reales del mes
    for (let day = 1; day <= daysInMonth; day++) {
      // Formateamos el string clave de la fecha (asegurando dos dígitos para mes y día)
      const currentMonthStr = String(month + 1).padStart(2, '0');
      const currentDayStr = String(day).padStart(2, '0');
      const dateKey = `${year}-${currentMonthStr}-${currentDayStr}`;

      // Verificamos si es la fecha de hoy en el mundo real
      const hoy = new Date();
      const isToday = hoy.getDate() === day && hoy.getMonth() === month && hoy.getFullYear() === year;

      // Pasamos los eventos asociados a este día o un array vacío si no tiene ninguno
      const dayEvents = events[dateKey] || [];

      totalBlocks.push(
        <CardCalendario
          key={dateKey}
          day={day}
          dateKey={dateKey}
          isToday={isToday}
          dayEvents={dayEvents}
          eventsState={events}
          setEvents={setEvents}
        />
      );
    }

    return totalBlocks;
  };

  return (
    <section id="calendario">
      <div className="calendar-container">
        {/* Cabecera del control de meses */}
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>Anterior</button>
          <h2 id="monthYear">
            {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
          </h2>
          <button onClick={() => changeMonth(1)}>Siguiente</button>
        </div>

        {/* Grilla completa del Calendario */}
        <div className="calendar-grid">
          {/* Cabecera de días de la semana */}
          {diasSemana.map((d) => (
            <div key={d} className="day-name">{d}</div>
          ))}
          
          {/* Celdas dinámicas del mes */}
          {renderDays()}
        </div>
      </div>
    </section>
  );
};

export default MainCalendario;