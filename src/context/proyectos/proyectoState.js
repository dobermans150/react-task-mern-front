import React, { useReducer } from "react";

import proyectoContext from "./proyectoContex";
import proyectoReducer from "./proyectoReducer";
/* Importando los types */
import {
	FORMULARIO_PROYECTO,
	OBTENER_PROYECTOS,
	AGREGAR_PROYECTOS,
	VALIDAR_FORMULARIO,
	PROYECTO_ACTUAL,
	ELIMINAR_PROYECTO,
	PROYECTO_ERROR,
} from "../../types";

import clienteAxios from "../../config/axios";

const ProyectoState = (props) => {
	/* State inicial */
	const initialState = {
		proyectos: [],
		formulario: false,
		errorformulario: false,
		proyecto: null,
		mensaje: null,
	};

	/* dispacth para ejecutar las acciones */
	/* se le pasa un reducer y un state inicial */

	const [state, dispatch] = useReducer(proyectoReducer, initialState);

	/* serie de funciones para el CRUD */

	const mostrarFormulario = () => {
		dispatch({
			type: FORMULARIO_PROYECTO,
		});
	};

	/* Obtener los proyectos */

	const obtenerProyectos = async () => {
		try {
			const respuesta = await clienteAxios.get("api/proyectos");

			dispatch({
				type: OBTENER_PROYECTOS,
				payload: respuesta.data.proyectos,
			});
		} catch (error) {
			const alerta = {
				msg: "Hubo un error",
				categoria: "alerta-error",
			};
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};

	/* Agregar Nuevo Proyecto */
	const agregarProyecto = async (proyecto) => {
		try {
			const resultado = await clienteAxios.post("api/proyectos", proyecto);
			console.log(resultado);

			/* Insetar el proyecto en el state  */
			dispatch({
				type: AGREGAR_PROYECTOS,
				payload: resultado.data,
			});
		} catch (error) {
			const alerta = {
				msg: "Hubo un error",
				categoria: "alerta-error",
			};
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};

	/* Validar el Formulario por errores */

	const mostrarError = () => {
		dispatch({
			type: VALIDAR_FORMULARIO,
		});
	};

	/* Selecciona el proyecto que el usuario dio click */

	const proyectoActual = (proyectoID) => {
		dispatch({
			type: PROYECTO_ACTUAL,
			payload: proyectoID,
		});
	};

	/* Eliminar un proyecto */

	const eliminarProyecto = async (proyectoId) => {
		try {
			await clienteAxios.delete(`api/proyectos/${proyectoId}`);
			dispatch({
				type: ELIMINAR_PROYECTO,
				payload: proyectoId,
			});
		} catch (error) {
			const alerta = {
				msg: "Hubo un error",
				categoria: "alerta-error",
			};
			dispatch({
				type: PROYECTO_ERROR,
				payload: alerta,
			});
		}
	};

	return (
		<proyectoContext.Provider
			value={{
				proyectos: state.proyectos,
				formulario: state.formulario,
				errorformulario: state.errorformulario,
				proyecto: state.proyecto,
				mensaje: state.mensaje,
				mostrarFormulario,
				obtenerProyectos,
				agregarProyecto,
				mostrarError,
				proyectoActual,
				eliminarProyecto,
			}}
		>
			{props.children}
		</proyectoContext.Provider>
	);
};

export default ProyectoState;
