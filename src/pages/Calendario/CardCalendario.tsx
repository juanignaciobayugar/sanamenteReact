import Swal from 'sweetalert2';

interface CardCalendarioProps {
  day: number;
  dateKey: string;
  isToday: boolean;
  dayEvents: any[];
  eventsState: any;
  setEvents: (events: any) => void;
}

const CardCalendario = ({ day, dateKey, isToday, dayEvents, eventsState, setEvents }: CardCalendarioProps) => {
  
  // Función para AGREGAR
  const addEvent = async () => {
    const { value: text } = await Swal.fire({
      title: "Nueva actividad",
      input: "text",
      inputLabel: "¿Qué debes hacer?",
      showCancelButton: true,
    });

    if (!text) return;

    const { value: hour } = await Swal.fire({
      title: "Horario",
      input: "time",
      showCancelButton: true,
    });

    if (!hour) return;

    // Importante: Creo una copia nueva del estado para que React sepa que cambió
    const newEvents = { ...eventsState };
    if (!newEvents[dateKey]) newEvents[dateKey] = [];
    newEvents[dateKey].push({ text, hour });
    
    setEvents(newEvents); // Esto dispara el re-render y hace aparecer los botones
    Swal.fire("Guardado", "Evento creado", "success");
  };

  // Función para Editar
  const editEvent = async (index: number) => {
    const currentEvt = dayEvents[index];

    const { value: newText } = await Swal.fire({
      title: "Editar actividad",
      input: "text",
      inputValue: currentEvt.text,
      showCancelButton: true
    });

    if (!newText) return;

    const { value: newHour } = await Swal.fire({
      title: "Editar horario",
      input: "time",
      inputValue: currentEvt.hour,
      showCancelButton: true
    });

    if (!newHour) return;

    const newEvents = { ...eventsState };
    newEvents[dateKey][index] = { text: newText, hour: newHour };
    setEvents(newEvents);
    Swal.fire("Actualizado", "Evento editado con éxito", "success");
  };

  // Función para Eliminar
  const deleteEvent = (index: number) => {
    Swal.fire({
      title: "¿Seguro quieres eliminarlo?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar"
    }).then(res => {
      if (res.isConfirmed) {
        const newEvents = { ...eventsState };
        newEvents[dateKey].splice(index, 1);
        if (newEvents[dateKey].length === 0) delete newEvents[dateKey];
        setEvents(newEvents);
      }
    });
  };

  return (
    <div className={`day ${isToday ? "today" : ""}`} onClick={addEvent}>
      <strong>{day}</strong>
      {dayEvents && dayEvents.map((evt, i) => (
        <div key={i} className="event" onClick={(e) => e.stopPropagation()}>
          <div>{evt.text}</div>
          <div>{evt.hour} hs</div>
          
          <div className="event-buttons">
            <button className="edit-btn" onClick={() => editEvent(i)}>
              Editar
            </button>
            <button className="delete-btn" onClick={() => deleteEvent(i)}>
              Eliminar
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCalendario;