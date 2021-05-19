import React, { useReducer } from "react";
import TareaContext from "./tareaContext";
import TareaReducer from "./tareaReducer";
import clienteAxios from "../../config/axios";

import {
	TAREAS_PROYECTO,
	AGREGAR_TAREA,
	VALIDAR_TAREA,
	ELIMINAR_TAREA,
	TAREA_ACTUAL,
	ACTUALIZAR_TAREA,
	LIMPIAR_TAREA,
} from "../../types/index";

const TareaState = (props) => {
	const initialState = {
		tareasProyecto: [],
		errorTarea: false,
		tareaSeleccionada: null,
	};

	/* Crear dispatch y state */

	const [state, dispatch] = useReducer(TareaReducer, initialState);

	/* CREAR LAS FUNCIONES */

	/* Obtener las tareas de un proyecto */
	const obtenerTareas = async (proyecto) => {
		try {
			const respuesta = await clienteAxios.get("api/tareas", {
				params: { proyecto },
			});
			dispatch({
				type: TAREAS_PROYECTO,
				payload: respuesta.data.tareas,
			});
		} catch (error) {
			console.log(error);
		}
	};

	/* agregar una tarea al proyecto seleccionado */

	const agregarTarea = async (tarea) => {
		try {
			const respueta = await clienteAxios.post("api/tareas", tarea);
			dispatch({
				type: AGREGAR_TAREA,
				payload: respueta.data,
			});
		} catch (error) {
			console.log(error);
		}
	};

	/* Valida y muestra un error en caso de que sea necesario */
	const validarTarea = () => {
		dispatch({
			type: VALIDAR_TAREA,
		});
	};

	/* Eliminar tarea por id */

	const eliminarTarea = async (id, proyecto) => {
		try {
			const respuesta = await clienteAxios.delete(`api/tareas/${id}`, {
				params: { proyecto },
      });
      
      console.log(respuesta);
      
      dispatch({
        type: ELIMINAR_TAREA,
        payload: id
      })
		} catch (error) {
			console.log(error);
		}
	};

/* Ediata o modifica una tarea */
const actualizarTarea = async (tarea) => {
  try {
    
    const respuesta = await clienteAxios.put(`api/tareas/${tarea._id}`, tarea);

    dispatch({
      type: ACTUALIZAR_TAREA,
      payload: respuesta.data.tarea,
    });
    
  } catch (error) {
    console.log(error);
    
  }
};

	/* Extrae una tarea para edicion */

	const guardarTareaActual = (tarea) => {
		dispatch({
			type: TAREA_ACTUAL,
			payload: tarea,
		});
	};

	
	/* Elimina la tarea seleccioanda */

	const limpiarTarea = () => {
		dispatch({
			type: LIMPIAR_TAREA,
		});
	};

	return (
		<TareaContext.Provider
			value={{
				tareasProyecto: state.tareasProyecto,
				errorTarea: state.errorTarea,
				tareaSeleccionada: state.tareaSeleccionada,
				obtenerTareas,
				agregarTarea,
				validarTarea,
				eliminarTarea,
				guardarTareaActual,
				actualizarTarea,
				limpiarTarea,
			}}
		>
			{props.children}
		</TareaContext.Provider>
	);
};

export default TareaState;
