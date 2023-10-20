import React, { useState } from "react";
import Header from '../Components/Heather';
import Footer from '../Components/Footer';
import perfil from '../Assets/perfil.png';
import Followers from '../Assets/Followers.png';
import crearpost from '../Assets/crearpost.png';
import Puntofoll from '../Assets/Puntofoll.png';
import aya from '../Assets/aya.png';
import wordpress from '../Assets/wordpress.png';
import shopyfy from '../Assets/shopify.png';
import nasa from '../Assets/nasa.png';
import portafolio from '../Assets/portafolio.png';
import softshop from '../Assets/softshop.png';
import githup from '../Assets/githup.png';
import pagwong from '../Assets/pagwong.png';

function Perfil() {

  const [array, setArray] = useState([{titulo: 'WordPress', imagen:wordpress}, {titulo: 'Shopyfy', imagen:shopyfy}, {titulo:'Nasa', imagen: nasa},{titulo: 'WordPress', imagen:wordpress}, {titulo: 'Shopyfy', imagen:shopyfy}, {titulo:'Nasa', imagen: nasa}])
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <>
      <Header />
      <div className="mt-28 text-center flex w-full justify-center gap-10">
        {/* perfil sidebar */}
        <div className="flex self-start mr-24">
          <div className="">
            <div className={`flex ${open ? "flex-col" : "hidden"}`}>
              <img
                src={perfil}
                alt="Perfil"
                className="ml-4 mt-4 mb-4 w-[250px] h-[250px] overflow-hidden float-left"
              />
              <div className="">
                <div className="ml-11 text-black text-3xl text-start">
                  Jason Momoa
                </div>
              </div>
            </div>
            <div>
              <a
                href="/config"
                className="ml-12 bg-violet-950 flex w-[175px] max-w-full flex-col grow shrink-0 basis-auto pt-1 pb-1.5 px-5 rounded-xl"
              >
                <div className="text-white text-2xl leading-[206.67%] self-center">
                  Edit perfil
                </div>
              </a>
            </div>
            <div>
              <div class="flex w-[315px] max-w-full items-start gap-1 ml-4 mt-4 max-md:justify-center max-md:ml-2.5">
                <img
                  src={Followers}
                  alt="Followers"
                  class="ml-4 aspect-square object-cover object-center w-[30px] overflow-hidden shrink-0"
                />
                <div class="flex flex-col">
                  <div class="text-zinc-400 text-1xl">Followers</div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[123] object-cover object-center w-[75px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px mb-2"
                  />
                </div>
                <img
                  src={Puntofoll}
                  alt="Perfil"
                  class="aspect-square object-cover object-center w-2 fill-zinc-300 overflow-hidden self-center shrink-0 my-auto"
                />
                <div class="flex flex-col">
                  <div class="text-zinc-400 text-1xl">Following</div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[123] object-cover object-center w-[75px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px"
                  />
                </div>
              </div>
              <p className="ml-10 text-center object-cover object-center w-[175px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px">
                I am a highly competent programmer who masters a variety of technologies and programming languages, including Git, Python, Felt, React, JavaScript, C#, among others.
              </p>
            </div>
            <img
              src={crearpost}
              alt="Followers"
              class="ml-2 object-cover object-center w-[75px] overflow-hidden shrink-0"
            />
          </div>
        </div>

        {/* Imagenes */}
        <div class="flex flex-col px-5">
          <div class="text-black text-4xl leading-[155%] self-center ml-0 w-[180px]">
            Proyects
          </div>
          <div>
            <div class=" grid gap-10 my-10 w-full grid-flow-row grid-cols-2">


              {
                array.map((element, index) => {
                  return (
                    <div>
                      <h2 className=" text-3xl">{element.titulo}</h2>
                      <img src={element.imagen} alt="Perfil" class="image-aspect" />

                    </div>
                    
                  )
                })
              }

            </div>
          </div>
          <div class="text-black text-3xl leading-[206.67%] self-center -ml-2 mt-7">
            <p> 1 2 </p>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Perfil;
