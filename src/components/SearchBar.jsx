import React, {useContext, useState} from 'react'
import ReactDom from 'react-dom/client'
import { MovieContext, MovieProvider } from "../context/MovieContext";
import Resultados from './resultados';

export default function SearchBar() {
  const { searchMovies, search } = useContext(MovieContext);

  function handleSubmit (event){
    event.preventDefault();

    // Obtener el valor del campo de búsqueda
    const query = event.target.search.value;

    // Realizar la búsqueda y actualizar el estado
    searchMovies(query);   
   return(<Resultados/>)
};

console.log(search);

  return (
    <div className="group relative rounded-md dark:bg-gray-600 dark:highlight-white/10 dark:focus-within:bg-transparent">
      <form onSubmit={handleSubmit}>
      <svg width="20" height="20" fill="currentColor" className="absolute left-3 top-1/2 -mt-2.5 text-slate-400 pointer-events-none group-focus-within:text-blue-500 dark:text-slate-500">
        <path fillRule="evenodd" clipRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z">
        </path>
     </svg>
        <input
        type="text" aria-label="Filter projects" placeholder="titulo de la pelicula..." 
        className="appearance-none w-full text-sm leading-6 bg-transparent text-slate-900 placeholder:text-gray-800 rounded-md py-2 pl-10 ring-1 ring-slate-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:text-slate-900 dark:placeholder:text-slate-300 dark:ring-0 dark:focus:ring-2"
         name="search" id="search"/></form>
    </div>
  )
}
