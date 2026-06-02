import { useState, useEffect } from 'react';
import CardCalendario from './CardCalendario';
import './calendario.css';

const MainCalendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  // 1. El estado ahora empieza vacío, ya no lee el localStorage viejo
  const [events, setEvents] = useState<any>({});

  // 2. NUEVO: Traer las notas de la base de datos al cargar la pantalla
  useEffect(() => {
    const cargarNotasDesdeBackend = async () => {
      const token = localStorage.getItem('token_jwt'); // Asegurate que tu login guarde el JWT como 'token'
      if (!token) return;

      try {
        const response = await fetch('http://localhost:3000/calendar-notes', {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}` 
          }
        });

        if (!response.ok) throw new Error('Error al pedir las notas');
        const notasBackend = await response.json(); // Esto te trae el array [] de la base de datos

        // 3. Moldear el array del backend al formato de tu objeto por fechas: { "2026-06-01": [...] }
        const notasFormateadas: any = {};
        
        notasBackend.forEach((nota: any) => {
          if (!notasFormateadas[nota.date]) {
            notasFormateadas[nota.date] = [];
          }
          notasFormateadas[nota.date].push({
            id: nota.id,           // Guardamos el ID real para editar/borrar luego
            text: nota.contenido,   // Mapeamos a 'text' para tu CardCalendario
            hour: nota.creadoEn || nota.creado_en // Mapeamos a 'hour' previniendo mayúsculas/minúsculas
          });
        });

        // 4. Guardamos todo en tu estado de React para que se dibuje en pantalla
        setEvents(notasFormateadas);

      } catch (error) {
        console.error("Hubo un problema al sincronizar el calendario con el backend:", error);
      }
    };

    cargarNotasDesdeBackend();
  }, []); // El array vacío significa que se ejecuta una sola vez al entrar

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const changeMonth = (dir: number) => {
    setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + dir)));
  };

  return (
    <section id="calendario">
      <div className="calendar-container">
        <h2 id="monthYear">
          {currentDate.toLocaleDateString("es-ES", { month: "long", year: "numeric" })}
        </h2>
        <div className="calendar-header">
          <button onClick={() => changeMonth(-1)}>◀</button>
          <button onClick={() => changeMonth(1)}>▶</button>
        </div>

        <div className="calendar-grid">
          {["Dom", "Lun", "Mar", "Mié", "Jue", "Vie", "Sáb"].map(d => (
            <div key={d} className="day-name">{d}</div>
          ))}
          
          {/* Espacios vacíos */}
          {[...Array(firstDay)].map((_, i) => <div key={`empty-${i}`}></div>)}

          {/* Días con el componente CardCalendario sincronizado */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            
            // 3. CLAVE: Formatear la fecha con ceros adelante (ej: "2026-06-01") para que machee con NestJS
            const strMonth = String(month + 1).padStart(2, '0');
            const strDay = String(day).padStart(2, '0');
            const dateKey = `${year}-${strMonth}-${strDay}`;
            
            const today = new Date();
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <CardCalendario 
                key={dateKey}
                day={day}
                dateKey={dateKey}
                isToday={isToday}
                dayEvents={events[dateKey] || []} // Si no hay eventos, pasamos un array vacío
                eventsState={events}
                setEvents={setEvents}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default MainCalendario;