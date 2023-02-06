import React, {useContext } from "react";
import { MovieContext, MovieProvider } from "../context/MovieContext";
import Players from "./Players";
import SearchBar from "./SearchBar";
import Resultados from "./resultados"
import MyModal from "./MyModal";
import PreventReloadWithConfirmExample from "./PreventReloadWithConfirmExample";

export default function Cuerpo() {
  const { modal , setModal, modalCont } = useContext(MovieContext);
  
  return (
    <>
    <PreventReloadWithConfirmExample/>
    {modal && <MyModal/>}
      <div className="bg-gradient-to-r from-sky-800 to-blue-500 grid grid-rows-1 :grid-rows-1 grid-cols-6  gap-0.5 max-sm:flex max-sm:flex-col">
        <div className="col-span-3">
          <h1 className="text-white bannertext max-md:text-3xl text-3xl p-3 ml-3 mt-2 max-sm:text-center max-sm:h-0">
            Movie Challenge
          </h1>
        </div>
        <div className="col-span-1 text-white max-sm:invisible" id="favorit">
          foto aqui
        </div>
        <div className=" col-span-2  text-white">
          <Players />
        </div>
      </div>
      <div className="bg-slate-200  text-white ">
        <SearchBar />
      </div>
      <div className="bg-white col-span-6" id="resultados">
        <Resultados />
      </div>
    </>
  );
}
