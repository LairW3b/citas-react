import { useState, useEffect } from "react"
import Formulario from "./components/Formulario"
import Header from "./components/Header"
import ListaPacientes from "./components/ListaPacientes"


function App() {
  const [pacientes, setPacientes] = useState([])//este arreglo de pacientes hay que agrgarle objetos de pacientes 

  //genero un estado para el objeto paciente, este se inicializa como objeto ya que es lo que recibira
  const [paciente, setPaciente] = useState({})

  //se carga cuando el componente este listo
  //El orden en el que coloques los effect se van ejecutando
  useEffect(()=>{
    const obtenerLS = () => {
      const pacientesLS = JSON.parse(localStorage.getItem('pacientes')) ?? []
      setPacientes(pacientesLS)      
    }

    obtenerLS()
  },[])
  //En local storage no se pueden guardar arreglos solo string
  useEffect(() => {
    localStorage.setItem('pacientes', JSON.stringify(pacientes))
  }, [pacientes])//cada vez que haya un cambio en pacientes ejecute mi códigos

  const eliminarPaciente = (id) => {
    console.log('Eliminando paciente ', id)
    const pacientesActualizados = pacientes.filter(paciente => paciente.id !== id)
    setPacientes(pacientesActualizados)
  }

  return (
    <div className="container mx-auto mt-5">
      <Header 
        numeros={ 1 }
      /> 
      <div className="mt-12 md:flex">
        <Formulario
          pacientes={pacientes}
          setPacientes={setPacientes}
          paciente={paciente}
          setPaciente={setPaciente}
        />
        <ListaPacientes
          pacientes={pacientes}
          setPaciente={setPaciente}
          eliminarPaciente={eliminarPaciente}
        />
      </div>
    </div>
  )
}
//yarn create vite
//yarn dev
//yarn add

export default App
