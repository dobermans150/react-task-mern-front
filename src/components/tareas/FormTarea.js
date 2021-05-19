import React, { useContext, useState, useEffect } from "react";
import proyectoContext from "../../context/proyectos/proyectoContex";

/* context */
import TareaContext from "../../context/tareas/tareaContext";

const FormTarea = () => {
  /* Extraer si un proyecto esta activo */
  const proyectosContex = useContext(proyectoContext);
  const { proyecto } = proyectosContex;

  /* obtener el state de Tareas */
  const tareaContext = useContext(TareaContext);
  const {
    errorTarea,
    tareaSeleccionada,
    agregarTarea,
    validarTarea,
    obtenerTareas,
    actualizarTarea,
    limpiarTarea
  } = tareaContext;

  /* Effect que detecta si hay una tarea seleccionada*/

  useEffect(() => {
    if (tareaSeleccionada !== null) {
      guardarTarea(tareaSeleccionada);
    } else {
      guardarTarea({
        nombre: "",
      });
    }
  }, [tareaSeleccionada]);

  /* state del formulario */
  const [tarea, guardarTarea] = useState({
    nombre: "",
  });

  /* Extraer el nombre del proyecto */
  const { nombre } = tarea;

  /* si no hay proyectos seleccionado */

  if (!proyecto) return null;

  /* array detructurin para extraer el proyecto actual */
  const [proyectoActual] = proyecto;

  // Leer los  valores del formulario
  const handleChange = (e) => {
    guardarTarea({
      ...tarea,
      [e.target.name]: e.target.value,
    });
  };

  /* Enviar Formulario */
  const onSubmit = (e) => {
    e.preventDefault();

    //validar
    if (nombre.trim() === "") {
      validarTarea();
      return;
    }

    /* sie es edicion o si es nueva tarea  */

    if (tareaSeleccionada === null) {
      // agregar la nueva tarea al state de tareas
      tarea.proyecto = proyectoActual._id;
      agregarTarea(tarea);
    }else{
      /* Actualizar tarea existente */
      actualizarTarea(tarea);

      /* Elimina tarea seleccionada del state */
      limpiarTarea();
    }

    //Obtener y filtrar las tareas del proyecto actual

    obtenerTareas(proyectoActual._id);

    //reiniciar el form

    guardarTarea({
      nombre: "",
    });
  };
  return (
    <div className="formulario">
      <form onSubmit={onSubmit}>
        <div className="contenedor-input">
          <input
            type="text"
            className="input-text"
            placeholder="Nombre Tarea..."
            name="nombre"
            value={nombre}
            onChange={handleChange}
          />
        </div>
        <div className="contenedor-input">
          <input
            type="submit"
            className="btn btn-primario btn-submit btn-block"
            value={tareaSeleccionada ? "Editar Tarea" : "Agregar Tarea"}
          />
        </div>
      </form>
      {errorTarea ? (
        <p className="mensaje error"> El nombre de la tarea es obligatorio</p>
      ) : null}
    </div>
  );
};

export default FormTarea;
