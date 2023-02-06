import React, { useContext, useState, useEffect } from "react";
import { MovieContext } from "../context/MovieContext";
import MovieCard from "./MovieCard";
import { useNavigate } from "react-router-dom";

export default function Winner() {
  const {
    user,
    currentSel,
    favorites,
    getMovie,
    moviex,
    setMoviex,
    setSearch,
    setModal,
  } = useContext(MovieContext);
  const [actu, setActu] = useState(false);
  const navigate = useNavigate();

  console.log(moviex);
  console.log(user);

  function ganador() {
    const temp = favorites[favorites.length - 1];
    const score1 = temp[1];
    const score2 = temp[2];
    console.log(temp);
    let dif1 = score1 - currentSel.score;
    let dif2 = score2 - currentSel.score;
    if (dif1 < 0) {
      dif1 *= -1;
    }
    if (dif2 < 0) {
      dif2 *= -1;
    }
    if (dif1 < dif2) {
      return user.displayName;
    }
    if (dif2 < dif1) {
      return user.player2;
    } else {
      return "ambos";
    }
  }

  function handleOnClick() {
    setModal(false);
    setSearch(null);
    navigate("../home");
  }

  if (moviex != null) {
    return (
      <>
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="absolute inset-0 bg-gray-500 opacity-75 -z-10"></div>
          <div className="bg-white rounded-lg p-6 shadow-lg shadow-gray w-96 justify-center">
            <div className=" justify-center bg-slate-500 p-2 rounded-md">
              <img
                src={currentSel.image}
                alt={currentSel.title}
                className=" h-60 w-full"
              />
              <h2 className="text-xl bg-sky-700 text-center">
                {currentSel.title}
              </h2>
              <div className="bg-stone-800">
                <p className=" mx-4 text-gray-300 text-justify">
                  el puntaje de la pelicula es:{" "}
                  <span className="text-lg text-green-300">
                    {currentSel.score}
                  </span>
                </p>
              </div>
              <div>
                <p className=" mx-4 text-gray-300 text-justify">
                  {" "}
                  El ganador Fue{" "}
                  <span className="text-black text-lg">{ganador()}</span> que
                  ahora suma un punto, es hora de la sigueinte ronda
                </p>
              </div>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                type="button"
                onClick={handleOnClick}
              >
                siguiente ronda
              </button>
            </div>
          </div>
        </div>
      </>
    );
  }
}
