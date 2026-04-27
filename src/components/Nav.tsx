import { Link } from "react-router-dom";

function Nav() {
  return (
    <nav className="menu">
      <ul>
        <li><Link to="/">Inicio</Link></li>
        <li><Link to="/login">Login</Link></li>
        <li><Link to="/cuestionario">Tú Estado</Link></li>
        <li><Link to="/calendario">Calendario</Link></li>
        <li><Link to="/estadisticas">Informe Estadistico</Link></li>
        <li><Link to="/sobre-nosotros">Sobre Nosotros</Link></li>
        <li><Link to="/contacto">Contacto</Link></li>
      </ul>
    </nav>
  );
}

export default Nav