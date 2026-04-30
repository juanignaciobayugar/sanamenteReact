import { useState, useEffect } from 'react';
import CardCalendario from './CardCalendario';
import './calendario.css';

const MainCalendario = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("calendarEvents");
    return saved ? JSON.parse(saved) : {};
  });

  useEffect(() => {
    localStorage.setItem("calendarEvents", JSON.stringify(events));
  }, [events]);

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

          {/* Días con el nuevo componente CardCalendario */}
          {[...Array(daysInMonth)].map((_, i) => {
            const day = i + 1;
            const dateKey = `${year}-${month + 1}-${day}`;
            const today = new Date();
            const isToday = day === today.getDate() && month === today.getMonth() && year === today.getFullYear();

            return (
              <CardCalendario 
                key={dateKey}
                day={day}
                dateKey={dateKey}
                isToday={isToday}
                dayEvents={events[dateKey]}
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