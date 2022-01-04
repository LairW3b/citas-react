import React from 'react'
import Paciente from './Paciente'
import { useEffect } from 'react'

const ListaPacientes = ({ pacientes, setPaciente, eliminarPaciente }) => {
  //verifico si estoy leyendo pacientes
  //console.log(pacientes)
  useEffect(() => {
    if(pacientes > 0){
      console.log('nuevo paciente')
    }
  }, [pacientes])

  return (
    <div className="md:w-1/2 lg:w-3/5 md:h-screen overflow-y-scroll">
      {pacientes.length === 0 ?
        <>
          <h2 className="font-black text-3xl text-center">
            No hay Pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Esta clínica se va {''}
            <span className='text-indigo-600 font-bold'>A LA QUIEBRA!!!</span>
          </p>
        </> :
        <>
          <h2 className="font-black text-3xl text-center">
            Listado de Pacientes
          </h2>
          <p className="text-xl mt-5 mb-10 text-center">
            Administra tus {''}
            <span className='text-indigo-600 font-bold'>Pacientes y Citas</span>
          </p>

          {/* //La opcion mas aceptada es un map() para iterar */}
          {/** le hago llegar por props los pacinetes, con un map itero sobre ellos
            *  y se los hago llegar a mi componente paciente.
            */}
          {pacientes.map((paciente) => (
            //usar el index como id le cuesta mucho en el performance a react al reescribirse
            <Paciente
              key={paciente.id}
              paciente={paciente}
              setPaciente={setPaciente}//tengo que pasarle desde app hasta paciente
              eliminarPaciente={eliminarPaciente}
            />
          ))}
        </>
      }
    </div>
  )
}

export default ListaPacientes
