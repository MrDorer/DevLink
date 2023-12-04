import React, { useEffect, useState } from "react";
import Sidebar from "../Components/sidebar";
import NewsApi from "../Components/NewsApi";
import PostForm from "../Components/PostForm"
import Post from "../Components/Post"

const Home = () => {

  useEffect(() => {
    const user = JSON.parse(sessionStorage.getItem("user"));
    setDatos({ ...datos, id_usuario: user.id });
  }, []);

  const [datos, setDatos] = useState({
    titulo: "",
    contenido: "",
    likes_publicacion: 0,
    img: "",
  });

  return (
    <div className="flex flex-wrap">
      <Sidebar />
      <div className="flex mt-0 flex-grow justify-center">
        <div className="p-10 w-full ml-36 mt-20">
          <PostForm userId={datos.id_usuario}/>
          <Post/>
        </div>
          <NewsApi/>
      </div>
    </div>
  );
};

export default Home;