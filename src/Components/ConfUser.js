import React from 'react'
import Sidebar from './sidebar';
import { faEye } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Comentarios() {
  return (
    <div className="flex">
    <Sidebar />
    <div className="flex mt-28 flex-grow justify-center">
      <div className='flex flex-wrap h-fit w-8/12 min-w-6/12 bg-[#F2F2F2] justify-center p-12'>

        {/*Inicio del post*/}
        <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >

         <div className='flex text-center w-full m-4'>
            <h2 className=' w-full text-3xl'>Configuracion</h2>
         </div>


        <div className="flex justify-between w-full items-center">
            <div>
                <h3 className="text-lg">Correo electrónico</h3>
                <p className="text-sm font-light">Actualizar información del correo</p>
            </div>
            <button className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">Cambiar</button>
        </div>

        <div className="flex justify-between w-full items-center mt-8">
            <div>
                <h3 className="text-lg">Cambiar contraseña</h3>
                <p className="text-sm font-light">Has olvidado tu contraseña?</p>
            </div>
            <button className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">Cambiar</button>
        </div>

        <div className="flex justify-between w-full items-center mt-8">
            <div>
                <h3 className="text-lg text-red-600">Desactivar tu cuenta</h3>
                <p className="text-sm font-light text-red-600">Una vez eliminada tu cuenta, se eliminan todas tus publicaciones</p>
            </div>
            <button className="border-2 px-5 py-0.5 text-sm font-light h-fit rounded-full text-red-600 border-red-600">ELIMINAR</button>
        </div>




        <div className='flex text-center w-full mt-16'>
            <h2 className=' w-full text-3xl'>Editar perfil</h2>
         </div>


         <div className="flex justify-between w-full items-center">
            <div>
                <h3 className="text-lg">Usuario de GitHub</h3>
                <p className="text-sm font-light">Editar usuario de GitHub</p>
            </div>
            <button className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">Cambiar</button>
        </div>

        <div className="flex justify-between w-full items-center mt-8">
            <div>
                <h3 className="text-lg">Cambiar descripción del perfil</h3>
                <p className="text-sm font-light">Describe tus talentos y habilidades</p>
            </div>
            <button className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">Cambiar</button>
        </div>

        <div className="flex justify-between w-full items-center mt-8">
            <div>
                <h3 className="text-lg">Cambiar ubicacion</h3>
                <p className="text-sm font-light">Elige tu nueva ubicación</p>
            </div>
            <button className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">
                Cambiar
            </button>
        </div>




        </div>
        {/*Final del post*/}
      </div>
    </div>
  </div>
  )
}

export default Comentarios




