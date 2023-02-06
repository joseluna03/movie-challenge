import { MovieContext, MovieProvider } from "./context/MovieContext";
import { Navigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
} from "firebase/auth";

function App() {
  const {
    user,
    addUser,
    loginState,
    updLoginState,
    handleUserStateChange,
    googleSigner,
    isLoged,
  } = useContext(MovieContext);
  console.log("renderizo app");
  console.log(loginState);
  console.log(user);

  (async function () {
    await isLoged();
  })();

  if (loginState === 4) {
    return <Navigate to="/login" />;
  }
  if (loginState === 3) {
    return <Navigate to="/CompleteLogin" />;
  }

  if (loginState === 2) {
    return <Navigate to="/home" />;
  }
  return <div className="animate-pulse">
cargando...</div>;
}

export default App;
