import React, { Fragment, useState, useContext } from "react";
import proyectoContext from "../../context/proyectos/proyectoContex";

const NuevoProyecto = () => {
  /* obtener el state del formualrio */
  const proyectosContex = useContext(proyectoContext);
  const { formulario,errorformulario, mostrarFormulario, agregarProyecto, mostrarError } = proyectosContex;

  /* State para el proyecto */

  const [proyecto, guardarProyecto] = useState({
    nombre: ""
  });

  /* Extraer nombre del proyecto */

  const { nombre } = proyecto;

  /* Lee los contenidos del input */
  const onChangeProyecto = e => {
    guardarProyecto({
      ...proyecto,
      [e.target.name]: e.target.value
    });
  };

  /* Cuando el usuari Envia el proyecto */
  const onSubmitProyecto = e => {
    e.preventDefault();

    //Validar el proyecto
    if (nombre === '') {
      mostrarError();
      return;
    }

    // agregar al state
    agregarProyecto(proyecto);

    //Reiniciar el form
    guardarProyecto({
      nombre: ''
    });
  };

  /* Mostrar el formulario */
  const onClickFormulario = () =>{
    mostrarFormulario();
  }


  return (
    <Fragment>
      <button type="button" className="btn btn-primario btn-block" onClick={onClickFormulario}>
        Nuevo Proyecto
      </button>

      {formulario ? (
        <form className="formulario-nuevo-proyecto" onSubmit={onSubmitProyecto}>
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Proyecto"
            name="nombre"
            value={nombre}
            onChange={onChangeProyecto}
          />

          <input
            type="submit"
            className="btn btn-primario btn-block"
            value="Agregar Proyecto"
          />
        </form>
      ) : null}

      {errorformulario ? <p className="mensaje error">El nombre del Proyecto es obligatorio</p> :null}
    </Fragment>
  );
};

export default NuevoProyecto;
