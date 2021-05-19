import React,{useContext} from "react";
import proyectoContext from "../../context/proyectos/proyectoContex";
import TareaContext from "../../context/tareas/tareaContext";


const Proyecto = ({ proyecto }) => {
    /* obtener el state de proyectos */
    const proyectosContex = useContext(proyectoContext);
    const { proyectoActual } = proyectosContex;

    /* obtener la funcion del context de tarea */

    const tareaContext = useContext(TareaContext);
    const {obtenerTareas} = tareaContext;


    /* Funcion apra agregar el proyecto actual */

    const seleccionarProyecto = id =>{
        proyectoActual(id); //Fijaru n proeycto actual
        obtenerTareas(id) //Filtrar las tareas cuando se de click

    }


  return (
    <li>
      <button type="button" className="btn btn-blank" onClick={() => {seleccionarProyecto(proyecto._id)}}>
        {proyecto.nombre}
      </button>
    </li>
  );
};

export default Proyecto;
