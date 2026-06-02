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
  

const getAuthHeaders = () => {
  const token = localStorage.getItem('token_jwt'); // O donde sea que guardes tu JWT
  return {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`
  };
};

//FUNCION AGREGAR NUEVO EVENTO
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
    // 🚀 PASO 1: Llamar al endpoint POST enviando el token en los headers
    const response = await fetch('http://localhost:3000/calendar-notes', {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        date: dateKey,         // "2026-06-01"
        contenido: text,       // "Reunión de equipo con mates"
        creado_en: hour         // "10:30"
      })
    });

    if (!response.ok) throw new Error('Error al guardar la nota');
    
    // 🚀 PASO 2: El backend nos devuelve la nota creada con su ID (ej: id: 5)
    const notaCreada = await response.json();

    // 🚀 PASO 3: Actualizar el estado de React incluyendo el ID del backend
    const newEvents = { ...eventsState };
    if (!newEvents[dateKey]) newEvents[dateKey] = [];
    
    newEvents[dateKey].push({ 
      id: notaCreada.id, // 👈 ¡CLAVE! Guardamos el ID que nos dio la base de datos
      text: notaCreada.contenido, 
      hour: notaCreada.creado_en 
    });
    
    setEvents(newEvents);
    Swal.fire("Guardado", "Evento creado en la base de datos", "success");

  } catch (error) {
    Swal.fire("Error", "No se pudo conectar con el servidor", "error");
  }
};

//FUNCION EDITAR EVENTO
const editEvent = async (index: number) => {
  const currentEvt = dayEvents[index];
  const notaId = currentEvt.id; // 👈 Sacamos el ID real de la base de datos

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
    // 🚀 PASO 1: Petición PUT a la URL con el ID de la nota al final
    const response = await fetch(`http://localhost:3000/calendar-notes/${notaId}`, {
      method: 'PATCH',
      headers: getAuthHeaders(),
      body: JSON.stringify({
        contenido: newText,
        creado_en: newHour
      })
    });

    if (!response.ok) throw new Error('No autorizado o nota inexistente');

    // 🚀 PASO 2: Actualizar el estado de React localmente si el backend dio OK
    const newEvents = { ...eventsState };
    newEvents[dateKey][index] = { 
      id: notaId, 
      text: newText, 
      hour: newHour 
    };
    
    setEvents(newEvents);
    Swal.fire("Actualizado", "Evento editado con éxito", "success");

  } catch (error) {
    Swal.fire("Error", "No se pudo actualizar la nota", "error");
  }
};

  // Función para Eliminar
const deleteEvent = (index: number) => {
  const currentEvt = dayEvents[index];
  const notaId = currentEvt.id; // 👈 Obtenemos el ID de la nota a borrar

  Swal.fire({
    title: "¿Seguro quieres eliminarlo?",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar"
  }).then(async (res) => { // 👈 Agregamos async acá para usar el await
    if (res.isConfirmed) {
      try {
        // 🚀 PASO 1: Petición DELETE directo al ID
        const response = await fetch(`http://localhost:3000/calendar-notes/${notaId}`, {
          method: 'DELETE',
          headers: getAuthHeaders()
        });

        if (!response.ok) throw new Error('No se pudo eliminar de la base de datos');

        // 🚀 PASO 2: Limpiar el estado de React localmente
        const newEvents = { ...eventsState };
        newEvents[dateKey].splice(index, 1);
        if (newEvents[dateKey].length === 0) delete newEvents[dateKey];
        
        setEvents(newEvents);
        Swal.fire("Eliminado", "La nota fue borrada", "success");

      } catch (error) {
        Swal.fire("Error", "No tienes permisos o la nota ya no existe", "error");
      }
    }
  });
};

  return (
    <div className={`day ${isToday ? "today" : ""}`} onClick={addEvent}>
      <strong>{day}</strong>
     {dayEvents && dayEvents.map((evt, i) => (
  <div key={evt.id || i} className="event" onClick={(e) => e.stopPropagation()}>
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