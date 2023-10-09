import React from "react";
import HeaderVisit from "../Components/HeaderVisit";
import MostPopularList from "../Components/MostPopularList";
import PopularPostsVisit from "../Components/PopularPostsVisit";

const HomeVisit = () => {
    return(
        <div className="min-h-screen flex flex-col">
      {/* Header */}
      <HeaderVisit />

      {/* Contenido principal */}
      <main className="flex flex-1">
        {/* Lista de usuarios a la izquierda */}
        <div className="w-1/3 p-4">
          <MostPopularList />
        </div>

        {/* Posts a la derecha */}
        <div className="w-2/3 p-4">
          <PopularPostsVisit />
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
    );
};

export default HomeVisit;