import React, { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import { updateUser } from "../firebase";

export default function Player2() {
  const { user, addUser, loginState, updLoginState } = useContext(MovieContext);
  console.log("renderizando player2");

  const [play2, setPlay2] = useState("");
  const [guardado, setGuardado] = useState(false);

  async function handleonclick(event) {
    event.preventDefault();
    console.log("boton presionado");
    let objeto = user;
    objeto.player2 = play2;
    await updateUser(objeto);
    addUser(objeto);
    setGuardado(true);
  }

  function handleInput(e) {
    const text = e.target.value;
    setPlay2(text);
  }

  if (loginState == 2 && user.player2 == null) {
    return (
      <div>
        <form>
          <label htmlFor="player2">
            Introduzca el nombre del segundo jugador.
          </label>
          <input
            type="text"
            onChange={handleInput}
            name="player2"
            id="player2"
          />
          <button type="submit" onClick={handleonclick}>
            guardar
          </button>
        </form>
      </div>
    );
  } else {
    return <Navigate to="/" />;
  }
}
