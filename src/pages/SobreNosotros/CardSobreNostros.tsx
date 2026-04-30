// 1. Definimos qué forma tienen las props
interface CardProps {
  icon: string;        // O React.ReactNode si piensas pasar componentes/emojis
  title: string;
  description: string;
}

// 2. Le decimos al componente que use esa Interface
const CardSobreNosotros = ({ icon, title, description }: CardProps) => {
  return (
    <div className="cardSobreNosotros">
      <span className="card-icon">{icon}</span>
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
};

export default CardSobreNosotros;

