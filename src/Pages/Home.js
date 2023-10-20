import React from 'react';
import Sidebar from '../Components/sidebar';
import { Link } from 'react-router-dom';


import { faPaperPlane } from '@fortawesome/free-regular-svg-icons';
import { faHeart } from '@fortawesome/free-regular-svg-icons';
import { faStar } from '@fortawesome/free-regular-svg-icons';
import { faBookmark } from '@fortawesome/free-regular-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment } from '@fortawesome/free-regular-svg-icons';
import Donitas from '../Assets/donitas.jpg'


const Home = () => {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex mt-28 flex-grow justify-center">
        <div className='flex flex-wrap w-7/12 min-w-6/12 bg-[#F2F2F2] justify-center p-10 '>

          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
          <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
            <img
              src="https://www.infobae.com/new-resizer/X28aHlsLoDl3i749c00aiQki6oc=/768x432/filters:format(webp):quality(85)/cloudfront-us-east-1.images.arcpublishing.com/infobae/UGGM3NC5C5CVPJ7BCNSG6ALLBE.jpg"
              className="object-cover w-full h-full rounded-full"
              alt="profile"
            />
          </div>
                <div className='text-left flex justify-between w-[88.5%] items-center'>
                  <div>
                  <h2 className='text-md'>Dorersenpai</h2>
                  <p className='text-sm'>@MrDorer</p>
                  </div>

                  <div >
                  <button><FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0066",}}/> </button>
                  <button><FontAwesomeIcon className='mx-2' icon={faStar} size="lg" style={{color: "#eeff00",}} /></button>
                  <button><FontAwesomeIcon icon={faBookmark} size="lg" style={{color: "#00ff7b",}} /></button>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='text-lg py-2'>Yo si no fuera pobre :(</p>
                </div>
                <div className='w-full h-96 bg-[#724DC5] rounded-md self-end'>
                  <img src="https://i.pinimg.com/736x/aa/62/d3/aa62d34b2fb002fd55be6c080520998d.jpg" className="object-cover w-full h-full rounded-md" alt="content"></img>
                </div>
                <div className='w-full'>
                <input className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm' placeholder='Comentar...'></input>
                <Link to="/comentar">
                  <button>
                    <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                  </button>
                </Link>
                    <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='pl-1' size="lg" style={{color: "#5D30C1",}}/></button>
                </div>
              </div>
          {/*Final del post*/}


          {/*Inicio del post 2*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
          <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
            <img
              src="https://avatars.githubusercontent.com/u/132917889?v=4"
              className="object-cover w-full h-full rounded-full"
              alt="profile"
            />
          </div>
                <div className='text-left flex justify-between w-[88.5%] items-center'>
                  <div>
                  <h2 className='text-md'>Gabriel24</h2>
                  <p className='text-sm'>@DarkShadowXx64</p>
                  </div>

                  <div >
                  <button><FontAwesomeIcon icon={faHeart} size="lg"/> </button>
                  <button><FontAwesomeIcon className='mx-2' icon={faStar} size="lg"/></button>
                  <button><FontAwesomeIcon icon={faBookmark} size="lg"/></button>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='text-lg py-2'>Ya ponganse a hacer el front</p>
                </div>
                <div className='w-full h-96 bg-black rounded-md self-end'>
                  <img src="https://i.pinimg.com/736x/b7/51/36/b75136666a5654d5f3fe1c1dd1699396.jpg" className="w-full h-full rounded-md object-contain" alt="content2"></img>
                </div>
                <div className='w-full'>
                <input className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm' placeholder='Comentar...'></input>
                <Link to="/comentar">
                  <button>
                    <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                  </button>
                </Link>
                    <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='pl-1' size="lg" style={{color: "#5D30C1",}}/></button>
                </div>
              </div>
          {/*Final del post*/}

          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
          <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
            <img
              src="https://avatars.githubusercontent.com/u/78885703?v=4"
              className="object-cover w-full h-full rounded-full"
              alt="profile"
            />
          </div>
                <div className='text-left flex justify-between w-[88.5%] items-center'>
                  <div>
                  <h2 className='text-md'>EthanIsHere</h2>
                  <p className='text-sm'>@Cana23</p>
                  </div>

                  <div >
                  <button><FontAwesomeIcon icon={faHeart} size="lg" /> </button>
                  <button><FontAwesomeIcon className='mx-2' icon={faStar} size="lg" style={{color: "#eeff00",}} /></button>
                  <button><FontAwesomeIcon icon={faBookmark} size="lg"  /></button>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='text-lg py-2'>Supraaaaaaa</p>
                </div>
                <div className='w-full h-96 bg-[#724DC5] rounded-md self-end'>
                  <img src="https://www.hgkshop.com/cdn/shop/collections/toyota-supra-mkiv-turbotarga-780x405_1400x.jpg?v=1593681769" className="object-cover w-full h-full rounded-md" alt="conten3"></img>
                </div>
                <div className='w-full'>
                <input className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm' placeholder='Comentar...'></input>
                <Link to="/comentar">
                  <button>
                    <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                  </button>
                </Link>
                    <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='pl-1' size="lg" style={{color: "#5D30C1",}}/></button>
                </div>
              </div>
          {/*Final del post*/}

          {/*Inicio del post*/}
          <div className='flex w-full bg-white mx-12 rounded-md p-7 mb-6 flex-wrap h-fit' >
          <div className="h-14 w-14 bg-[#724DC5] rounded-full mr-4">
            <img
              src={Donitas}
              className="object-cover w-full h-full rounded-full"
              alt="profile"
            />
          </div>
                <div className='text-left flex justify-between w-[88.5%] items-center'>
                  <div>
                  <h2 className='text-md'>Elizabeth CT</h2>
                  <p className='text-sm'>@elizabethct26</p>
                  </div>

                  <div >
                  <button><FontAwesomeIcon icon={faHeart} size="lg" style={{color: "#ff0066",}}/> </button>
                  <button><FontAwesomeIcon className='mx-2' icon={faStar} size="lg"  /></button>
                  <button><FontAwesomeIcon icon={faBookmark} size="lg"  /></button>
                  </div>
                </div>
                <div className='w-full'>
                  <p className='text-lg py-2'>Las donitas de la chava de la esquina son 10/10</p>
                </div>
                <div className='w-full h-96 bg-[#724DC5] rounded-md self-end'>
                  <img src={Donitas} className="object-cover w-full h-full rounded-md" alt="content4"></img>
                </div>
                <div className='w-full'>
                <input className='border-2 rounded-md w-[91%] mt-2 px-2 text-sm' placeholder='Comentar...'></input>
                <Link to="/comentar">
                  <button>
                    <FontAwesomeIcon icon={faComment} className='pl-1' size="lg" style={{ color: "#5D30C1" }} />
                  </button>
                </Link>
                    <button type="submit"> <FontAwesomeIcon icon={faPaperPlane} className='pl-1' size="lg" style={{color: "#5D30C1",}}/></button>
                </div>
              </div>
          {/*Final del post*/}
        </div>
      </div>
    </div>
  );
};

export default Home;
