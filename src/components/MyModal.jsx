import React, { useContext, useState } from "react";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import ReactDOM from "react-dom/client";
import Players from "./Players";
import {useNavigate} from 'react-router-dom'

export default function MyModal() {
  const { modal, setModal, user, currentSel, favorites, setFavorites, getMovie } =
    useContext(MovieContext);
  const [score1, setScore1] = useState('');
  const [score2, setScore2] = useState('');
  const navigate=useNavigate();
  console.log(score1);
  console.log("renderizando mymodal");
  console.log(currentSel);
  console.log(favorites);


  function ganador() {
    let dif1 = score1 - currentSel.score;
    let dif2 = score2 - currentSel.score;
    if (dif1 < 0) {
      dif1 *= -1;
    }
    if (dif2 < 0) {
      dif2 *= -1;
    }
    if (dif1 < dif2) {
      return [1, 0];
    }
    if (dif2 < dif1) {
      return [0, 1];
    } else {
      return [1, 1];
    }
  }

  function handleOnClick(event) {
    event.preventDefault();
    getMovie();
    console.log(event);
    if (favorites.length < 1 || favorites == null) {
      let object = [];
      let outputarray = [];
      const gana = ganador();
      outputarray = [currentSel.id, ...gana];

      console.log(outputarray);
      object.push(outputarray);
      console.log(object);
      setFavorites(object);
      navigate("/winner");
    }
    if (favorites.length > 0) {
      let flag1 = false;
      for (let x = 0; x < favorites.length; x++) {
        let temp = favorites[x];
        if (temp.includes(currentSel.id)) {
          flag1 = true;
        }
      }
      if (flag1 == false) {
        let object = favorites;
        let outputarray = [];
        const gana = ganador();
        outputarray = [currentSel.id, ...gana];

        console.log(outputarray);
        object.push(outputarray);
        console.log(object);
        setFavorites(object);
        navigate("/winner");
      } else {
        // if(favorites.length>=1){
          
        // }
        alert("ya se selecciono esa pelicula antes");
      }
    }
    setScore1(0);
    setScore2(0);
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500 opacity-75 -z-10"></div>
      <div className="bg-white rounded-lg p-6 shadow-lg shadow-gray">
        <h1 className="text-lg">Elejiste {currentSel.title}</h1>
        <img
          src={currentSel.image}
          alt={currentSel.title}
          className="w-full h-48 rounded-lg object-cover"
        />
        <p className="text-gray-700">lanzamiento {currentSel.launchDate}</p>
        <form onSubmit={handleOnClick}>
          <p>Puntajes de cada jugador</p>
          <input
            type="text"
            className="block mx-1 my-3 ring-slate-300 ring-2 rounded-md"
            placeholder={user.displayName}
            name="score1"
            id="score1"
            onChange={(e) => {
              if (e.target.value < 10) {
                setScore1(e.target.value);
              }
            }}
            value={score1}
          />
          <input
            type="text"
            className="block mx-1 my-3 ring-slate-300 ring-2 rounded-md"
            placeholder={user.player2}
            name="score2"
            id="score2"
            onChange={(e) => {
              if (e.target.value < 10) {
                setScore2(e.target.value);
              }
            }}
            value={score2}
          />

          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600"
            onClick={() => setModal(false)}
          >
            Cerrar
          </button>
          <button
            className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 mx-2"
            type="submit"
          >
            obtener resultado
          </button>
        </form>
      </div>
    </div>
  );
}
