/* Importando useReducer y React en el state global */
import React, { useReducer } from "react";

/* Importando authReducer y AuthContext */
import AuthContext from "./authContext";
import authReducer from "./authReducer";

/* Importando los types para activar los metodos */
import {
	REGISTRO_EXITOSO,
	REGISTRO_ERROR,
	OBTENER_USUARIO,
	LOGIN_EXITOSO,
	LOGIN_ERROR,
	CERRAR_SESION,
} from "../../types";

import clienteAxios from "../../config/axios";
import tokenAuth from "../../config/tokenAuth";

const AuthState = (props) => {
	const initialState = {
		token: localStorage.getItem("token"),
		autenticado: null,
		usuario: null,
		mensaje: null,
		cargando: true,
	};

	const [state, dispath] = useReducer(authReducer, initialState);

	/* Funciones */

	const registrarUsuario = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("api/usuarios", datos);
			// Otra forma de hacerlo pero controlando el status del servicio
			// const { data, status } = respuesta;
			const { data } = respuesta;

			// Ejecutar si todo esta bien en el reducer
			dispath({
				type: REGISTRO_EXITOSO,
				payload: data,
			});

			// Obtener el usuario autenticado
			usuarioAutenticado();
		} catch (error) {
			// Otra forma de hacerlo pero controlando el status del servicio
			// const { data, status } = error.response;
			const { data } = error.response;

			// console.log(error.response);

			const alerta = {
				msg: data.msg,
				categoria: "alerta-error",
			};

			dispath({
				type: REGISTRO_ERROR,
				payload: alerta,
			});
		}
	};

	// Retorna el usuario autenticado
	const usuarioAutenticado = async () => {
		const token = localStorage.getItem("token");

		if (token) {
			tokenAuth(token);
		}

		try {
			// Consultamos los datos del usuario autenticado.
			const respuesta = await clienteAxios.get("api/auth");
			//datos del usuario en el payload
			dispath({
				type: OBTENER_USUARIO,
				payload: respuesta.data.usuario,
			});
		} catch (error) {
			dispath({
				type: LOGIN_ERROR,
			});
		}
	};

	// Cuando el usario inicia sesion

	const iniciarSesion = async (datos) => {
		try {
			const respuesta = await clienteAxios.post("api/auth", datos);

			dispath({
				type: LOGIN_EXITOSO,
				payload: respuesta.data,
			});

			// Obtener el usuario
			await usuarioAutenticado();
		} catch (error) {
			// Otra forma de hacerlo pero controlando el status del servicio
			// const { data, status } = error.response;
			const { data } = error.response;
			// console.log(error.response);

			const alerta = {
				msg: data.msg,
				categoria: "alerta-error",
			};

			dispath({
				type: LOGIN_ERROR,
				payload: alerta,
			});
		}
	};

	// Cierra la sesion del usuario

	const cerrarSesion = () => {
		dispath({
			type: CERRAR_SESION,
		});
	};

	return (
		<AuthContext.Provider
			value={{
				token: state.token,
				autenticado: state.autenticado,
				usuario: state.usuario,
				mensaje: state.mensaje,
				cargando: state.cargando,
				registrarUsuario,
				iniciarSesion,
				usuarioAutenticado,
				cerrarSesion,
			}}
		>
			{props.children}
		</AuthContext.Provider>
	);
};

export default AuthState;
