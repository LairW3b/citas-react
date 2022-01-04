import {useState, useEffect} from 'react'
import Error from './Error'

const Formulario = ({pacientes, setPacientes, paciente, setPaciente}) => {
  //El state estara disponible solo para este componente aunque hay formas de pasarlo a otros
  const [nombre, setNombre] = useState('')  
  const [propietario, setPropietario] = useState('')
  const [email, setEmail] = useState('')
  const [fecha, setFecha] = useState('')
  const [sintomas, setSintomas] = useState('')
  const [error, setError] = useState(false)

  useEffect(() => {
    if(Object.keys(paciente).length > 0 ) {//Object.keys() sirve para ver si un objeto esta vacio
      setNombre(paciente.nombre)
      setPropietario(paciente.propietario)
      setEmail(paciente.email)
      setFecha(paciente.fecha)
      setSintomas(paciente.sintomas)
    }
  },[paciente])

  // useEffect(() => {
    
  // }, [aquí va revisar el valor o dependencia que va a cambiar])
  /**
   * Declara tus state en orden no es obligatorio pero te ayudara   
   */

  const generarId = () => {
    const random = Math.random().toString(36).substring(2)
    const fecha = Date.now().toString(36)

    return random + fecha
  }

  //no crear una funcion para algo que puedas manejar con una linea pero si tenes multiples
  //lineas crea una función
  const handelSubmit = (e) => {
    e.preventDefault()
    //validación del formulario
    if([nombre, propietario, email, fecha, sintomas].includes('')){
      console.log('hay elmentos vacios')
      setError(true)
    }else {
      setError(false)
    }

    //Objeto paciente
    //gracias a las nuevas caracteristicas: si la llave lleva el mismo nombre que el valor
    //no es necesario poner llave valor 
    const objetoPaciente = {
      nombre, 
      propietario, 
      email, 
      fecha, 
      sintomas
    }
    
    if(paciente.id){
      //console.log('Editando')
      objetoPaciente.id = paciente.id
      console.log(objetoPaciente)

      const pacientesActualizados = pacientes.map( p => p.id === paciente.id ? objetoPaciente : p)
      
      setPacientes(pacientesActualizados)
      setPaciente({})

    }else{
      //console.log('nuevo registro')
      /**Mediante la función setPacientes agrego pacientes a mi arreglo que se encuentra en props
       * y utilizo el spred operator para no borrar los paientes que ya estan agrgados. 
       */
      objetoPaciente.id = generarId()
      setPacientes([...pacientes, objetoPaciente])
    }
    // console.log(objetoPaciente)

    
    /**
     * Cunado requerimos una colección de lo que vamos agrgando tomamos lo que ya 
     * existe en el state y lo agregamos al arreglo que ya hemos creado en vez de sobre 
     * escribir setPacientes(nombre)
    */

    //Resetear formulario
    setNombre('')
    setPropietario('')
    setEmail('')
    setFecha('')
    setSintomas('')
  }

  
  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className="font-black text-3xl text-center">
        Seguimiento Pacientes   
      </h2> 

      <p className="text-lg mt-5 text-center mb-10">
        Añade Pacientes y {''}
        <span className="text-indigo-600 font-bold">
          Administralos
        </span>
      </p>

      <form 
        onSubmit={handelSubmit}//esta función puede ser llamada como quieras pero se utiliza micho el handle
        className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        { error && <Error mensaje='Todos los campos son obligatorios'/> }
        {/** si error es true entoces muestra */}
        {/** con los parentesis podemos divir en varias lineas */} 

        <div className='mb-5'>
          <label 
            htmlFor="mascota" 
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre Mascota
          </label>
          <input 
            id="mascota" 
            type="text" 
            placeholder='Nombre de la Mascota' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={nombre}
            onChange={(e)=> setNombre(e.target.value)}//registrando un evento
            /**
             * con onChange (que es un evento de react) registro el evento y uso una funcion de callback 
             * para registrar el evento el cual lo asigno a la variable de estado
             * mediante setNombre.
            */
          />
        </div>

        <div className='mb-5'>
          <label 
            htmlFor="propietario" 
            className='block text-gray-700 uppercase font-bold'
          >
            Nombre Propietario
          </label>
          <input 
            id="propietario" 
            type="text" 
            placeholder='Nombre del Propietario' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={propietario}
            onChange={(e)=> setPropietario(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label 
            htmlFor="email" 
            className='block text-gray-700 uppercase font-bold'
          >
            Email
          </label>
          <input 
            id="email" 
            type="text" 
            placeholder='Email Contacto' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label 
            htmlFor="alta" 
            className='block text-gray-700 uppercase font-bold'
          >
            Alta
          </label>
          <input 
            id="alta" 
            type="date" 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={fecha}
            onChange={(e)=>setFecha(e.target.value)}
          />
        </div>

        <div className='mb-5'>
          <label 
           htmlFor="sintomas" 
           className='block text-gray-700 uppercase font-bold'
          >
            Síntomas
          </label>
          <textarea 
            id="sintomas" 
            placeholder='Describe los Síntomas' 
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md' 
            value={sintomas}
            onChange={(e)=>setSintomas(e.target.value)}
          />
        </div>

        <input 
          type="submit" 
          className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 cursor-pointer transition-colors' 
          value={ paciente.id ? 'Editar Paciente' : 'Agregar Paciente' }
        />
      </form>
    </div>
  )
}

export default Formulario
