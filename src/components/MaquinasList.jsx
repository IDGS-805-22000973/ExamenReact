import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Maquina from "./Maquina";

// const para declarar funciones
const obtenerMaquinas = () => {
  // var, let y const
  var mensaje = "Lista de máquinas inicial"; 
  let cantidad = 1; // let
  const maquinas = [
    {
      nombre: "Máquina Smith",
      tipo: "Fuerza",
      descripcion: "Perfecta para mejorar la fuerza principalmente de Pierna.",
      img: "data:image/jpeg;base64,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"
    }
  ]; 

  console.log(`${mensaje}, total: ${cantidad}`); 

  return maquinas;
};

// componente principal con arrow function
const App = () => {
  const navigate = useNavigate();
  const [maquinas, setMaquinas] = useState(obtenerMaquinas());

  // bbject Destructuring
  const { nombre, tipo, descripcion } = maquinas[0];
  console.log(`Primera máquina: ${nombre}, tipo: ${tipo}, desc: ${descripcion}`);

  //array Destructuring
  const [primeraMaquina] = maquinas;
  console.log("Primera máquina con destructuring:", primeraMaquina);

  // métodos de arreglos (map, filter, find, etc.)
  const nombres = maquinas.map((m) => m.nombre);
  console.log("Nombres de máquinas:", nombres);

  // Intervalos: ejecutar algo cada 3 segundos
  useEffect(() => {
    const intervalo = setInterval(() => {
      console.log("⏱ Intervalo ejecutado cada 3 segundos");
    }, 3000);

    return () => clearInterval(intervalo); 
  }, []);

  // promesa de caraga de datos
  const cargarMaquinas = () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          {
            nombre: "Cinta de Correr",
            tipo: "Cardio",
            descripcion: "Ideal para resistencia.",
            img: "https://via.placeholder.com/150"
          }
        ]);
      }, 2000);
    });
  };

  //  promesa y async
  const obtenerNuevasMaquinas = async () => {
    const nuevas = await cargarMaquinas();
    setMaquinas([...maquinas, ...nuevas]);
  };

  return (
    <div className="container mt-4">
      <h2>Listado de Máquinas</h2>
      <button className="btn btn-primary mb-3" onClick={obtenerNuevasMaquinas}>
        Cargar nuevas máquinas
      </button>

      <div className="row">
        {maquinas.map((m, index) => (
          <div key={index} className="col-md-4 mb-3">
            <Maquina {...m} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
