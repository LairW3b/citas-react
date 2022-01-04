import React from 'react'
//le estoy pasando las props mediante la palabra reservada props en la funcion
//Tambien puedo realizar destructuring
const Header = () => {
  return (
    <div>
      <h1 className='font-black text-5xl text-center md:w-2/3 mx-auto'>
        Seguimiento Pacientes{" "}<span className="text-indigo-600">Veterinaria</span>
      </h1>
    </div>
  )
}

export default Header
