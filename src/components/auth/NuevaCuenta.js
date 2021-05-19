import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlertaContext from "../../context/alertas/alertasContext";
import AuthContext from "../../context/autentificacion/authContext";

const NuevaCuenta = (props) => {
	/* extraer los valores del context */
	const alertaContext = useContext(AlertaContext);
	const { alerta, mostrarAlerta } = alertaContext;

	// Extraer los valores de authContext

	const authContext = useContext(AuthContext);
	const { mensaje, autenticado, registrarUsuario } = authContext;

	/* En caso de que el usuario se  haya autenticado o registrado o sea un registro duplicado */
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
		nombre: "",
		email: "",
		password: "",
		confirmar: "",
	});

	/* Extraer de usuario */

	const { nombre, email, password, confirmar } = usuario;

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
		if (
			nombre.trim() === "" ||
			email.trim() === "" ||
			password.trim() === "" ||
			confirmar.trim() === "" ||
			email.trim() === ""
		) {
			mostrarAlerta("Todos los campos son obligatorios", "alerta-error");
			return;
		}

		//Password minimo de 6 caracteres

		if (password.length < 6) {
			mostrarAlerta(
				"El password debe ser de al menos 6 caracteres",
				"alerta-error"
			);
			return;
		}

		//Los 2 passwords son iguales
		if (password !== confirmar) {
			mostrarAlerta("las contraseñas no son iguales", "alerta-error");
			return;
		}

		//Pasar al action
		registrarUsuario({
			email,
			nombre,
			password,
		});
	};

	return (
		<div className="form-usuario">
			{alerta ? (
				<div className={`alerta ${alerta.categoria}`}>{alerta.msg}</div>
			) : null}

			<div className="contenedor-form sombra-dark">
				<h1>Obtener una Cuenta</h1>

				<form onSubmit={onSubmit}>
					<div className="campo-form">
						<label htmlFor="nombre">Nombre</label>
						<input
							type="text"
							id="nombre"
							name="nombre"
							placeholder="Ingresa tu Nombre"
							value={nombre}
							onChange={onChange}
						/>
					</div>

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
						<label htmlFor="confirmar">Confirmar Contraseña</label>
						<input
							type="password"
							id="confirmar"
							name="confirmar"
							value={confirmar}
							placeholder="Repite tu Contraseña"
							onChange={onChange}
						/>
					</div>
					<div className="campo-form">
						<input
							type="submit"
							className="btn btn-primario btn-block"
							value="Registrarme"
						/>
					</div>
				</form>

				<Link to={"/"} className="enlace-cuenta">
					¿Ya tienes una cuenta?
				</Link>
			</div>
		</div>
	);
};

export default NuevaCuenta;
