import React from 'react'
import Sidebar from './sidebar';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faImages } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';


function Config() {
  return (
    
        <div className="flex">
          <Sidebar />
          <div className="flex mt-28 flex-grow justify-center">
            <div className='flex flex-wrap h-fit w-8/12 min-w-6/12 bg-[#F2F2F2] justify-center px-12 py-20'>
  
              {/*Inicio del post*/}
              <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
                <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4"></div>
                <div className='text-left'>
                  <h2 className='text-lg'>Usuario</h2>
                  <p className='text-md'>@Usuario</p>
                </div>
                <div className='w-full'>
                  <p className='text-lg'>Texto del Usuario</p>
                </div>
                <div className='w-full h-96 bg-[#724DC5] rounded-sm self-end'></div>
                <textarea className='border-2 rounded-sm w-full my-2 h-72'></textarea>
                <div className="w-full h-10 flex justify-between p-1"> 
                  <div>
                    <FontAwesomeIcon icon={faTrash} size="lg" style={{color: "#ff0000",}}/>
                  </div>
                  <div>
                    <FontAwesomeIcon icon={faImages} size="lg" style={{color: "#5D30C1",}} className='px-2'/>
                    <button type="submit"><FontAwesomeIcon icon={faPaperPlane}  size="lg" style={{color: "#5D30C1",}} className='pl-2'/></button>
                  </div>
                </div>
              </div>
              {/*Final del post*/}
  
  
              
            </div>
          </div>
        </div>
    );
  };
  


export default Config