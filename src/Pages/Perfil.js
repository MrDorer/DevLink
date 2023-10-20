import React, { useState } from "react";
import Header from '../Components/Heather';
import Footer from '../Components/Footer';
import perfil from '../Assets/perfil.png';
import Followers from '../Assets/Followers.png';
import configperfil from '../Assets/configperfil.png';
import crearpost from '../Assets/crearpost.png';
import Puntofoll from '../Assets/Puntofoll.png';

function Perfil() {
  const [open, setOpen] = useState(true);

  const toggleSidebar = () => {
    setOpen(!open);
  };

  return (
    <div className="mt-28 text-center">
      <Header />
      <div className="fixed">
        <div className={`flex ${open ? "flex-col" : "hidden"}`}>
          <img src={perfil} alt="Perfil" className="ml-4 mt-4 mb-4 w-[250px] h-[250px] overflow-hidden float-left" />
          <div className="">
            <div className="ml-11 text-black text-3xl text-start">
              Jason Momoa
            </div>
          </div>
        </div>
        <div>
          <a href="/config" className="ml-12 bg-violet-950 flex w-[175px] max-w-full flex-col grow shrink-0 basis-auto pt-1 pb-1.5 px-5 rounded-xl">
            <div className="text-white text-2xl leading-[206.67%] self-center">
              Edit perfil

            </div>

          </a>
        </div>
        <div>

          <div
            class="flex w-[315px] max-w-full items-start gap-1 ml-4 mt-4 max-md:justify-center max-md:ml-2.5"
          >
            <img src={Followers} alt="Followers"
              class="ml-4 aspect-square object-cover object-center w-[30px] overflow-hidden shrink-0"
            />
            <div class="flex flex-col">
              <div class="text-zinc-400 text-1xl">Followers</div>
              <img
                loading="lazy"
                srcset="..."
                class="aspect-[123] object-cover object-center w-[75px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px mb-2"
              />        </div>
            <img
              src={Puntofoll} alt="Perfil"
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
          <p className="ml-10  text-center object-cover object-center  w-[175px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px">I am a highly competent programmer who masters a variety of technologies and programming languages, including Git, Python, Felt, React, JavaScript, C#, among others.</p>

        </div>
        <img src={crearpost} alt="Followers"
          class="ml-2 object-cover object-center w-[75px] overflow-hidden shrink-0"
        />
      </div>
      <div>
        <div class="flex flex-col px-5">
          <div class="text-black text-4xl leading-[155%] self-center ml-0 w-[180px]">
            Proyects
          </div>
          <div class="self-stretch mt-7 max-md:max-w-full">
            <div class="gap-5 flex max-md:flex-col max-md:items-stretch max-md:gap-0">
              <div class="flex flex-col items-stretch w-6/12 max-md:w-full max-md:ml-0">
                <div class="flex grow flex-col mt-1 max-md:mt-12">
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.26] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch"
                  />
                  <div
                    class="text-black text-4xl leading-[155%] self-center ml-0 w-[135px]"
                  >
                    Report
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch mt-1"
                  />
                  <div class="text-black text-4xl leading-[155%] self-center -ml-2">
                    ProjectMass
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch mt-px"
                  />
                  <div
                    class="text-black text-4xl leading-[155%] self-center w-[135px] ml-2.5"
                  >
                    Sneak
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch grow mt-2.5"
                  />
                </div>
              </div>
              <div
                class="flex flex-col items-stretch w-6/12 ml-5 max-md:w-full max-md:ml-0"
              >
                <div class="flex flex-col max-md:mt-12">
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.26] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch"
                  />
                  <div
                    class="text-black text-4xl leading-[155%] self-center ml-0 w-[135px]"
                  >
                    Report
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch mt-1"
                  />
                  <div class="text-black text-4xl leading-[155%] self-center -ml-2">
                    ProjectMass
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch mt-px"
                  />
                  <div
                    class="text-black text-4xl leading-[155%] self-center w-[135px] ml-2.5"
                  >
                    Sneak
                  </div>
                  <img
                    loading="lazy"
                    srcset="..."
                    class="aspect-[1.45] object-cover object-center w-full fill-violet-700 overflow-hidden self-stretch grow mt-2.5"
                  />
                </div>
              </div>
            </div>
          </div>
          <div class="text-black text-3xl leading-[206.67%] self-center -ml-2 mt-7">
            <p> 1 2 </p>
          </div>
        </div>

      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
