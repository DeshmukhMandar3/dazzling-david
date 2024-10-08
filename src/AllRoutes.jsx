import React from "react";
import { Route, Routes } from "react-router-dom";
import Welcome from "./Pages/Welcome";
import Game from "./Pages/Game";

const AllRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Welcome />} />
      <Route path="/game" element={<Game />} />
    </Routes>
  );
};

export default AllRoutes;
