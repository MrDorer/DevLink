import React from 'react';
import Header from '../Components/Heather';
import Footer from '../Components/Footer';
import perfil from '../Assets/perfil.png';

function Perfil() {
  return (
    <div className="mt-28 text-center">
      <Header />
      <div className="flex">
        <img
          src={perfil}
          alt="Perfil"
          className="ml-4 mt-4 mb-4 w-44 h-44 overflow-hidden float-left"
        />
        <div className="w-4/5">

    <div className="bg-white flex flex-col px-5">
      <div className="flex w-[386px] max-w-full flex-col ml-1.5 mt-[743px] mb-56 max-md:mt-52">
        <div className="flex w-[362px] max-w-full flex-col">
          <div className="text-black text-4xl leading-[155%] self-center ml-1.5">
            Jason Momoa
          </div>
          <div className="flex w-[309px] max-w-full items-start gap-0 mt-3">
            <div className="bg-violet-950 flex w-[268px] max-w-full flex-col grow shrink-0 basis-auto pt-3 pb-1.5 px-5 rounded-xl">
              <div className="text-white text-3xl leading-[206.67%] self-center">
                Edit perfil
              </div>
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-square object-cover object-center w-[41px] justify-center items-center overflow-hidden shrink-0 mt-1"
            />
          </div>
          <div className="flex w-[315px] max-w-full items-start gap-1 mt-4 max-md:justify-center">
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-square object-cover object-center w-[38px] overflow-hidden shrink-0"
            />
            <div className="flex flex-col mt-2">
              <div className="text-zinc-400 text-3xl">Followers</div>
              <img
                loading="lazy"
                srcSet="..."
                className="aspect-[124] object-cover object-center w-[124px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-2"
              />
            </div>
            <img
              loading="lazy"
              srcSet="..."
              className="aspect-square object-cover object-center w-2 fill-zinc-300 overflow-hidden self-center shrink-0 my-auto"
            />
            <div className="flex flex-col mt-2">
              <div className="text-zinc-400 text-3xl">Following</div>
              <img
                loading="lazy"
                srcSet="..."
                className="aspect-[123] object-cover object-center w-[123px] stroke-[1px] stroke-zinc-400 overflow-hidden shrink-0 mt-px"
              />
            </div>
          </div>
          <div className="text-zinc-600 text-center text-3xl leading-[116.67%] self-stretch w-full ml-1.5 mr-px mt-2.5">
            I am a highly competent programmer who masters a variety of
            technologies and programming languages, including Git, Python, Felt,
            React, JavaScript, C#, among others.
          </div>
        </div>
        <img
          loading="lazy"
          srcSet="..."
          className="aspect-[1.01] object-cover object-center w-[150px] overflow-hidden shrink-0 mt-[461px] max-md:mt-52"
        />
      </div>
    </div>


        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Perfil;
