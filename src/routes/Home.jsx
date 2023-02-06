import { MovieContext, MovieProvider } from "../context/MovieContext";
import { Navigate } from "react-router-dom";
import { useContext, Component } from "react";
import Cuerpo from "../components/Cuerpo";
import Player2 from "../components/Player2";

export default function Home() {
  const { user, addUser, loginState, updLoginState } = useContext(MovieContext);
  console.log("renderizo home");
  console.log(loginState);

  if (loginState === 4) {
    return <Navigate to="/login" />;
  }
  if (loginState === 3) {
    return <Navigate to="/completelogin" />;
  }
  if (loginState === 0) {
    return <Navigate to="/" />;
  }

  if (loginState === 2 && user.player2 != null) {
    return (
      <>
        <div className="container mx-auto">
          <Cuerpo />
        </div>
      </>
    );
  } else {
    if (loginState == 2 && user.player2 == null) {
      return <Player2 />;
    }
  }
}
