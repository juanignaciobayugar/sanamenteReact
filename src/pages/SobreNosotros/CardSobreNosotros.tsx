// 1. Definimos qué forma tienen las props
interface CardProps {
  icon: string;        // Ahora recibe las clases del ícono (ej: "fas fa-users")
  title: string;       // Título de la tarjeta
  description: string; // Detalle informativo
  clasePastel: string; // Clase CSS para pintarlo en tono pastel
}

// 2. Le decimos al componente que use esa Interface
const CardSobreNosotros = ({ icon, title, description, clasePastel }: CardProps) => {
  return (
    <div className="cardSobreNosotros">
      {/* Renderizamos el ícono vectorial con su clase base y su color pastel */}
      <i className={`${icon} card-icon ${clasePastel}`}></i>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardSobreNosotros;