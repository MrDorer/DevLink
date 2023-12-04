import React, { useEffect, useState } from 'react';
import Sidebar from '../Components/sidebar';
import UpdateEmailModal from './UpdateEmailModal';
import ChangePasswordModal from './ChangePasswordModal';
import DeactivateAccountModal from './DeactivateAccountModal';
import EditGitHubUsernameModal from './EditGitHubUsernameModal';
import EditProfileDescriptionModal from './EditProfileDescriptionModal';
import EditProfileLocationModal from './EditProfileLocationModal';
import UploadProfileImageModal from './UploadProfileImageModal';
import Github from "../Assets/github.svg"

const CLIENT_ID = 'eb65046c0d5c4f4b9c06'

function Comentarios() {

    function loginGH(){
        window.location.assign("https://github.com/login/oauth/authorize?client_id=" + CLIENT_ID + "&scope=user:email")
      }


    useEffect( () => {
        sessionStorage.setItem("loggedIn", true)
    },[])

    const [isEmailModalOpen, setIsEmailModalOpen] = useState(false);
    const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
    const [isDeactivateModalOpen, setIsDeactivateModalOpen] = useState(false);
    const [isGitHubUsernameModalOpen, setIsGitHubUsernameModalOpen] = useState(false);
    const [isProfileDescriptionModalOpen, setIsProfileDescriptionModalOpen] = useState(false);
    const [isProfileLocationModalOpen, setIsProfileLocationModalOpen] = useState(false);
    const [isProfileImageModalOpen, setIsProfileImageModalOpen] = useState(false);

    const handleOpenEmailModal = () => setIsEmailModalOpen(true);
    const handleCloseEmailModal = () => setIsEmailModalOpen(false);

    const handleOpenPasswordModal = () => setIsPasswordModalOpen(true);
    const handleClosePasswordModal = () => setIsPasswordModalOpen(false);

    const handleOpenDeactivateModal = () => setIsDeactivateModalOpen(true);
    const handleCloseDeactivateModal = () => setIsDeactivateModalOpen(false);

    const handleOpenGitHubUsernameModal = () => setIsGitHubUsernameModalOpen(true);
    const handleCloseGitHubUsernameModal = () => setIsGitHubUsernameModalOpen(false);

    const handleOpenProfileDescriptionModal = () => setIsProfileDescriptionModalOpen(true);
    const handleCloseProfileDescriptionModal = () => setIsProfileDescriptionModalOpen(false);

    const handleOpenProfileLocationModal = () => setIsProfileLocationModalOpen(true);
    const handleCloseProfileLocationModal = () => setIsProfileLocationModalOpen(false);

    const handleOpenProfileImageModal = () => setIsProfileImageModalOpen(true);
    const handleCloseProfileImageModal = () => setIsProfileImageModalOpen(false);

    return (
        <div className="flex bg-[#F2F2F2]">
            <Sidebar />
            <div className="flex mt-28 flex-grow ml-20 justify-center">
                <div className='flex flex-wrap h-fit w-8/12 min-w-6/12  justify-center p-12'>

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
                            <button
                                onClick={handleOpenEmailModal}
                                className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]"
                            >
                                Cambiar
                            </button>
                        </div>
                        <UpdateEmailModal isOpen={isEmailModalOpen} onClose={handleCloseEmailModal} />

                        <div className="flex justify-between w-full items-center mt-8">
                            <div>
                                <h3 className="text-lg">Cambiar contraseña</h3>
                                <p className="text-sm font-light">Has olvidado tu contraseña?</p>
                            </div>
                            <button onClick={handleOpenPasswordModal}
                                className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]">Cambiar</button>
                        </div>
                        <ChangePasswordModal isOpen={isPasswordModalOpen} onClose={handleClosePasswordModal}/>
                        
                        <div className="flex justify-between w-full items-center mt-8">
                            <div>
                                <h3 className="text-lg text-red-600">Desactivar tu cuenta</h3>
                                <p className="text-sm font-light text-red-600">Una vez eliminada tu cuenta, se eliminan todas tus publicaciones</p>
                            </div>
                            <button onClick={handleOpenDeactivateModal} className="border-2 px-5 py-0.5 text-sm font-light h-fit rounded-full text-red-600 border-red-600">ELIMINAR</button>
                        </div>
                        <DeactivateAccountModal isOpen={isDeactivateModalOpen} onClose={handleCloseDeactivateModal} />

                        <div className='flex text-center w-full mt-16'>
                            <h2 className=' w-full text-3xl'>Editar perfil</h2>
                        </div>


                        <div className="flex justify-between w-full items-center">
                            <div>
                                <h3 className="text-lg">Usuario de GitHub</h3>
                                <p className="text-sm font-light">Editar usuario de GitHub</p>
                            </div>
                            <button
                                onClick={loginGH} 
                                className="border-2 px-7 py-0.5 text-sm font-light h-fit rounded-full bg-black border-slate-300">
                                    <img src={Github} className="mx-2"></img>
                            </button>

                        </div>
                        <EditGitHubUsernameModal isOpen={isGitHubUsernameModalOpen} onClose={handleCloseGitHubUsernameModal} />

                        <div className="flex justify-between w-full items-center mt-8">
                            <div>
                                <h3 className="text-lg">Cambiar descripción del perfil</h3>
                                <p className="text-sm font-light">Describe tus talentos y habilidades</p>
                            </div>
                            <button
                                onClick={handleOpenProfileDescriptionModal}
                                className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]"
                            >
                                Cambiar
                            </button>
                        </div>
                        <EditProfileDescriptionModal isOpen={isProfileDescriptionModalOpen} onClose={handleCloseProfileDescriptionModal} />

                        <div className="flex justify-between w-full items-center mt-8">
                            <div>
                                <h3 className="text-lg">Cambiar ubicacion</h3>
                                <p className="text-sm font-light">Elige tu nueva ubicación</p>
                            </div>
                            <button
                                onClick={handleOpenProfileLocationModal}
                                className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]"
                            >
                                Cambiar
                            </button>
                        </div>
                        <EditProfileLocationModal isOpen={isProfileLocationModalOpen} onClose={handleCloseProfileLocationModal} />

                        {/* Agregar el componente para subir imagen */}
                        <div className="flex justify-between w-full items-center mt-8">
                            <div>
                                <h3 className="text-lg">Cambiar imagen de perfil</h3>
                                <p className="text-sm font-light">Selecciona tu imagen de perfil</p>
                            </div>
                            <button
                                onClick={handleOpenProfileImageModal}
                                className="border-2 px-6 py-0.5 text-sm font-light h-fit rounded-full text-[#351778] border-[#351778]"
                            >
                                Cambiar
                            </button>
                        </div>
                        <UploadProfileImageModal isOpen={isProfileImageModalOpen} onClose={handleCloseProfileImageModal} />

                    </div>
                    {/*Final del post*/}
                </div>
            </div>
        </div>
    )
}

export default Comentarios;


