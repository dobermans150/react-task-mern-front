import React, { useContext, useEffect } from "react";

import AuthContext from "../../context/autentificacion/authContext";

const Barra = () => {
	// Extraer la infromacion de autentificacion.

	const authContext = useContext(AuthContext);
	const {
		usuario,
		usuarioAutenticado,
		cerrarSesion,
	} = authContext;

	// Se ejecuta esta funcion en el effect para poder tener siempre los datos del usuario en el state
	useEffect(() => {
		usuarioAutenticado();

		// Ojo tener cuidado porque si pasas como dependencia algunas funciones se ciclan.
		// Con el siguiente codigo quitamos el warning molesto de nuestra aplicacion.
		// eslint-disable-next-line
	}, []);
	return (
		<header className="app-header">
			{usuario ? (
				<p className="nombre-usuario">
					Hola <span>{usuario.nombre}</span>
				</p>
			) : null}

			<nav className="nav-principal">
				<button
					className="btn btn-clank cerrar-sesion"
					onClick={() => {
						cerrarSesion();
					}}
				>
					Cerrar Sesion
				</button>
			</nav>
		</header>
	);
};

export default Barra;
