import React, { useContext } from "react";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import { AiOutlineUser } from "react-icons/ai";

export default function Players() {
  const { user, addUser, favorites } = useContext(MovieContext);
  const player1 = user.displayName;
  const player2 = user.player2;
  let points1=0;
  let points2=0;
  

  function actpoint(){
    
    for(let x=0; x<favorites.length; x++){
      points1+=favorites[x][1];
      points2+=favorites[x][2];
    }
    
  }
  actpoint();

  return (
    <div className="m-2 max-sm:justify-center">
      <div className="grid-cols-3 gap-2 flex  justify-end mx-2 max-md:justify-center">
        <div className="mt-1 text-xl">
          <AiOutlineUser />
          <AiOutlineUser />
        </div>
        <div>
          <span className="block rounded-md ">{player1}</span>
          <span className="block rounded-md">{player2}</span>
        </div>
      <div>
       
        <span className="block bg-sky-900 shadow-sm rounded-md px-1 border-white">
            {points1}
          </span>
        <span className="block bg-sky-900 shadow-sm rounded-md px-1 border-white">
          {points2}
        </span>
      </div>
      </div>
    </div>
  );
}
