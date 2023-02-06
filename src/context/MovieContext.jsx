import { createContext, useState, useEffect } from "react";
import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signInWithRedirect,
  signOut,
} from "firebase/auth";
import { auth, userExists, registerNewUser, getUserInfo } from "../firebase";
import { setUserId } from "firebase/analytics";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

export const MovieContext = createContext();

export function MovieProvider({ children }) {
  const [moviex, setMoviex]=useState(null);
  const [currentSel, setCurrentSel] = useState({});
  const [favorites, setFavorites]=useState([]);
  const [modal, setModal] = useState(false);
  const [user, setUser] = useState(null);
  const [players, setPlayers] = useState([]);
  const [search, setSearch] = useState("");
  const [loginState, setLoginState] = useState(0);
  // state indica el estado del loguin
  // 0 inicializado
  // 1 loading
  // 2 login completo
  // 3 login pero sin registro
  // 4 no hay nadie logueado

  const ApiKey = "2f99969f48d55d1234a34320df1442d3"; //key de tmdb api
  const searchMovies = (query) => {
    // Realizar la solicitud a la API de TMDB usando axios
    axios
      .get(
        `https://api.themoviedb.org/3/search/movie?api_key=${ApiKey}&language=es&query=${query}&page=1&include_adult=false`
      )
      .then((response) => {
        // Actualizar el estado con los resultados de la búsqueda
        setSearch(response.data.results);
      });
  };
async function getMovie () {
    const id=currentSel.id
    // Realizar la solicitud a la API de TMDB usando axios
 await axios
      .get(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${ApiKey}&language=es`
      )
      .then((response) => {
        // Actualizar el estado con los resultados de la búsqueda
console.log(response.data);
const data= response.data;

        setMoviex (data);
        console.log(moviex);
      });
  
  };

  function addUser(user) {
    // funcion para modificar el estado User
    setUser(user);
  }

  function updLoginState(login) {
    setLoginState(login);
  }

  async function handleUserStateChange(usutemp) {
    if (usutemp) {
      const isRegistered = await userExists(usutemp.uid);
      console.log(usutemp.uid);
      console.log(isRegistered);
      if (isRegistered) {
        setLoginState(2);
      } else {
        setLoginState(3);
        console.log(usutemp.displayName);
        return <Navigate to="/completelogin" />;
      }
    } else {
      setLoginState(4);
      console.log("no hay nadie autentificado");
    }
  }

  async function googleSigner() {
    let objeto = null;
    const googleProvider = new GoogleAuthProvider();
    await signInWithPopup(auth, googleProvider);
    const usuario = auth.currentUser;
    if (await !userExists(usuario.uid)) {
      objeto = {
        uid: usuario.uid,
        userName: null,
        displayName: usuario.displayName,
        email: usuario.emailVerified,
        processComplete: false,
        player2: null,
        history: null,
      };
    } else {
      objeto = await getUserInfo(usuario.uid);
    }
    console.log(objeto);
    if (user === null) {
      addUser(objeto);
      (async function () {
        await registerNewUser(objeto);
      })();
    }
  }

  function isLoged() {
    console.log("iniciando isloged");
    // signOut(auth);

    useEffect(() => {
      console.log("iniciando use effect");
      async function ejecutese() {
        await onAuthStateChanged(auth, (userget) => {
          console.log("aquiestaislogediniciando");
          if (userget) {
            if (user == null) {
              addUser(userget);
            }

            console.log("aquiestaisloged");
            async function eje2() {
              if (await userExists(userget.uid)) {
                console.log(userget.uid);
                console.log("el usuario existe");
                const objeto = await getUserInfo(userget.uid);
                console.log(objeto);
                console.log(objeto.userName);
                if (user != objeto) {
                  addUser(objeto);
                }
                if (objeto.userName === null) {
                  console.log("usuario no registrado");
                  if (loginState != 3 && loginState != 2) {
                    setLoginState(3);
                  }
                } else {
                  if (loginState != 2) {
                    setLoginState(2);
                  }
                  console.log("username esta registrado");
                  console.log(objeto.userName);
                }
              }
            }
            eje2();
          } else {
            console.log("aqui no esta isloged");
            if (loginState != 4) {
              setLoginState(4);
            }
          }
        });
      }
      ejecutese();
    }, []);
  }

  function addPlayers(player, player2) {
    setPlayers([player, player2]);
  }

  return (
    <MovieContext.Provider
      value={{
        user,
        addUser,
        loginState,
        updLoginState,
        googleSigner,
        handleUserStateChange,
        isLoged,
        search,
        searchMovies,
        modal,
        setModal,
        currentSel,
        setCurrentSel,
        favorites,
        setFavorites,
        setSearch,
getMovie,
moviex,
setMoviex
      }}
    >
      {children}
    </MovieContext.Provider>
  );
}
