import React, { useContext, useEffect } from "react";
import Proyecto from "./Proyecto";
import { TransitionGroup, CSSTransition } from "react-transition-group";

import proyectoContext from "../../context/proyectos/proyectoContex";
// Importando el context de alertas
import AlertaContext from "../../context/alertas/alertasContext";

const ListadoProyectos = () => {
	/* Extraer proyectos de state inicial */
	const proyectosContext = useContext(proyectoContext);
	const { mensaje, proyectos, obtenerProyectos } = proyectosContext;

	// Extraer las alertas del context de alerta
	const aletaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = aletaContext;

	/* Obtener pryectos cuando carga el componente*/
	useEffect(() => {
		// Si hay un error
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}

		obtenerProyectos();
		/* eslint-disable-next-line */
	}, [mensaje]);

	/* revisar si proyectos tiene contenido */
	if (proyectos.length === 0)
		return <p>No hay proyectos, comienza creando uno</p>;

	return (
		<ul className="listado-proyectos">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}
			<TransitionGroup>
				{proyectos.map((proyecto) => (
					<CSSTransition key={proyecto._id} timeout={200} classNames="proyecto">
						<Proyecto proyecto={proyecto} />
					</CSSTransition>
				))}
			</TransitionGroup>
		</ul>
	);
};

export default ListadoProyectos;
