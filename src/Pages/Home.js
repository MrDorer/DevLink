import React from 'react';
import Sidebar from '../Components/sidebar';

const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex flex-grow justify-center">
        <div className='flex flex-wrap w-8/12 min-w-6/12 bg-[#F2F2F2] justify-center p-12'>

          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap' style={{ height: '26rem' }}>
            <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4"></div>
            <div className='text-left'>
              <h2 className='text-lg'>Usuario</h2>
              <p className='text-md'>@Usuario</p>
            </div>
            <div className='w-full'>
              <p className='text-lg'>Texto del Usuario</p>
            </div>
            <div className='w-full h-[68%] bg-[#724DC5] rounded-sm self-end'></div>
          </div>
          {/*Final del post*/}


          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap' style={{ height: '26rem' }}>
            <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4"></div>
            <div className='text-left'>
              <h2 className='text-lg'>Usuario</h2>
              <p className='text-md'>@Usuario</p>
            </div>
            <div className='w-full'>
              <p className='text-lg'>Texto del Usuario</p>
            </div>
            <div className='w-full h-[68%] bg-[#724DC5] rounded-sm self-end'></div>
          </div>
          {/*Final del post*/}


          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap' style={{ height: '26rem' }}>
            <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4"></div>
            <div className='text-left'>
              <h2 className='text-lg'>Usuario</h2>
              <p className='text-md'>@Usuario</p>
            </div>
            <div className='w-full'>
              <p className='text-lg'>Texto del Usuario</p>
            </div>
            <div className='w-full h-[68%] bg-[#724DC5] rounded-sm self-end'></div>
          </div>
          {/*Final del post*/}
        </div>
      </div>
    </div>
  );
};

export default Home;
