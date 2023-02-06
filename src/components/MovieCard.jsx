import React, { useContext } from "react";

import { MovieContext, MovieProvider } from "../context/MovieContext";
import MyModal from "./MyModal";


export default function MovieCard(props) {
  const {
    modal,
    setModal,
    currentSel,
    setCurrentSel,
    setContenido
  } = useContext(MovieContext);
  const { movie } = props;
  //   const { key}= props
  const image = "https://image.tmdb.org/t/p/w500" + movie.poster_path;
  const title = movie.title;

  function temp3(){
    try {
      let output=movie.overview.slice(0, 200) + "...";
      return  output;
    } catch (error) {
      return "nd";
    }
      ;
    
  }

  const score = movie.vote_average;
  function temp2(){
      
      try {
        let output=movie.release_date.slice(0, 4);
        return  output;
    } catch (error) {
    return "nd";
    }
      ;
    
  }
  
  const description=temp3();
  const launchDate=temp2();
  
  const id= movie.id;
  const object = {
    title: title,
    description: description,
    image: image,
    score: score,
    launchDate: launchDate,
    id: id,
  };

  function handleOnClick() {
    console.log("hiciste click");
    setCurrentSel(object);
    setModal(true);
  }

  return (
    <div
      onClick={handleOnClick}
      className="bg-gray-300 p-6 rounded-lg shadow-xl max-sm:m-4 hover:ring-4 m-2"
    >
      <img
        src={image}
        alt={title}
        className="w-full h-48 rounded-lg object-cover"
      />
      <h2 className="text-lg font-medium mt-4 bg-gradient-to-r from-indigo-500 p-2 ">{title}</h2>
      <p className="text-gray-600 mt-2 text-sm">{description}</p>
      <div className="flex items-center mt-4 bg-stone-400 p-2">
        <span className="text-md font-medium mr-2">Lanzamiento:</span>
        <span className="text-lg font-medium ">{launchDate}</span>
      </div>
    </div>
  );
}
