import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";

// Importando context
import AlertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autentificacion/authContext";

const Login = (props) => {
	/* Extraer los valores del context */
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	// Extraer los valores de authContext
	const authContext = useContext(AuthContext);
  const { mensaje, autenticado, iniciarSesion } = authContext;
  
  /* En caso de que el password o el usuario no exista*/
	useEffect(() => {

		// Validamos si el usuariio se autentifico
		if (autenticado) {
			props.history.push("/proyectos");
		} 
		
		// Validamos si hay un mesnaje el cual mosrar
		if (mensaje) {
			mostrarAlerta(mensaje.msg, mensaje.categoria);
		}


	}, [mensaje, autenticado, props.history, mostrarAlerta]);

	/* State para iniciar sesion */
	const [usuario, guardarUsuario] = useState({
		email: "",
		password: "",
	});

	/* Extraer de usuario */

	const { email, password } = usuario;

	const onChange = (e) => {
		guardarUsuario({
			...usuario,
			[e.target.name]: e.target.value,
		});
	};

	/* Cuando el usuario quiere iniciar Sesion */

	const onSubmit = (e) => {
		e.preventDefault();

		//Validar que no haya campos vacios
		if (email.trim() === "" || password.trim() === "") {
			mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
		}

    //Pasar al action
    iniciarSesion({email, password});
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}

			<div className="contenedor-form sombra-dark">
				<h1>Iniciar Sesion</h1>

				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="email">Email</label>
						<input
							type="email"
							id="email"
							name="email"
							placeholder="Intorduce tu email"
							value={email}
							onChange={onChange}
						/>
					</div>

					<div className="campo-form">
						<label htmlFor="password">Contraseña</label>
						<input
							type="password"
							id="password"
							name="password"
							value={password}
							placeholder="Intorduce tu Contraseña"
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Iniciar Sesion"
						/>
					</div>
				</form>

				<Link to={"/nueva-cuenta"} className="enlace-cuenta">
					Obtener Cuenta
				</Link>
			</div>
		</div>
	);
};

export default Login;
