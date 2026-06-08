import { Navigate, Outlet } from "react-router-dom";

export const RutaProtegida = () => {
  // Revisamos si la llave (token) está en el navegador
  const token = localStorage.getItem("token_jwt");

  // Si no hay token, lo mandamos al login de patitas
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  // Si hay token, <Outlet /> le dice a React Router: "Dejá pasar a las páginas de adentro"
  return <Outlet />;
};