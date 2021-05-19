import React, { useReducer } from "react";

import alertaContext from "./alertasContext";
import alertaReducer from "./alertaReducer";
/* Importando los types */
import { OCULTAR_ALERTA, MOSTRAR_ALERTA } from "../../types";

const AlertaState = (props) => {
	const initialState = {
		alerta: null,
	};

	const [state, dispath] = useReducer(alertaReducer, initialState);

	/* Funciones */
	const mostrarAlerta = (msg, categoria) => {
		dispath({
			type: MOSTRAR_ALERTA,
			payload: {
				msg,
				categoria
			},
		});

    /* Despues de 5 segundos limpiar la alerta   */
		setTimeout(() => {
			dispath({
				type: OCULTAR_ALERTA,
			});
		}, 5000);
	};

	return (
		<alertaContext.Provider
			value={{
				alerta: state.alerta,
				mostrarAlerta,
			}}
		>
			{props.children}
		</alertaContext.Provider>
	);
};

export default AlertaState;
