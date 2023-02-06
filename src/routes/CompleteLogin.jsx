import { MovieContext, MovieProvider } from "../context/MovieContext";
import { Navigate } from "react-router-dom";
import { useContext, useState } from "react";
import { updateUser, existUsername } from "../firebase";

export default function CompleteLogin() {
  const { user, addUser, loginState, updLoginState } = useContext(MovieContext);
  const [input, setInput] = useState("");
  console.log("renderizo cl");
  console.log(user);

  function handleInput(e) {
    const text = e.target.value;
    setInput(text);
  }

  async function handleOnClick(e) {
    e.preventDefault();
   const compr= await existUsername(input);
   if (compr===null){
    console.log(input);
    let objeto = user;
    objeto.userName = input;
    objeto.processComplete = true;
    console.log(objeto);
    await updateUser(objeto);
    addUser(objeto);
    if(loginState!=2){
        updLoginState(2);
    }
}else {alert("este usuario ya existe")}
  }

  if (loginState === 3) {
    return (
      <>
        <form>
          <input onChange={handleInput} type="text"></input>
          <button type="submit" onClick={handleOnClick}>
            guardar
          </button>
        </form>
        {/* <div>Aca se completara el registro del usuario {user.displayName}</div> */}
      </>
    );
  } else {
    return <Navigate to="/" />;
  }
}
