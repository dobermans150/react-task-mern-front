import React, { useContext, useEffect } from "react";
import Sidebar from "../layout/Sidebar";
import Barra from "../layout/Barra";
import FormTarea from "../tareas/FormTarea";
import ListadoTareas from "../tareas/ListadoTareas";

// Context
import AuthContext from "../../context/autentificacion/authContext";

const Proyectos = () => {
	// Extraer la infromacion de autentificacion.

	const authContext = useContext(AuthContext);
	const { usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();
		// Ojo tener cuidado porque si pasas como dependencia algunas funciones se ciclan.
		// Con el siguiente codigo quitamos el warning molesto de nuestra aplicacion.
		// eslint-disable-next-line
	}, []);
	return (
		<div className="contenedor-app">
			{/* Menu Lateral */}
			<Sidebar />

			{/* Contenido principal */}
			<div className="seccion-principal">
				<Barra />
				<main>
					<FormTarea />

					<div className="contenedor-tareas">
						<ListadoTareas />
					</div>
				</main>
			</div>
		</div>
	);
};

export default Proyectos;
