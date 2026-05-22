// ELEMENTOS DE NAVEGACION
import { Link, useNavigate } from "react-router-dom";
// FUNCIONES PERSONALIZADAS
import {logout, getUser} from "../utils/auth";

// COMPONENTE NAVBAR PRIVADO
export default function PrivateNavbar() {
  //redireccionado
  const navigate = useNavigate();
  //obtencion de usuario autenticado
  const user = getUser();
  //funcion para cerrar sesion
  const handleLogout = () => {logout(); navigate("/login"); };

  return (
    <nav>
      <Link to="/dashboard">Dashboard</Link>
      {" | "}
      <Link to="/info">Info</Link>
      {" | "}
      <Link to="/perfil">Perfil</Link>
      {" | "}
      <Link to="/configuracion">Configuración</Link>
      {" | "}
      <button onClick={handleLogout}>Logout</button>
      <hr />
      <p>Usuario: {" "} {user?.usuario}</p>
      <p>Rol: {" "} {user?.rol}</p>
      <p>Ciudad: {" "} {user?.ciudad ?? "No disponible"}</p>
      <hr />
    </nav>
  );
}