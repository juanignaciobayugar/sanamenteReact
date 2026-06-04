// 1. Definimos la estructura exacta que deben cumplir las Props del componente
interface CardProps {
  icon: string;        // Nombre de la clase de FontAwesome (ej: "fas fa-users")
  title: string;       // Título principal de la tarjeta
  description: string; // Cuerpo del texto informativo
  clasePastel: string; // Clase CSS para asignarle su color pastel individual al ícono
}

// 2. Componente funcional modular para renderizar cada tarjeta de presentación
const CardSobreNosotros = ({ icon, title, description, clasePastel }: CardProps) => {
  return (
    <div className="cardSobreNosotros">
      {/* Renderizado dinámico del ícono usando template literals */}
      <i className={`${icon} card-icon ${clasePastel}`}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardSobreNosotros;