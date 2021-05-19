import React, { useContext } from "react";


/* contesx */
import proyectoContext from "../../context/proyectos/proyectoContex";
import TareaContext from "../../context/tareas/tareaContext";

const Tarea = ({ tarea }) => {
  /* obtener el state de Tareas */
  const tareaContext = useContext(TareaContext);
  const { eliminarTarea, obtenerTareas,actualizarTarea, guardarTareaActual } = tareaContext;

  /* Extraer si un proeycto esta activo */
  const proyectosContex = useContext(proyectoContext);
  const { proyecto } = proyectosContex;

  /* extraer el prpoyecto */
  /* es lo mismo que hacer proyecto[0], en realidad extraes el proyecto actual como objeto en la posicion 0. para que no se eliminen los demas tareas con el mismo id */
  const [proyectoActual] = proyecto;

  /* Funcion que se ejecuta cuando el usuario presiona boton de eliminar tarea */

  const tareaEliminar = id => {
    eliminarTarea(id,proyectoActual._id);
    obtenerTareas(proyectoActual._id);
  };


  /* Funcon que modifica el estado de las tareas */

  const cambiarEstado = tarea =>{
    if (tarea.estado) {
      tarea.estado = false;
    }else{
      tarea.estado = true;
    }

    actualizarTarea(tarea);
   
  }

  /* agrega una tarea actual cuand el usuario desea editarla */

  const seleccionarTarea = tarea =>{
    guardarTareaActual(tarea);
  }


  return (
    <li className="tarea sombra">
      <p>{tarea.nombre}</p>
      <div className="estado">
        {tarea.estado ? (
          <button type="button" className="completo" onClick={()=> cambiarEstado(tarea)}>
            Completo
          </button>
        ) : (
          <button type="button" className="incompleto"  onClick={()=> cambiarEstado(tarea)}>
            Incompleto
          </button>
        )}
      </div>

      <div className="acciones">
        <button type="button" className="btn btn-primario" onClick= { ()=> seleccionarTarea(tarea)}>
          Editar
        </button>

        <button
          type="button"
          className="btn btn-secundario"
          onClick={() => {
            tareaEliminar(tarea._id);
          }}
        >
          Eliminar
        </button>
      </div>
    </li>
  );
};

export default Tarea;
