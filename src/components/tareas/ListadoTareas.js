import React, { Fragment, useContext } from "react";
import Tarea from "./Tarea";

/* Context */
import proyectoContext from "../../context/proyectos/proyectoContex";
import TareaContext from "../../context/tareas/tareaContext";

/* react transition */

import { CSSTransition, TransitionGroup } from "react-transition-group";

const ListadoTareas = () => {
  /* obtener proyectos de state inicial */
  const proyectosContex = useContext(proyectoContext);
  const { proyecto, eliminarProyecto } = proyectosContex;

  /* obtener las tareas del proyecto */
  const tareaContext = useContext(TareaContext);
  const { tareasProyecto } = tareaContext;

  /* si no hay proyectos seleccionado */

  if (!proyecto) return <h2>Seleccione un proyecto</h2>;

  /* array detructurin para extraer el proyecto actual */
  const [proyectoActual] = proyecto;

  /* Eliminar un proyecto */
  const onclickEliminar = () => {
    eliminarProyecto(proyectoActual._id);
  };
  return (
    <Fragment>
      <h2>Proyecto: {proyectoActual.nombre} </h2>
      <ul className="listado-tareas">
        {tareasProyecto.length === 0 ? (
          <li className="tarea">
            <p> No hay Tareas </p>
          </li>
        ) : 
          <TransitionGroup>
            {tareasProyecto.map(tarea => (
            <CSSTransition 
              key={tarea._id} 
              timeout={200} 
              classNames="tarea"
            >
              <Tarea
               tarea={tarea}
              />
            </CSSTransition>
            ))}
          </TransitionGroup>
        }
      </ul>

      <button
        type="button"
        className="btn btn-eliminar"
        onClick={onclickEliminar}
      >
        Eliminar Proyecto &times;
      </button>
    </Fragment>
  );
};

export default ListadoTareas;
