import React, { useContext, useEffect } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../../context/autentificacion/authContext";

// Esto es un higer order component para poder hacer la redireccion de las rutas.

// Este componente toma un componente hijo como valor
const RutaPrivada = ({ component: Component, ...props }) => {
	const authContext = useContext(AuthContext);
	const { autenticado, cargando, usuarioAutenticado } = authContext;

	useEffect(() => {
		usuarioAutenticado();

		// Ojo tener cuidado porque si pasas como dependencia algunas funciones se ciclan.
		// Con el siguiente codigo quitamos el warning molesto de nuestra aplicacion.
		// eslint-disable-next-line
	}, []);

	// Si el usuario no esta autenticado se redirecciona a la pagina principal, si esta autenticado se redirecciona a cualquier otra pagina.

	return (
		<Route
			{...props}
			render={(props) =>
				!cargando && !autenticado  ? (
					<Redirect to="/" />
				) : (
					<Component {...props} />
				)
			}
		></Route>
	);
};

export default RutaPrivada;
