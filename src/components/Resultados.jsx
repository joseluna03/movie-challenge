import React, { useContext } from "react";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import MovieCard from "./MovieCard";

export default function Resultados() {
  const { search, user } = useContext(MovieContext);

  const player1 = user.displayName;
  const player2 = user.player2;

  if (Array.isArray(search)) {
    return (
      <div className="md:grid md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {search.map((movie) => (
          <MovieCard movie={movie} key={movie.id} />
        ))}
      </div>
    );
  }else{
    return (
      <div className="place-items-center m-7">
      <h1 className="text-center text-2xl text-gray-500 my-4">Reglas del juego</h1>
      <p className="text-justify text-lg text-gray-500">El jugador 1 en este caso {player1} debera elegir una pelicula y asignar primero la puntuacion que espera tenga la pelicula seleccionada.
      <br></br>
      <br></br>
      posteriormente el jugador 2 en este caso {player2} debera tambien asignar el puntaje que este espera que tenga la pelicula.
      <br></br>
      <br></br>
      El jugador que mas se acerque al puntaje real sera el ganador.
      <br></br>
      <br></br>
      Luego sera el turno del jugador 2 para elegir la pelicula y asignar el puntaje de primero.
      <br></br>
      <br></br>
      se juegan 10 rondas donde cada uno elije 5 peliculas.
      <br></br>
      <br></br>
      Se permite el empate.</p>
    </div>)
  }
}
