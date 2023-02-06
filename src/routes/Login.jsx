import React, { useContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";
import { auth } from "../firebase";
import { setUserId } from "firebase/analytics";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import { Navigate } from "react-router-dom";

function Login() {
  const {
    user,
    addUser,
    loginState,
    updLoginState,
    handleUserStateChange,
    googleSigner,
    isLoged,
  } = useContext(MovieContext);
  console.log("renderizo login");

  async function handleOnClick() {
    await googleSigner();
  }

  if (loginState === 4) {
    console.log(loginState);

    return (
      <div>
        <button onClick={handleOnClick}>Iniciar sesion con Google</button>
      </div>
    );
  } else {
    return <Navigate to="/home" />;
  }
}

export default Login;
