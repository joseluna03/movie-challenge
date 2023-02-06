import React, { useContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MovieContext, MovieProvider } from "./context/MovieContext";
import Login from "./routes/Login";
import Home from "./routes/Home";
import CompleteLogin from "./routes/CompleteLogin";
import Winner from "./components/Winner";
import Player2 from "./components/Player2";
import PreventReloadWithConfirmExample from "./components/PreventReloadWithConfirmExample";

ReactDOM.createRoot(document.getElementById("root")).render(
  <MovieProvider>
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<App />} />
        <Route path="login" element={<Login />} />
        <Route path="home" element={<Home />} />
        <Route path="completelogin" element={<CompleteLogin />} />
        <Route path="winner" element={<Winner  />} />
        <Route path="player2" element={<Player2 />} />
      </Routes>
    </BrowserRouter>
  </MovieProvider>
);
