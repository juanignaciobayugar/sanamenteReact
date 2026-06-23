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
  
  // Función auxiliar para obtener las cabeceras de autenticación con el JWT
  const getAuthHeaders = () => {
    const token = localStorage.getItem('token_jwt'); 
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
  };

  // Función: agregar nuevo evento
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

    try {
      // Petición POST enviando el token en los headers al backend
      const response = await fetch('https://sanamentenestjs.onrender.com/calendar-notes', {
        method: 'POST',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          date: dateKey,         // Formato "YYYY-MM-DD"
          contenido: text,       // Texto de la actividad
          creado_en: hour        // Hora elegida
        })
      });

      if (!response.ok) throw new Error('Error al guardar la nota');
      
      // El backend devuelve la nota creada incluyendo su ID de la BD
      const notaCreada = await response.json();

      // Actualizamos el estado global de React con la nueva nota
      const newEvents = { ...eventsState };
      if (!newEvents[dateKey]) newEvents[dateKey] = [];
      
      newEvents[dateKey].push({ 
        id: notaCreada.id, // Guardamos el ID real para futuras ediciones/borrados
        text: notaCreada.contenido, 
        hour: notaCreada.creado_en 
      });
      
      setEvents(newEvents);
      Swal.fire("Guardado", "Evento creado en la base de datos", "success");

    } catch (error) {
      Swal.fire("Error", "No se pudo conectar con el servidor", "error");
    }
  };

  // Función: editar evento existente
  const editEvent = async (index: number) => {
    const currentEvt = dayEvents[index];
    const notaId = currentEvt.id; // Obtenemos el ID único de la base de datos

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

    try {
      // Petición PATCH al endpoint específico usando el ID de la nota
      const response = await fetch(`https://sanamentenestjs.onrender.com/calendar-notes/${notaId}`, {
        method: 'PATCH',
        headers: getAuthHeaders(),
        body: JSON.stringify({
          contenido: newText,
          creado_en: newHour
        })
      });

      if (!response.ok) throw new Error('Error al editar la nota');

      // Si el backend responde bien, actualizamos el estado local
      const newEvents = { ...eventsState };
      newEvents[dateKey][index] = {
        ...currentEvt,
        text: newText,
        hour: newHour
      };

      setEvents(newEvents);
      Swal.fire("Actualizado", "Actividad modificada con éxito", "success");

    } catch (error) {
      Swal.fire("Error", "No se pudo actualizar la actividad", "error");
    }
  };

  // Función: eliminar evento
  const deleteEvent = async (index: number) => {
    const currentEvt = dayEvents[index];
    const notaId = currentEvt.id;

    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará la nota permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d9534f",
      cancelButtonColor: "#4D8991",
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    });

    if (!confirm.isConfirmed) return;

    try {
      const response = await fetch(`https://sanamentenestjs.onrender.com/calendar-notes/${notaId}`, {
        method: 'DELETE',
        headers: getAuthHeaders()
      });

      if (!response.ok) throw new Error('Error al eliminar la nota');

      // Quitamos el evento del estado local de React
      const newEvents = { ...eventsState };
      newEvents[dateKey].splice(index, 1);
      
      // Si no quedan eventos en ese día, limpiamos la Key para no acumular arrays vacíos
      if (newEvents[dateKey].length === 0) delete newEvents[dateKey];

      setEvents(newEvents);
      Swal.fire("Eliminado", "La actividad fue removida", "success");

    } catch (error) {
      Swal.fire("Error", "No se pudo eliminar la nota", "error");
    }
  };

  return (
    <div className={`day ${isToday ? 'today' : ''}`} onClick={(e) => {
      // Evita que se dispare el modal de agregar al hacer click en los botones internos
      if (e.target === e.currentTarget) addEvent();
    }}>
      <span>{day}</span>
      
      {/* Renderizado de la lista de eventos del día */}
      {dayEvents.map((evt, idx) => (
        <div key={evt.id || idx} className="event">
          <strong>{evt.hour}</strong>
          <span>{evt.text}</span>
          <div className="event-buttons">
            <button className="edit-btn" onClick={() => editEvent(idx)}>Editar</button>
            <button className="delete-btn" onClick={() => deleteEvent(idx)}>Borrar</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default CardCalendario;